import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
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
  flappyHighScore: {
    type: Number
  },
  breakoutHighScore: {
    type: Number
  }
});

export default mongoose.model('User', UserSchema);
