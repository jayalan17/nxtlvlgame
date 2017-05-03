'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var config = require('../config');
var router = _express2.default.Router();

app.set('superSecret', config.secret);

router.use(function (req, res, next) {
  console.log('something is happening!');
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/changeLuigi').put(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) next(err);
    user.luigiCompleted = req.body.luigiCompleted;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "Luigi mini-game has been completed" });
      }
    });
  });
});
router.route('/changeTank').put(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) next(err);
    user.tankCompleted = req.body.tankCompleted;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "Tank mini-game has been completed" });
      }
    });
  });
});
router.route('/changeFlappy').put(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) next(err);
    user.flappyCompleted = req.body.flappyCompleted;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "Flappy mini-game has been completed" });
      }
    });
  });
});
router.route('/changeBreakout').put(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) next(err);
    user.breakoutCompleted = req.body.breakoutCompleted;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "Breakout mini-game has been completed" });
      }
    });
  });
});
router.route('/changeFarming').put(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) next(err);
    user.farmingCompleted = req.body.farmingCompleted;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "Farming has been completed" });
      }
    });
  });
});
// router.route('/changeShovel')
//   .put(function(req, res, next){
//     User.findOne({
//       name: req.body.name
//     }, function(err, user) {
//       if (err) next(err);
//       user.shovelGot = req.body.shovelGot;
//       user.save(function(err){
//         if(err){
//           next(err);
//         } else {
//           res.json({success: "Shovel has been completed"});
//         }
//       });
//     });
//   });
// router.route('/changeSeeds')
//   .put(function(req, res, next){
//     User.findOne({
//       name: req.body.name
//     }, function(err, user) {
//       if (err) next(err);
//       user.seedsGot = req.body.seedsGot;
//       user.save(function(err){
//         if(err){
//           next(err);
//         } else {
//           res.json({success: "Seeds has been completed"});
//         }
//       });
//     });
//   });
// router.route('/changeWater')
//   .put(function(req, res, next){
//     User.findOne({
//       name: req.body.name
//     }, function(err, user) {
//       if (err) next(err);
//       user.waterGot = req.body.waterGot;
//       user.save(function(err){
//         if(err){
//           next(err);
//         } else {
//           res.json({success: "Water has been completed"});
//         }
//       });
//     });
//   });
// router.route('/changeCounter')
//   .put(function(req, res, next){
//     User.findOne({
//       name: req.body.name
//     }, function(err, user) {
//       if (err) next(err);
//       user.counter = req.body.counter;
//       user.save(function(err){
//         if(err){
//           next(err);
//         } else {
//           res.json({success: "Counter has been updated"});
//         }
//       });
//     });
//   });
router.route('/changeBreakoutScore').put(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) next(err);
    user.breakoutHighScore = req.body.breakoutHighScore;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "breakoutHighScore has been updated" });
      }
    });
  });
});

router.route('/changeFlappyScore').put(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) next(err);
    user.flappyHighScore = req.body.flappyHighScore;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "flappyHighScore has been updated" });
      }
    });
  });
});

router.route('/getUserStatus/:userName').get(function (req, res) {
  _User2.default.findOne({
    name: req.params.userName
  }, function (err, user, next) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
});

router.route('/remove').delete(function (req, res, next) {
  _User2.default.findOne({
    name: req.body.username
  }, function (err, user) {
    if (err) next(err);
    var updatedcollection = user[req.body.collectionname].filter(function (obj) {
      return obj.name != req.body.collectable.name;
    });
    user[req.body.collectionname] = updatedcollection;
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json({ success: "content has been toggled" });
      }
    });
  });
});

router.route('/user').post(function (req, res) {
  var user = new _User2.default();

  user.name = req.body.name.toLowerCase();
  user.password = _passwordHash2.default.generate(req.body.password);
  user.luigiCompleted = false;
  user.tankCompleted = false;
  user.flappyCompleted = false;
  user.breakoutCompleted = false;
  user.flappyHighScore = false;
  user.breakoutHighScore = false;

  user.save(function (err, user, next) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
});

router.post('/authenticate', function (req, res, next) {
  _User2.default.findOne({
    name: req.body.name.toLowerCase()
  }, function (err, user) {
    if (err) next(err);
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!_passwordHash2.default.verify(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = _jsonwebtoken2.default.sign(user, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          admin: user.admin,
          id: user._id,
          luigiCompleted: user.luigiCompleted,
          tankCompleted: user.tankCompleted,
          flappyCompleted: user.flappyCompleted,
          breakoutCompleted: user.breakoutCompleted
        });
      }
    }
  });
});

router.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

module.exports = router;