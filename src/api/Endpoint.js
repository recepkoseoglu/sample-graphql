import { URL, URLSearchParams } from 'url';
import rp from 'request-promise';
import dotenv from 'dotenv';

dotenv.config();
const API = process.env.API;

class Endpoint {
  path;
  method;
  constructor({ path, method = 'GET' }) {
    this.path = path;
    this.method = method;
  }
  call(pathParams, queryParams, body) {
    const url = new URL(this.path(pathParams), API);
    url.search = new URLSearchParams(queryParams).toString();
    return rp({
      uri: url.toString(),
      method: this.method,
      json: true,
      body,
    });
  }
}

export default Endpoint;
