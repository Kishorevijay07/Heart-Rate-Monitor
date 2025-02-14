import jwt from "jsonwebtoken";

const generateToken = (user_id, res) => {
  const token = jwt.sign({ user_id }, process.env.SECRET_CODE, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    sameSite: "strict",
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV !== "development", // Secure in production
  });
};

export default generateToken;
