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
  ProfileUser: '/TableTime/user',
  ProfileUserUpdate: '/TableTime/userUpdate',
  ProfileAdmin: '/TableTime/adminRest/getReservals',
  ProfileAdminUpdate: '/TableTime/adminRest/userUpdate',
  CancelReserval: '/TableTime/cancelReserval',
  AdminCancelReserval: '/TableTime/adminRest/cancelReserval',
  SuperAdmin: '/TableTime/adminApp/createRestaurant',
  AdminRest: '/TableTime/adminRest/restaurant',
  AdminRestUpdate: '/TableTime/adminRest/updateRestaurant',
  AdminRestUpdateTable: '/TableTime/adminRest/updateTable',
  AdminRestUpdatePhoto: '/TableTime/adminRest/updatePhotoRestaurant',
  AdminRestUpdateMenu: '/TableTime/adminRest/updateMenu',
  AdminRestUpdatePlan: '/TableTime/adminRest/updatePlan',
  UserRestaurants: '/TableTime/restaurants',
  ResevalRestaurant: '/TableTime/freeTable',
  TableRestaurant: '/TableTime/reserval',
  AdminResevalRestaurant: '/TableTime/adminRest/freeTable',
  AdminTableRestaurant: '/TableTime/adminRest/reserval',
}

export const AppRoute = {
  Root: '/',
  SuperAdmin: '/superadmin',
  Profile: '/profile',
  Restaurant: '/restaurant',
  Edit: '/restaurant/edit',
  Reserval: '/reserval',
  Table: '/reserval/table',
  NotFound: '*',
}
