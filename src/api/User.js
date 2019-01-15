import Endpoint from './Endpoint';

export class User {
  GET_USERS = new Endpoint({
    path: () => '/users',
  });
  GET_USER = new Endpoint({
    path: ({ id }) => `/users/${id}`,
  });
}

export default new User();
