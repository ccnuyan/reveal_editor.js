'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _assets = require('../../build/assets.json');

var _assets2 = _interopRequireDefault(_assets);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable linebreak-style */


var EditorPage = function (_Component) {
  _inherits(EditorPage, _Component);

  function EditorPage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditorPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorPage.__proto__ || Object.getPrototypeOf(EditorPage)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      return _react2.default.createElement(
        'html',
        { className: 'no-js', lang: 'zh-CN' },
        _react2.default.createElement(
          'head',
          null,
          _react2.default.createElement('meta', { charSet: 'utf-8' }),
          _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
          _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }),
          _react2.default.createElement(
            'title',
            null,
            'reveal-editor.js'
          ),
          Object.keys(_config2.default.stylesheets).map(function (key) {
            return _react2.default.createElement('link', { id: 'css_' + key, rel: 'stylesheet', key: key, href: _config2.default.stylesheets[key] });
          }),
          _react2.default.createElement('link', { id: 'css_core', rel: 'stylesheet', href: _assets2.default.core.css }),
          _react2.default.createElement('link', { id: 'css_editor', rel: 'stylesheet', href: _assets2.default.editor.css }),
          _react2.default.createElement('link', { id: 'css_theme', rel: 'stylesheet' }),
          _react2.default.createElement('link', { id: 'css_theme_override', rel: 'stylesheet' })
        ),
        _react2.default.createElement(
          'body',
          null,
          _react2.default.createElement(
            'div',
            { className: 'wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'reveal-container' },
              _react2.default.createElement('div', { className: 'reveal' })
            ),
            _react2.default.createElement('div', { className: 'reveal-editor' })
          ),
          Object.keys(_config2.default.scripts).map(function (key) {
            return _react2.default.createElement('script', { id: 'js_' + key, key: key, src: _config2.default.scripts[key] });
          }),
          _react2.default.createElement('script', { id: 'js_core', src: _assets2.default.core.js }),
          _react2.default.createElement('script', { id: 'js_editor', src: _assets2.default.editor.js })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return EditorPage;
}(_react.Component);

EditorPage.propTypes = {
  app: _propTypes2.default.string.isRequired
};


var renderer = function renderer(req, res) {
  var app = _assets2.default[req.params.app] ? req.params.app : 'app';
  var content = '<!doctype html>' + _server2.default.renderToStaticMarkup(_react2.default.createElement(EditorPage, { app: app }));
  res.type('.html');
  res.send(content);
};

exports.default = renderer;