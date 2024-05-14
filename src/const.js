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
  AdminRest: '/TableTime/adminRest/restaurant',
  AdminRestUpdate: '/TableTime/adminRest/updateRestaurant',
  AdminRestUpdatePhoto: '/TableTime/adminRest/updatePhotoRestaurant',
  AdminRestUpdateMenu: '/TableTime/adminRest/updateMenu',
  AdminRestUpdatePlan: '/TableTime/adminRest/updatePlan',
  UserRestaurants: '/TableTime/restaurants',
  UserRestaurant: '/TableTime/restaurants',
}

export const AppRoute = {
  Root: '/',
  SuperAdmin: '/superadmin',
  Restaurant: '/restaurant',
  Edit: '/restaurant/edit',
  Reserval: '/reserval',
  Table: '/reserval/table',
  NotFound: '*',
}
