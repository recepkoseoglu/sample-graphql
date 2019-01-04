import Endpoint from './Endpoint';

export class Product {
  GET_PRODUCTS = new Endpoint({
    path: () => '/products',
  });
  GET_PRODUCT = new Endpoint({
    path: ({ id }) => `/products/${id}`,
  });
}

export default new Product();
