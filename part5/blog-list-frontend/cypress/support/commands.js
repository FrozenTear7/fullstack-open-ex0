Cypress.Commands.add('resetDb', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
})

Cypress.Commands.add('register', ({ name, username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users', {
    name,
    username,
    password,
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('logout', () => {
  window.localStorage.clear('loggedBlogappUser')
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', (blog) => {
  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: blog,
  }).then(() => {
    cy.visit('http://localhost:3000')
  })
})
