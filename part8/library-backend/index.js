import apollo from 'apollo-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from './utils/config.js'
import Author from './models/author.js'
import Book from './models/book.js'
import User from './models/user.js'

const { ApolloServer, UserInputError, gql } = apollo

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type AuthorsBooks {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [AuthorsBooks]!
    allGenres: [String]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: (root, args) => {
      let findParams = {}

      if (args.genre)
        findParams = { ...findParams, genres: { $in: [args.genre] } }

      return Book.find(findParams).populate('author', { name: 1 })
    },
    allAuthors: () => {
      return Author.aggregate([
        { $match: {} },
        { $project: { name: 1, born: 1, bookCount: { $size: '$books' } } },
      ])
    },
    allGenres: async (root, args) => {
      const genres = await Book.find({})

      return Array.from(
        new Set(genres.reduce((acc, book) => [...acc, ...book.genres], []))
      )
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('user not authorized')

      let author = await Author.findOne({ name: args.author })
      if (!author) author = new Author({ name: args.author })

      let book = new Book({ ...args, author: author._id })
      try {
        book = await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      author.books = author.books.concat(book._id)
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book.populate('author', { name: 1, born: 1 }).execPopulate()
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('user not authorized')

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo
      try {
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args
      const user = new User({ username, favoriteGenre })

      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      )
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
