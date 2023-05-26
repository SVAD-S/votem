import React, { useState } from "react";
import axios from "axios";
import OTP from "../OTP/OTP";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);

  function isPositiveInteger(value) {
    // Check if the value is a positive integer
    return /^\d+$/.test(value) && parseInt(value) > 0;
  }

  const onChangeHandler = (e) => {
    if (e.target.id === "email") setEmail(e.target.value);
    else if (e.target.id === "aadhar") setAadhar(e.target.value);
  };

  const getOtpFromEmail = async (email) => {
    try {
      const res = await axios.post("http://localhost:8000/api/voter/login", {
        email,
      });
      console.log(res);

      if (res.status === 200) {
        setIsOtpSend(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    getOtpFromEmail(email);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl uppercase font-extrabold my-5">Sign Up</h1>
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group">
            <span>@</span>
            <input
              type="email"
              placeholder="hello@votem.in"
              className="input input-bordered w-full"
              id="email"
              required
              value={email}
              onChange={onChangeHandler}
              disabled={isOtpSend}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Aadhar Number</span>
          </label>
          <label className="input-group">
            <span>Adh No:</span>
            <input
              type="tel"
              placeholder="123405678912"
              className="input input-bordered "
              id="aadhar"
              minLength={12}
              maxLength={12}
              required
              value={aadhar}
              onChange={onChangeHandler}
              disabled={isOtpSend}
            />
          </label>
        </div>

        {!isOtpSend && (
          <button
            type="submit"
            className="btn bg-primary hover:bg-purple-700 outline-none border-none"
          >
            Verify
          </button>
        )}
      </form>
      {isOtpSend && <OTP isOtpSend={isOtpSend} setIsOtpSend={setIsOtpSend} />}
    </div>
  );
};

export default SignUp;
