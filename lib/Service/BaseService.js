Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

const _url = require('url')

const _requestPromise = _interopRequireDefault(require('request-promise'))

const _dotenv = _interopRequireDefault(require('dotenv'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

_dotenv.default.config()

const { API } = process.env

const Endpoint = /* #__PURE__ */ (function () {
  function Endpoint(_ref) {
    const { path } = _ref
    const _ref$method = _ref.method
    const method = _ref$method === void 0 ? 'GET' : _ref$method

    _classCallCheck(this, Endpoint)

    _defineProperty(this, 'path', '')

    _defineProperty(this, 'method', 'GET')

    _defineProperty(this, 'consumer', res => {
      const totalCount = res.headers['x-total-count']

      if (Array.isArray(res.body) && totalCount) {
        return {
          result: res.body,
          totalCount,
        }
      }

      return res.body
    })

    _defineProperty(this, 'queryParams', params =>
      Object.keys(params)
        .map(key => {
          const value = params[key]

          if (Array.isArray(value)) {
            return value.map(i => ''.concat(key, '=').concat(i)).join('&')
          }
          return ''.concat(key, '=').concat(value)
        })
        .join('&')
    )

    this.path = path
    this.method = method
  }

  _createClass(Endpoint, [
    {
      key: 'call',
      value: function call(pathParams, queryParams, body) {
        const url = new _url.URL(this.path(pathParams), API)
        url.search = this.queryParams(queryParams)
        return (0, _requestPromise.default)({
          uri: url.toString(),
          method: this.method,
          json: true,
          body,
          resolveWithFullResponse: true,
        }).then(this.consumer)
      },
    },
  ])

  return Endpoint
})()

const _default = Endpoint
exports.default = _default
