import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/userModel.js";
import axios from "axios";

const userRouter = Router();

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const { aadhar } = req.body;

      if (!aadhar) {
        res.status(400);
        throw new Error("Aadhar field are required");
      }

      const response = await axios.get(
        `http://localhost:5050/api/adb/users/${aadhar}`
      );

      if (response.data) {
        console.log(response.data);
      } else if (response.status === 404) {
        throw new Error(`There is no user with aadhar ${aadhar}`);
      } else if (response.status !== 200) {
        throw new Error("Request failed with status " + response.status);
      }

      const data = response.data?.data;

      let user = await User.findOne({
        ...data,
      });

      if (!user) {
        user = await User.create({
          ...data,
        });
      }

      const otpToken = await user.createOtpToken();
      await user.save({ validateBeforeSave: false });

      const message = `Use the OTP to login\n OTP : ${otpToken}`;

      try {
        await sendEmail({
          email: user.email,
          subject: "OTP for login",
          message,
        });

        res.status(200).json({
          message: "Check your mail for the otp",
        });
      } catch (error) {
        user.otp = undefined;
        user.otpExpires = undefined;
        console.log(error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);

      throw new Error(error.message || "Internal server error");
    }
  })
);

userRouter.post(
  "/verify-otp",
  expressAsyncHandler(async (req, res) => {
    // Get the token from the user
    const { otp } = req.body;

    const user = await User.findOne({
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("otp is invalid or expired ");
    }

    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Welcome to votem",
      data: await user.toJSON(),
    });
  })
);
export default userRouter;
