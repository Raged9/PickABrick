import mongoose, { Schema, model, models, Document } from 'mongoose';


export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  favorites: string[];
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username.'],
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 6,
  },

  favorites: {
    type: [String],
    default: [],
  }
}
);

export default (models.User as mongoose.Model<IUser>) || 
               model<IUser>('User', UserSchema);