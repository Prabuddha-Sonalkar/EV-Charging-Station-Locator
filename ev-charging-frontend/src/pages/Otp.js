// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { generateOtp, verifyOtp, getAllOtps } from "../api/otpApi";

// function Otp({ show, onClose, bookingId }) {
//   const [otp, setOtp] = useState("");
//   const [otpId, setOtpId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleGenerateOtp = async () => {
//     try {
//       setLoading(true);

//       // 1️⃣ Generate OTP
//       await generateOtp(bookingId);

//       // 2️⃣ Fetch OTP ID (existing backend API)
//       const res = await getAllOtps();

//       const latestOtp = res.data
//         .filter(o => o.booking.bookingId === bookingId)
//         .sort((a, b) => b.otpId - a.otpId)[0];

//       if (!latestOtp) {
//         setMessage("OTP generation failed");
//         return;
//       }

//       setOtpId(latestOtp.otpId);
//       setMessage("OTP sent to your email");

//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to generate OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       setLoading(true);

//       await verifyOtp(otpId, otp);

//       setMessage("OTP verified. Charging started.");
//       navigate("/customer");

//     } catch (err) {
//       console.error(err);
//       setMessage("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!show) return null;

//   return (
//     <div
//       className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
//       style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//     >
//       <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "380px" }}>
//         <h4 className="text-center fw-bold mb-3">OTP Verification</h4>

//         <button
//           className="btn btn-primary w-100 mb-3"
//           onClick={handleGenerateOtp}
//           disabled={loading}
//         >
//           Generate OTP
//         </button>

//         <div className="mb-3">
//           <label className="form-label">Enter OTP</label>
//           <input
//             type="text"
//             className="form-control"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             disabled={!otpId}
//           />
//         </div>

//         <button
//           className="btn btn-success w-100"
//           onClick={handleVerifyOtp}
//           disabled={!otpId || loading}
//         >
//           Verify OTP
//         </button>

//         <p className="text-center mt-3">{message}</p>

//         <button
//           className="btn btn-link text-danger mt-2 w-100"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Otp;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateOtp, verifyOtp, getAllOtps } from "../api/otpApi";

function Otp({ show, onClose, bookingId }) {
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGenerateOtp = async () => {
    try {
      setLoading(true);

      // 1️⃣ Generate OTP
      await generateOtp(bookingId);

      // 2️⃣ Fetch OTP ID (existing backend API)
      const res = await getAllOtps();

      const latestOtp = res.data
        .filter(o => o.booking.bookingId === bookingId)
        .sort((a, b) => b.otpId - a.otpId)[0];

      if (!latestOtp) {
        setMessage("OTP generation failed");
        return;
      }

      setOtpId(latestOtp.otpId);
      setMessage("OTP sent to your email");

    } catch (err) {
      console.error(err);
      setMessage("Failed to generate OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      await verifyOtp(otpId, otp);

      setMessage("OTP verified. Charging started.");
      navigate("/customer");

    } catch (err) {
      console.error(err);
      setMessage("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "380px" }}>
        <h4 className="text-center fw-bold mb-3">OTP Verification</h4>

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleGenerateOtp}
          disabled={loading}
        >
          Generate OTP
        </button>

        <div className="mb-3">
          <label className="form-label">Enter OTP</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!otpId}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handleVerifyOtp}
          disabled={!otpId || loading}
        >
          Verify OTP
        </button>

        <p className="text-center mt-3">{message}</p>

        <button
          className="btn btn-link text-danger mt-2 w-100"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Otp;