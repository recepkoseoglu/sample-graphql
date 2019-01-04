import Endpoint from './Endpoint';

export class Brand {
  GET_BRANDS = new Endpoint({
    path: () => '/brands',
  });
  GET_BRAND = new Endpoint({
    path: ({ id }) => `/brands/${id}`,
  });
}

export default new Brand();
