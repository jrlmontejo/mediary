const publicRoutes = {
  '/users/token': ['POST']
}

const createRouteList = routes => (
  Object.keys(routes).map(route => ({
    url: route,
    methods: routes[route]
  }))
)

module.exports = createRouteList(publicRoutes)