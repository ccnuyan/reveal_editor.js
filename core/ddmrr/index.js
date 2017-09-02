(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./static/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransformHandler = function TransformHandler(opTarget) {
  var _this = this;

  _classCallCheck(this, TransformHandler);

  this.getBoundingClientRect = function (dom) {
    if (dom) {
      return dom.getBoundingClientRect();
    }
    return _this.opTarget.getBoundingClientRect();
  };

  this.getComputedLocation = function (dom) {
    var style = void 0;

    if (dom) {
      style = getComputedStyle(dom);
    } else {
      style = getComputedStyle(_this.opTarget);
    }

    return {
      left: parseFloat(style.left),
      right: parseFloat(style.right),
      width: parseFloat(style.width),
      height: parseFloat(style.height),
      top: parseFloat(style.top),
      bottom: parseFloat(style.bottom)
    };
  };

  this.getTransformMatrix = function (dom) {
    var style = void 0;
    if (dom) {
      style = getComputedStyle(dom);
    } else {
      style = getComputedStyle(_this.opTarget);
    }
    var transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? mat[1].split(', ').map(function (n) {
      return parseFloat(n);
    }) : [1, 0, 0, 1, 0, 0];
  };

  this.getCenter = function (dom) {
    var location = void 0;
    if (dom) {
      location = _this.getBoundingClientRect(dom);
    } else {
      location = _this.getBoundingClientRect();
    }
    return {
      x: location.left + location.width / 2,
      y: location.top + location.height / 2
    };
  };

  this.matrixProduct_2d = function (m1, m2) {
    return [m1[0] * m2[0] + m1[1] * m2[2], m1[0] * m2[1] + m1[1] * m2[3], m1[2] * m2[0] + m1[3] * m2[2], m1[2] * m2[1] + m1[3] * m2[3]];
  };

  this.opTarget = opTarget;
};

exports.default = TransformHandler;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DDMRR = __webpack_require__(2);

var _DDMRR2 = _interopRequireDefault(_DDMRR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DDMRR2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultConfig = __webpack_require__(3);

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _Dragable = __webpack_require__(4);

var _Dragable2 = _interopRequireDefault(_Dragable);

var _Emitter = __webpack_require__(8);

var _Emitter2 = _interopRequireDefault(_Emitter);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DDMRR = function DDMRR(dom, container, config) {
  _classCallCheck(this, DDMRR);

  _initialiseProps.call(this);

  this.dom = dom;
  this.container = container;

  Array.prototype.forEach.call(dom.querySelectorAll('.ddmrr-drag-drop'), function (ddd) {
    ddd.parentNode.removeChild(ddd);
  });

  this.config = _extends({}, _defaultConfig2.default, config);
  this.initializeDoms(this.config);
  this.relocateDom(this.config);

  this.emitter = new _Emitter2.default();
}

/* eslint-disable no-param-reassign */

/* eslint-disable no-param-reassign */

;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.initializeDoms = function (config) {
    _this.initializeMove(config.move);
    _this.initializeResize(config.resize);
    _this.initializeRotate(config.rotate);
  };

  this.initializeMove = function (moveConfig) {
    if (!moveConfig.enable) return;
    var panel = document.createElement('div');
    panel.setAttribute('class', 'ddmrr-drag-drop drag-panel');
    _this.dom.appendChild(panel);
    _this.dragPanel = new _Dragable2.default(_this, panel, moveConfig);

    _this.dragPanel.dom.addEventListener('dblclick', function () {
      event.stopPropagation();

      _this.emitter.emit('dblclick', {});
    });
  };

  this.initializeResize = function (resizeConfig) {
    if (!resizeConfig.enable) return;
    _this.anchors = [];
    resizeConfig.anchors.forEach(function (anchorName) {
      var anchor = document.createElement('div');
      anchor.setAttribute('class', 'ddmrr-drag-drop resize-anchor');
      anchor.dataset.direction = anchorName;
      _this.dom.appendChild(anchor);
      _this.anchors.push(new _Dragable2.default(_this, anchor, resizeConfig));
    });
  };

  this.initializeRotate = function (rotateConfig) {
    if (!rotateConfig.enable) return;
    var anchor = document.createElement('div');
    anchor.setAttribute('class', 'ddmrr-drag-drop rotate-anchor');
    _this.dom.appendChild(anchor);
    _this.rotateAnchor = new _Dragable2.default(_this, anchor, rotateConfig);
  };

  this.relocateDom = function (config) {
    config.move.enable && _this.relocateMove(config.move);
    config.resize.enable && _this.relocateResize(config.resize);
    config.rotate.enable && _this.relocateRotate();
  };

  this.relocateMove = function () {
    var computedLocation = _this.getComputedBorderWidth();
    _this.dragPanel.dom.style.left = '-' + computedLocation.borderLeft + 'px';
    _this.dragPanel.dom.style.top = '-' + computedLocation.borderTop + 'px';
    _this.dragPanel.dom.style.right = '-' + computedLocation.borderRight + 'px';
    _this.dragPanel.dom.style.bottom = '-' + computedLocation.borderBottom + 'px';
    _this.dragPanel.dom.style.display = 'block';
  };

  this.relocateResize = function () {
    var computedLocation = _this.getComputedBorderWidth();
    _this.anchors.forEach(function (an) {
      switch (an.dom.dataset.direction) {
        case 'se':
          {
            an.dom.style.bottom = '-' + (computedLocation.borderBottom + 6) + 'px';
            an.dom.style.right = '-' + (computedLocation.borderRight + 6) + 'px';
            break;
          }
        case 'ne':
          {
            an.dom.style.top = '-' + (computedLocation.borderTop + 6) + 'px';
            an.dom.style.right = '-' + (computedLocation.borderRight + 6) + 'px';
            break;
          }
        case 'sw':
          {
            an.dom.style.bottom = '-' + (computedLocation.borderBottom + 6) + 'px';
            an.dom.style.left = '-' + (computedLocation.borderLeft + 6) + 'px';
            break;
          }
        case 'nw':
          {
            an.dom.style.top = '-' + (computedLocation.borderTop + 6) + 'px';
            an.dom.style.left = '-' + (computedLocation.borderLeft + 6) + 'px';
            break;
          }
        case 'n':
          {
            an.dom.style.top = '-' + (computedLocation.borderTop + 6) + 'px';
            an.dom.style.left = '50%';
            an.dom.style.marginLeft = '-6px';
            break;
          }
        case 's':
          {
            an.dom.style.bottom = '-' + (computedLocation.borderBottom + 6) + 'px';
            an.dom.style.left = '50%';
            an.dom.style.marginLeft = '-6px';
            break;
          }
        case 'e':
          {
            an.dom.style.right = '-' + (computedLocation.borderRight + 6) + 'px';
            an.dom.style.top = '50%';
            an.dom.style.marginTop = '-6px';
            break;
          }
        case 'w':
          {
            an.dom.style.left = '-' + (computedLocation.borderLeft + 6) + 'px';
            an.dom.style.top = '50%';
            an.dom.style.marginTop = '-6px';
            break;
          }
        default:
      }
      an.dom.style.display = 'block';
    });
  };

  this.relocateRotate = function () {
    var computedLocation = _this.getComputedBorderWidth();
    _this.rotateAnchor.dom.style.top = '-' + (computedLocation.borderTop + 24) + 'px';
    _this.rotateAnchor.dom.style.right = '-' + (computedLocation.borderRight + 24) + 'px';
    _this.rotateAnchor.dom.style.display = 'block';
  };

  this.getComputedBorderWidth = function () {
    var style = getComputedStyle(_this.dom);
    return {
      borderTop: parseFloat(style.borderTopWidth),
      borderBottom: parseFloat(style.borderBottomWidth),
      borderLeft: parseFloat(style.borderLeftWidth),
      borderRight: parseFloat(style.borderRightWidth)
    };
  };

  this.release = function () {
    if (_this.config.resize.enable) {
      _this.anchors.forEach(function (anchor) {
        anchor.unlinkEvents();
        _this.dom.removeChild(anchor.dom);
      });
    }

    if (_this.config.move.enable) {
      _this.dragPanel.unlinkEvents();
      _this.dom.removeChild(_this.dragPanel.dom);
    }

    if (_this.config.rotate.enable) {
      _this.rotateAnchor.unlinkEvents();
      _this.dom.removeChild(_this.rotateAnchor.dom);
    }
  };
};

exports.default = DDMRR;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  move: {
    key: 'move',
    enable: true
  },
  resize: {
    key: 'resize',
    enable: true,
    preserveAspectRatio: false,
    anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw']
  },
  rotate: {
    key: 'rotate',
    enable: true
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MoveHandler = __webpack_require__(5);

var _MoveHandler2 = _interopRequireDefault(_MoveHandler);

var _ResizeHandler = __webpack_require__(6);

var _ResizeHandler2 = _interopRequireDefault(_ResizeHandler);

var _RotateHandler = __webpack_require__(7);

var _RotateHandler2 = _interopRequireDefault(_RotateHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dragable = function Dragable(parent, dom, config) {
  var _this = this;

  _classCallCheck(this, Dragable);

  this.getEventHander = function () {
    switch (_this.config.key) {
      case 'move':
        {
          return new _MoveHandler2.default(_this, _this.config);
        }
      case 'resize':
        {
          return new _ResizeHandler2.default(_this, _this.config);
        }
      case 'rotate':
        {
          return new _RotateHandler2.default(_this, _this.config);
        }
      default:
    }
  };

  this.stopPropagation = function (event) {
    event.stopPropagation();
  };

  this.unlinkEvents = function () {
    _this.dom.removeEventListener('mousedown', _this.mousedown);
    _this.parent.container.removeEventListener('mousemove', _this.mousemove);
    _this.parent.container.removeEventListener('mouseup', _this.mouseup);

    _this.dom.removeEventListener('click', _this.stopPropagation);
    _this.dom.removeEventListener('click', _this.stopPropagation);
  };

  this.linkEvents = function () {
    _this.dom.addEventListener('mousedown', _this.mousedown);
    _this.parent.container.addEventListener('mousemove', _this.mousemove);
    _this.parent.container.addEventListener('mouseup', _this.mouseup);

    _this.dom.addEventListener('click', _this.stopPropagation);
    _this.dom.addEventListener('click', _this.stopPropagation);
  };

  this.mousedown = function (event) {
    event.stopPropagation();

    var dragStart = void 0;

    if (_this.parent.multiple && _this.config.key === 'move') {
      dragStart = [];
      _this.parent.elements.forEach(function (el) {
        dragStart.push({
          x: event.clientX,
          y: event.clientY,
          rect: _this.handler.getComputedLocation(el)
        });
      });
    } else {
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        rect: _this.handler.getComputedLocation()
      };
    }

    _this.isActive = true;
    _this.handler && _this.handler.onStart(event, dragStart);
  };

  this.mouseup = function (event) {
    // event.stopPropagation();

    if (_this.isActive) {
      var dragEnd = {
        x: event.clientX,
        y: event.clientY
      };
      _this.handler && _this.handler.onEnd(event, dragEnd);
      _this.isActive = false;
    }
  };

  this.mousemove = function (event) {
    // event.stopPropagation();

    if (_this.isActive) {
      var dragOver = {
        x: event.clientX,
        y: event.clientY
      };
      _this.handler && _this.handler.onGoing(event, dragOver);
    }
  };

  this.config = config;
  this.parent = parent;
  this.dom = dom;
  this.handler = this.getEventHander();

  this.linkEvents();
};

exports.default = Dragable;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TransformHandler2 = __webpack_require__(0);

var _TransformHandler3 = _interopRequireDefault(_TransformHandler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveHandler = function (_TransformHandler) {
  _inherits(MoveHandler, _TransformHandler);

  function MoveHandler(draggable, config) {
    _classCallCheck(this, MoveHandler);

    var _this = _possibleConstructorReturn(this, (MoveHandler.__proto__ || Object.getPrototypeOf(MoveHandler)).call(this, draggable.parent.dom));

    _this.onStart = function (event, dragStart) {
      _this.dragStart = dragStart;

      if (_this.draggable.parent.multiple) {
        var index = 0;
        _this.draggable.parent.elements.forEach(function (el) {
          _this.dragStart[index].originalMatrx = _this.getTransformMatrix(el);
          index += 1;
        });
      } else {
        _this.dragStart.originalMatrx = _this.getTransformMatrix();
      }
    };

    _this.onEnd = function () {
      _this.draggable.parent.emitter.emit('move_end', {});
    };

    _this.onGoing = function (event, dragOver) {
      if (_this.draggable.parent.multiple) {
        var index = 0;
        _this.draggable.parent.elements.forEach(function (el) {
          var om = _this.dragStart[index].originalMatrx;
          var offsetX = dragOver.x - _this.dragStart[index].x;
          var offsetY = dragOver.y - _this.dragStart[index].y;
          el.style.webkitTransform // eslint-disable-line no-param-reassign
          = 'matrix(' + om[0] + ',' + om[1] + ',' + om[2] + ',' + om[3] + ',' + (om[4] + offsetX) + ',' + (om[5] + offsetY) + ')';
          el.style.transform // eslint-disable-line no-param-reassign
          = 'matrix(' + om[0] + ',' + om[1] + ',' + om[2] + ',' + om[3] + ',' + (om[4] + offsetX) + ',' + (om[5] + offsetY) + ')';
          index += 1;
        });
      } else {
        var om = _this.dragStart.originalMatrx;
        var offsetX = dragOver.x - _this.dragStart.x;
        var offsetY = dragOver.y - _this.dragStart.y;

        _this.opTarget.style.webkitTransform = 'matrix(' + om[0] + ',' + om[1] + ',' + om[2] + ',' + om[3] + ',' + (om[4] + offsetX) + ',' + (om[5] + offsetY) + ')';
        _this.opTarget.style.transform = 'matrix(' + om[0] + ',' + om[1] + ',' + om[2] + ',' + om[3] + ',' + (om[4] + offsetX) + ',' + (om[5] + offsetY) + ')';
      }
    };

    _this.draggable = draggable;
    _this.config = config;
    return _this;
  }

  return MoveHandler;
}(_TransformHandler3.default);

exports.default = MoveHandler;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TransformHandler2 = __webpack_require__(0);

var _TransformHandler3 = _interopRequireDefault(_TransformHandler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResizeHandler = function (_TransformHandler) {
  _inherits(ResizeHandler, _TransformHandler);

  function ResizeHandler(draggable, config) {
    _classCallCheck(this, ResizeHandler);

    var _this = _possibleConstructorReturn(this, (ResizeHandler.__proto__ || Object.getPrototypeOf(ResizeHandler)).call(this, draggable.parent.dom));

    _this.onStart = function (event, dragStart) {
      _this.dragStart = dragStart;
      _this.dragStart.transformMatrix = _this.getTransformMatrix();
      _this.dragStart.invariantPoint = _this.getPoint();
    };

    _this.onEnd = function () {
      _this.draggable.parent.emitter.emit('resize_end', {});
    };

    _this.onGoing = function (event, dragOver) {
      var offset = _this.getOffset(dragOver);
      _this.updateWidthAndHeight(offset);

      var m = _this.dragStart.transformMatrix;
      var os = _this.dragStart.invariantPoint;
      var cs = _this.getPoint();

      var currentRect = _this.getComputedLocation();

      var vx = (currentRect.width - _this.dragStart.rect.width) / 2;
      var vy = (currentRect.height - _this.dragStart.rect.height) / 2;
      var otx = m[0] * os.x - m[1] * os.y;
      var oty = m[3] * os.y - m[2] * os.x;
      var ctx = m[0] * cs.x - m[1] * cs.y;
      var cty = m[3] * cs.y - m[2] * cs.x;
      var dx = otx - ctx + vx;
      var dy = oty - cty + vy;

      _this.opTarget.style.webkitTransform = 'matrix(' + m[0] + ',' + m[1] + ',' + m[2] + ',' + m[3] + ',' + (m[4] - dx) + ',' + (m[5] - dy) + ')';
      _this.opTarget.style.transform = 'matrix(' + m[0] + ',' + m[1] + ',' + m[2] + ',' + m[3] + ',' + (m[4] - dx) + ',' + (m[5] - dy) + ')';
    };

    _this.getPoint = function () {
      var os = _this.getComputedLocation();
      switch (_this.draggable.dom.dataset.direction) {
        case 'w':
          {
            var x = -os.width / 2;
            var y = 0;
            return { x: x, y: y };
          }
        case 'e':
          {
            var _x = os.width / 2;
            var _y = 0;
            return { x: _x, y: _y };
          }
        case 'n':
          {
            var _x2 = 0;
            var _y2 = -os.height / 2;
            return { x: _x2, y: _y2 };
          }
        case 's':
          {
            var _x3 = 0;
            var _y3 = os.height / 2;
            return { x: _x3, y: _y3 };
          }
        case 'ne':
          {
            var _x4 = os.width / 2;
            var _y4 = -os.height / 2;
            return { x: _x4, y: _y4 };
          }
        case 'nw':
          {
            var _x5 = -os.width / 2;
            var _y5 = -os.height / 2;
            return { x: _x5, y: _y5 };
          }
        case 'se':
          {
            var _x6 = os.width / 2;
            var _y6 = os.height / 2;
            return { x: _x6, y: _y6 };
          }
        case 'sw':
          {
            var _x7 = -os.width / 2;
            var _y7 = os.height / 2;
            return { x: _x7, y: _y7 };
          }
        default:
      }
    };

    _this.getOffset = function (dragOver) {
      var m = _this.getTransformMatrix();
      var offsets = {
        x: dragOver.x - _this.dragStart.x,
        y: dragOver.y - _this.dragStart.y
      };

      var x = m[0] * offsets.x + m[1] * offsets.y;
      var y = m[2] * offsets.x + m[3] * offsets.y;
      return { x: x, y: y };
    };

    _this.updateWidthAndHeight = function (offset) {
      var dw = _this.dragStart.rect.width;
      var dh = _this.dragStart.rect.height;

      switch (_this.draggable.dom.dataset.direction) {
        case 's':
          {
            dh = _this.dragStart.rect.height + offset.y;
            if (_this.config.preserveAspectRatio) {
              dw = Math.sign(dh) * Math.abs(dh * _this.dragStart.rect.width / _this.dragStart.rect.height); // eslint-disable-line no-param-reassign
            }
            break;
          }
        case 'e':
          {
            dw = _this.dragStart.rect.width + offset.x;
            if (_this.config.preserveAspectRatio) {
              dh = Math.sign(dw) * Math.abs(dw * _this.dragStart.rect.height / _this.dragStart.rect.width); // eslint-disable-line no-param-reassign
            }
            break;
          }
        case 'n':
          {
            dh = _this.dragStart.rect.height - offset.y;
            if (_this.config.preserveAspectRatio) {
              dw = Math.sign(dh) * Math.abs(dh * _this.dragStart.rect.width / _this.dragStart.rect.height); // eslint-disable-line no-param-reassign
            }
            break;
          }
        case 'w':
          {
            dw = _this.dragStart.rect.width - offset.x;
            if (_this.config.preserveAspectRatio) {
              dh = Math.sign(dw) * Math.abs(dw * _this.dragStart.rect.height / _this.dragStart.rect.width); // eslint-disable-line no-param-reassign
            }
            break;
          }
        case 'ne':
          {
            dh = _this.dragStart.rect.height - offset.y;

            if (_this.config.preserveAspectRatio) {
              dw = Math.sign(dh) * Math.abs(dh * _this.dragStart.rect.width / _this.dragStart.rect.height); // eslint-disable-line no-param-reassign
            } else {
              dw = _this.dragStart.rect.width + offset.x;
            }
            break;
          }
        case 'se':
          {
            dh = _this.dragStart.rect.height + offset.y;

            if (_this.config.preserveAspectRatio) {
              dw = Math.sign(dh) * Math.abs(dh * _this.dragStart.rect.width / _this.dragStart.rect.height); // eslint-disable-line no-param-reassign
            } else {
              dw = _this.dragStart.rect.width + offset.x;
            }
            break;
          }
        case 'nw':
          {
            dh = _this.dragStart.rect.height - offset.y;

            if (_this.config.preserveAspectRatio) {
              dw = Math.sign(dh) * Math.abs(dh * _this.dragStart.rect.width / _this.dragStart.rect.height); // eslint-disable-line no-param-reassign
            } else {
              dw = _this.dragStart.rect.width - offset.x;
            }
            break;
          }
        case 'sw':
          {
            dh = _this.dragStart.rect.height + offset.y;

            if (_this.config.preserveAspectRatio) {
              dw = Math.sign(dh) * Math.abs(dh * _this.dragStart.rect.width / _this.dragStart.rect.height); // eslint-disable-line no-param-reassign
            } else {
              dw = _this.dragStart.rect.width - offset.x;
            }
            break;
          }
        default:
      }

      _this.opTarget.style.width = dw + 'px';
      _this.opTarget.style.height = dh + 'px';
    };

    _this.draggable = draggable;
    _this.config = config;
    return _this;
  }

  return ResizeHandler;
}(_TransformHandler3.default);

exports.default = ResizeHandler;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TransformHandler2 = __webpack_require__(0);

var _TransformHandler3 = _interopRequireDefault(_TransformHandler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RotateHandler = function (_TransformHandler) {
  _inherits(RotateHandler, _TransformHandler);

  function RotateHandler(draggable, config) {
    _classCallCheck(this, RotateHandler);

    var _this = _possibleConstructorReturn(this, (RotateHandler.__proto__ || Object.getPrototypeOf(RotateHandler)).call(this, draggable.parent.dom));

    _this.onStart = function (event, dragStart) {
      _this.dragStart = dragStart;

      _this.dragStart.originalMatrx = _this.getTransformMatrix();
      _this.dragStart.center = _this.getCenter();
      _this.dragStart.angle = Math.atan2(event.clientY - _this.dragStart.center.y, event.clientX - _this.dragStart.center.x);
    };

    _this.onEnd = function () {
      _this.draggable.parent.emitter.emit('rotate_end', {});
    };

    _this.onGoing = function (event, dragOver) {
      var om = _this.dragStart.originalMatrx;
      var currentAngle = Math.atan2(dragOver.y - _this.dragStart.center.y, dragOver.x - _this.dragStart.center.x);
      var da = currentAngle - _this.dragStart.angle;

      var c = Math.cos(da);
      var s = Math.sin(da);

      var rm = [c, s, -s, c];
      var nm = _this.matrixProduct_2d(om, rm);

      _this.opTarget.style.webkitTransform = 'matrix(' + nm[0] + ',' + nm[1] + ',' + nm[2] + ',' + nm[3] + ',' + om[4] + ',' + om[5] + ')';
      _this.opTarget.style.transform = 'matrix(' + nm[0] + ',' + nm[1] + ',' + nm[2] + ',' + nm[3] + ',' + om[4] + ',' + om[5] + ')';
    };

    _this.draggable = draggable;
    _this.config = config;
    return _this;
  }

  return RotateHandler;
}(_TransformHandler3.default);

exports.default = RotateHandler;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(9);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Emitter = function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);

  function Emitter() {
    _classCallCheck(this, Emitter);

    return _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).apply(this, arguments));
  }

  return Emitter;
}(_events2.default);

exports.default = Emitter;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(13)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/index.js??ref--1-2!../node_modules/sass-loader/lib/loader.js!./DDMRR.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/index.js??ref--1-2!../node_modules/sass-loader/lib/loader.js!./DDMRR.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(true);
// imports


// module
exports.push([module.i, ".drag-panel {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.3) !important;\n  cursor: move;\n  display: none; }\n\n.resize-anchor {\n  position: absolute;\n  pointer-events: auto;\n  width: 12px;\n  height: 12px;\n  border: 2px solid #19ace1 !important;\n  display: block;\n  background-color: white !important;\n  position: absolute;\n  cursor: default;\n  display: none; }\n\n.rotate-anchor {\n  position: absolute;\n  border: 2px solid #1bade1 !important;\n  width: 12px;\n  height: 12px;\n  background-color: white !important;\n  border-radius: 12px;\n  display: none; }\n\n.resize-anchor:hover, .rotate-anchor:hover {\n  background-color: #1bade1 !important; }\n", "", {"version":3,"sources":["D:/ddmrr/ddmrr/DDMRR.scss"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,0CAA0C;EAC1C,aAAa;EACb,cAAc,EAAE;;AAElB;EACE,mBAAmB;EACnB,qBAAqB;EACrB,YAAY;EACZ,aAAa;EACb,qCAAqC;EACrC,eAAe;EACf,mCAAmC;EACnC,mBAAmB;EACnB,gBAAgB;EAChB,cAAc,EAAE;;AAElB;EACE,mBAAmB;EACnB,qCAAqC;EACrC,YAAY;EACZ,aAAa;EACb,mCAAmC;EACnC,oBAAoB;EACpB,cAAc,EAAE;;AAElB;EACE,qCAAqC,EAAE","file":"DDMRR.scss","sourcesContent":[".drag-panel {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.3) !important;\n  cursor: move;\n  display: none; }\n\n.resize-anchor {\n  position: absolute;\n  pointer-events: auto;\n  width: 12px;\n  height: 12px;\n  border: 2px solid #19ace1 !important;\n  display: block;\n  background-color: white !important;\n  position: absolute;\n  cursor: default;\n  display: none; }\n\n.rotate-anchor {\n  position: absolute;\n  border: 2px solid #1bade1 !important;\n  width: 12px;\n  height: 12px;\n  background-color: white !important;\n  border-radius: 12px;\n  display: none; }\n\n.resize-anchor:hover, .rotate-anchor:hover {\n  background-color: #1bade1 !important; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(14);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});