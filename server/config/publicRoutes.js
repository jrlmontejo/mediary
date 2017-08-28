const publicRoutes = [
  ['/users/token', ['POST']],
  [/^\/users\/.*/, ['GET']]
]

const routes = publicRoutes.map(route => ({
  url: route[0],
  methods: route[1]
}))

module.exports = routes