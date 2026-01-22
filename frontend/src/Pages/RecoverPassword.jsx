import {  useNavigate } from "react-router";
import API from "../API/axios";
import { useState } from "react";

export const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      await API.post("/user/recover-password", { email });
      alert("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await API.post("/user/verify-password", { email, otp });
      alert("OTP verified");
      navigate("/forgetpassword", { state: { email } });
    } catch (err) {
      alert("Invalid or expired OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Recover Password
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          We’ll send an OTP to your email
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
            hover:bg-blue-700 transition font-semibold mb-4"
        >
          Send OTP
        </button>

        {/* OTP FIELD (only after OTP sent) */}
        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-lg
                hover:bg-blue-700 transition font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};