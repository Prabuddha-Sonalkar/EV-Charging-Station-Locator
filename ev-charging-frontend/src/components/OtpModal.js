import React, { useState } from "react";
import { generateOtp, verifyOtp, getAllOtps } from "../api/otpApi";

function OtpModal({ bookingId, onChargingCompleted }) {

  const [otpId, setOtpId] = useState(null);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const [chargingStarted, setChargingStarted] = useState(false);
  const [chargingEnded, setChargingEnded] = useState(false);

  const [otpMode, setOtpMode] = useState("START"); // START | END

  // ===============================
  // GENERATE OTP
  // ===============================
  const handleGenerateOtp = async () => {
    try {
      setMessage("");

      const otpType =
        otpMode === "START"
          ? "START_CHARGING"
          : "END_CHARGING";

      await generateOtp(bookingId, otpType);

      const res = await getAllOtps();

      const latestOtp = res.data
        .filter(
          o =>
            o.booking?.bookingId === bookingId &&
            o.otpType === otpType &&
            o.verified === false
        )
        .sort((a, b) => b.otpId - a.otpId)[0];

      if (!latestOtp) {
        setMessage("OTP not found");
        return;
      }

      setOtpId(latestOtp.otpId);
      setMessage("OTP generated. Enter the OTP.");

    } catch (err) {
      setMessage("Failed to generate OTP");
    }
  };

  // ===============================
  // VERIFY OTP (🔥 FIXED)
  // ===============================
  const handleVerifyOtp = async () => {
    try {
      setMessage("");

      if (!otpId) {
        setMessage("Generate OTP first");
        return;
      }

      // ✅ ONLY VERIFY OTP
      await verifyOtp(otpId, otp);

      if (otpMode === "START") {
        setChargingStarted(true);
        setOtp("");
        setOtpId(null);
        setMessage("Charging started successfully");
      }

      if (otpMode === "END") {
        setChargingEnded(true);
        setMessage("Charging ended successfully");

        if (onChargingCompleted) {
          onChargingCompleted();
        }
      }

    } catch (err) {
      const backendMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Invalid or expired OTP";

      setMessage(backendMsg);
    }
  };

  // ===============================
  // SWITCH TO END MODE
  // ===============================
  const handleStopCharging = () => {
    setOtpMode("END");
    setOtp("");
    setOtpId(null);
    setMessage("");
  };

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">

        {chargingEnded && (
          <div className="alert alert-success">
            Charging completed successfully.
          </div>
        )}

        {chargingStarted && !chargingEnded && (
          <>
            <h5 className="text-success">Charging In Progress</h5>
            <button
              className="btn btn-danger mt-2"
              onClick={handleStopCharging}
            >
              Stop Charging
            </button>
          </>
        )}

        {!chargingEnded && (!chargingStarted || otpMode === "END") && (
          <>
            <h5 className="mt-3">
              {otpMode === "START"
                ? "Start Charging OTP"
                : "End Charging OTP"}
            </h5>

            <button
              className="btn btn-outline-primary mt-2"
              onClick={handleGenerateOtp}
            >
              Generate OTP
            </button>

            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="btn btn-success mt-3"
              onClick={handleVerifyOtp}
              disabled={!otpId}
            >
              Verify OTP
            </button>

            {message && (
              <div className="alert alert-info mt-3">
                {message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OtpModal;
