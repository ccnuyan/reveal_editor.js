'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _EditorPage = require('./middlewares/EditorPage');

var _EditorPage2 = _interopRequireDefault(_EditorPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
/* eslint-disable no-console */

var PORT = process.env.PORT || 10000;

try {
  _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app.use((0, _compression2.default)());
            app.use('/static/', _express2.default.static(_path2.default.join(__dirname, '../build/')));
            app.use('/static/', _express2.default.static(_path2.default.join(__dirname, '../public/')));
            app.get('/', _EditorPage2.default);
            app.listen(PORT, function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log('app is listening on port ' + PORT);
              }
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))();
} catch (err) {
  console.log(err);
}