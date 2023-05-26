import React, { useState } from "react";
import OTP from "../OTP/OTP";

const Login = () => {
  const [ipNum, setIpNum] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);

  function isPositiveInteger(value) {
    // Check if the value is a positive integer
    return /^\d+$/.test(value) && parseInt(value) > 0;
  }

  const onChangeHandler = (e) => {
    console.log(isPositiveInteger(e.target.value));

    if (e.target.value.length > 1 && !isPositiveInteger(e.target.value)) return;

    setIpNum(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (ipNum.length !== 10) return;
    setIsOtpSend(true);
    setIpNum((prev) => `+91${prev}`);
    // do something with the phone number
    console.log(`Phone number submitted: ${ipNum}`);
  };

  return (
    <div className="min-h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl uppercase font-extrabold my-5">Login</h1>
      <form className="flex flex-col gap-10" onSubmit={onSubmitHandler}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Mobile Number</span>
          </label>
          <label className="input-group">
            <span>+91</span>
            <input
              type="tel"
              placeholder="1234056789"
              className="input input-bordered"
              minLength={10}
              maxLength={10}
              required
              value={ipNum}
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
            Get otp
          </button>
        )}
      </form>
      {isOtpSend && <OTP isOtpSend={isOtpSend} setIsOtpSend={setIsOtpSend} />}
    </div>
  );
};

export default Login;
