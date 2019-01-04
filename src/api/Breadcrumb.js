import Endpoint from './Endpoint';

export class Breadcrumb {
  GET_CATEGORIES = new Endpoint({
    path: () => `/breadcrumb`,
  });
}

export default new Breadcrumb();
