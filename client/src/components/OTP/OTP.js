import axios from "axios";
import React, { useEffect, useState } from "react";

const OTP = ({ isOtpSend, setIsOtpSend }) => {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(5 * 60); // 10 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  function isPositiveInteger(value) {
    // Check if the value is a positive integer
    return /^\d+$/.test(value) && parseInt(value) > 0;
  }

  const onChangeHandler = (e) => {
    console.log(isPositiveInteger(e.target.value));

    if (e.target.value.length > 1 && !isPositiveInteger(e.target.value)) return;

    setOtp(e.target.value);
  };

  const verifyOtp = async (otp) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/voter/verify-otp",
        {
          otp,
        }
      );

      if (res.status === 200) {
        window.location.assign("/choose");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    verifyOtp(otp).then(() => {});
  };

  useEffect(() => {
    if (isOtpSend) setIsActive(true);
    else setIsActive(false);
  }, [isOtpSend]);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center duration-300 my-5">
      <h2 className="text-xl text-gray-900 uppercase">Otp verification</h2>

      <form
        className="flex flex-col gap-10  justify-center items-center"
        onSubmit={onSubmitHandler}
      >
        <div className="form-control">
          <label className="input-group">
            <span>OTP</span>
            <input
              type="number"
              placeholder="Type 5 digit otp"
              className="input input-bordered w-full"
              minLength={5}
              maxLength={5}
              required
              value={otp}
              onChange={onChangeHandler}
            />
          </label>
          <div className="timer-container w-full grid place-items-center my-2 text-blue-800">
            Resend in {formatTime(time)}
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-primary hover:bg-purple-700 outline-none border-none btn-wide"
        >
          Verify
        </button>
      </form>
      <button
        className="btn btn-outline btn-secondary my-5 btn-wide"
        disabled={time !== 0}
      >
        Resend otp
      </button>
    </div>
  );
};

export default OTP;
