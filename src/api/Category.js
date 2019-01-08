import Endpoint from './Endpoint';

export class Category {
  GET_CATEGORIES = new Endpoint({
    path: () => '/categories',
  });
  GET_CATEGORY = new Endpoint({
    path: ({ id }) => `/categories/${id}`,
  });
}

export default new Category();
