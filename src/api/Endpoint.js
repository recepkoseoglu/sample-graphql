import { URL } from 'url';
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

  consumer = res => {
    const totalCount = res.headers['x-total-count'];
    if (Array.isArray(res.body) && totalCount) {
      return {
        result: res.body,
        totalCount,
      };
    }
    return res.body;
  };

  queryParams = params => {
    return Object.keys(params)
      .map(key => {
        const value = params[key];
        if (Array.isArray(value)) {
          return value.map(i => `${key}=${i}`).join('&');
        } else {
          return `${key}=${value}`;
        }
      })
      .join('&');
  };

  call(pathParams, queryParams, body) {
    const url = new URL(this.path(pathParams), API);
    url.search = this.queryParams(queryParams);
    return rp({
      uri: url.toString(),
      method: this.method,
      json: true,
      body,
      resolveWithFullResponse: true,
    }).then(this.consumer);
  }
}

export default Endpoint;
