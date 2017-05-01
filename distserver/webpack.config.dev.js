Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phaserModule = _path2.default.join(__dirname, '/node_modules/phaser-ce/');
var phaser = _path2.default.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = _path2.default.join(phaserModule, 'build/custom/pixi.js');
var p2 = _path2.default.join(phaserModule, 'build/custom/p2.js');

exports.default = {
  devtool: 'inline-source-map',
  entry: {
    bundle: ['eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    _path2.default.resolve(__dirname, 'src/index')],
    app: ['babel-polyfill', _path2.default.resolve(__dirname, 'src/main.js')],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: _path2.default.resolve(__dirname, 'src'),
    historyApiFallback: {
      index: '/'
    }
  },
  plugins: [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin()],
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/] }, { test: /pixi\.js/, use: ['expose-loader?PIXI'] }, { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] }, { test: /p2\.js/, use: ['expose-loader?p2'] }, { test: /(\.css)$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] }, { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }, { test: /\.(woff|woff2)$/, loader: 'url-loader',
      options: {
        prefix: 'font/',
        limit: '5000'
      }
    }, { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
      options: {
        limit: '10000',
        mimetype: 'application/octet-stream'
      }
    }, { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
      options: {
        limit: '10000',
        mimetype: 'image/svg+xml'
      }
    }, { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
};