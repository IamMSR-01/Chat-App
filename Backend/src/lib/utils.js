import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Yeh hamesha 'true' hona chahiye production mein
    sameSite: "none", // Yeh "none" hona chahiye cross-domain ke liye
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};