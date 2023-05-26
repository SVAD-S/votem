import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  aadhar: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  otp: String,
  otpExpires: Date,
});

UserSchema.methods.createOtpToken = function () {
  const otpToken = Math.floor(10000 + Math.random() * 90000).toString();

  this.otp = otpToken;

  this.otpExpires = Date.now() + 10 * 60 * 1000;
  return otpToken;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  if (user.password) delete userObject.password;
  if (userObject.otp) delete userObject.otp;
  if (userObject.otpExpires) delete userObject.otpExpires;

  return userObject;
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
