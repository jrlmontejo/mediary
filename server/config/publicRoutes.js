const publicRoutes = {
  '/user': ['POST'],
  '/user/token': ['POST'],
  '/user/email/forgot-password': ['POST'],
  '/user/email/verified': ['POST']
}

const createRouteList = routes => (
  Object.keys(routes).map(route => ({
    url: route,
    methods: routes[route]
  }))
)

module.exports = createRouteList(publicRoutes)