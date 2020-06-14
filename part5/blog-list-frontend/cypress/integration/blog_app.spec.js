describe('Blog app', function () {
  const user = {
    name: 'Test user',
    username: 'test321321',
    password: 'test123123',
  }

  beforeEach(function () {
    cy.resetDb()
    cy.register(user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('form#login-form').should('exist')
    cy.get('input#username').should('exist')
    cy.get('input#password').should('exist')
  })

  describe('User logging in', function () {
    it('Valid user logs in', function () {
      cy.get('input#username').type(user.username)
      cy.get('input#password').type(user.password)
      cy.get('#login-button').click()

      cy.get('.notification')
        .contains('Successfully logged in')
        .should('have.class', 'success')
      cy.contains(`${user.name} logged in`)
    })

    it('Invalid user cannot log in', function () {
      cy.get('input#username').type('wrongUsername')
      cy.get('input#password').type('wrongPassword')

      cy.get('#login-button').click()

      cy.get('.notification')
        .contains('invalid username or password')
        .should('have.class', 'error')
    })
  })

  describe('When logged in', function () {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'Test URL',
    }

    beforeEach(function () {
      cy.login(user)
    })

    it('A blog can be created', function () {
      cy.get('button#button-show').click()

      cy.get('form#blog-form').should('exist')
      cy.get('input#title').type(blog.title)
      cy.get('input#author').type(blog.author)
      cy.get('input#url').type(blog.url)

      cy.get('button#button-create-blog').click()

      cy.contains(blog.title)
      cy.contains(blog.author)

      cy.get('.notification')
        .contains(`Successfully created blog: ${blog.title}`)
        .should('have.class', 'success')
    })

    describe('When a blog exists', function () {
      beforeEach(function () {
        cy.createBlog(blog)
      })

      it('User can like a blog', function () {
        cy.contains(blog.title)
          .parent()
          .find('button#button-show')
          .as('showBlogButton')
        cy.get('@showBlogButton').should('contain', 'show')
        cy.get('@showBlogButton').click()

        cy.contains(blog.title)
          .parent()
          .find('button#button-like')
          .as('likeButton')
        cy.get('@likeButton').should('contain', 'like')
        cy.get('@likeButton').click()

        cy.contains(1)
      })

      it('Author can delete a blog', function () {
        cy.contains(blog.title)
          .parent()
          .find('button#button-show')
          .as('showBlogButton')
        cy.get('@showBlogButton').should('contain', 'show')
        cy.get('@showBlogButton').click()

        cy.contains(blog.title)
          .parent()
          .find('button#button-delete')
          .as('deleteButton')
        cy.get('@deleteButton').should('contain', 'delete')
        cy.get('@deleteButton').click()

        cy.should('not.contain', blog.title)
        cy.should('not.contain', blog.author)
      })

      it('Other user cannot delete a blog', function () {
        const otherUser = {
          name: 'Some other user',
          username: 'test333333',
          password: 'test111111',
        }

        cy.register(otherUser)
        cy.logout()
        cy.login(otherUser)

        cy.contains(blog.title)
          .parent()
          .find('button#button-show')
          .as('showBlogButton')
        cy.get('@showBlogButton').should('contain', 'show')
        cy.get('@showBlogButton').click()

        cy.contains(blog.title)
          .parent()
          .find('button#button-delete')
          .should('not.exist')
      })
    })

    describe('When a multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ ...blog, likes: 10 })
        cy.createBlog({ ...blog, likes: 30 })
        cy.createBlog({ ...blog, likes: 20 })
        cy.createBlog({ ...blog, likes: 40 })
      })

      // Pretty ugly but didn't have a better idea
      it('Blogs are sorted by the number of likes', function () {
        cy.get('button#button-show')
          .should('contain', 'show')
          .click({ multiple: true })

        let prevLikes = Number.MAX_SAFE_INTEGER

        cy.get('.blog-likes').each(($el) => {
          const likeRegex = new RegExp(/\d+/, 'g')
          const likeValue = parseInt(String($el.text()).match(likeRegex)[0], 10)

          expect(likeValue).to.be.at.most(prevLikes)
          prevLikes = likeValue
        })
      })
    })
  })
})
