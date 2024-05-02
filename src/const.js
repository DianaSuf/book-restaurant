export const AuthorizationStatus = {
  USER: 'USER',
  ADMIN_REST: 'ADMIN_REST',
  ADMIN_APP: 'ADMIN_APP',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
}

export const APIRoute = {
  Register: '/TableTime/users',
  Login: '/TableTime/login',
  Status: '/TableTime/status',
  SuperAdmin: '/TableTime/adminApp/createRestaurant',
}

export const AppRoute = {
  Root: '/',
  SuperAdmin: 'superadmin',
  Admin: 'admin',
  NotFound: '*',
}
