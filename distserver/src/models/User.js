Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  luigiCompleted: {
    type: Boolean,
    default: false
  },
  tankCompleted: {
    type: Boolean,
    default: false
  },
  flappyCompleted: {
    type: Boolean,
    default: false
  },
  breakoutCompleted: {
    type: Boolean,
    default: false
  },
  farmingCompleted: {
    type: Boolean,
    default: false
  },
  shovelGot: {
    type: Boolean,
    default: false
  },
  seedsGot: {
    type: Boolean,
    default: false
  },
  waterGot: {
    type: Boolean,
    default: false
  },
  counter: {
    type: Number,
    default: 0
  },
  flappyHighScore: {
    type: Number
  },
  breakoutHighScore: {
    type: Number
  }
});

exports.default = _mongoose2.default.model('User', UserSchema);