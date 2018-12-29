import Endpoint from './Endpoint';

export class Product {
  GET_PRODUCTS = new Endpoint({
    path: () => 'api/products',
  });
  GET_PRODUCT = new Endpoint({
    path: ({ id }) => `api/products/${id}`,
  });
  POST_PRODUCT = new Endpoint({
    path: () => `api/products`,
    method: 'POST',
  });
}

export default new Product();
