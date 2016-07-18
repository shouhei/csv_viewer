'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var SepalatedText = (function () {
    function SepalatedText() {
        _classCallCheck(this, SepalatedText);
    }

    _createClass(SepalatedText, null, [{
        key: 'readAsync',
        value: function readAsync() {
            var path = arguments[0] === undefined ? null : arguments[0];
            var f = arguments[1] === undefined ? null : arguments[1];

            if (path === null) {
                throw new FileNotSpecifiedError();
            }
            _fs2['default'].readFile(path, 'utf8', function (err, text) {
                if (err === null) {
                    (0, _csvParse2['default'])(text, {}, function (err, output) {
                        if (f !== null) {
                            f(output);
                        }
                    });
                } else {
                    throw new Error(err);
                }
            });
        }
    }]);

    return SepalatedText;
})();

exports['default'] = SepalatedText;

var FileNotSpecifiedError = (function (_Error) {
    function FileNotSpecifiedError() {
        _classCallCheck(this, FileNotSpecifiedError);

        _get(Object.getPrototypeOf(FileNotSpecifiedError.prototype), 'constructor', this).apply(this, arguments);
    }

    _inherits(FileNotSpecifiedError, _Error);

    return FileNotSpecifiedError;
})(Error);

;
module.exports = exports['default'];

