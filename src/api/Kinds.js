import Endpoint from './Endpoint';

export class Kinds {
  GET_LIST = new Endpoint({
    path: () => '/kinds',
  });
}

export default new Kinds();
