import api from "./axios";

export const generateOtp = (bookingId, otpType = "START_CHARGING") => {
  return api.post("/otp", {
    bookingId: bookingId,
    otpType: otpType,
  });
};

export const verifyOtp = (otpId, otpCode) => {
  return api.post("/otp/verify", {
    otpId: otpId.toString(),
    otpCode: otpCode,
  });
};

export const getAllOtps = () => {
  return api.get("/otp");
};
