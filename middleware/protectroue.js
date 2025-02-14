import jwt from "jsonwebtoken";
import db from "./../db.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; 

    if (!token) {
      return res.status(401).json({ error: "Unauthorized, no token provided" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_CODE);

    const sql = "SELECT id, email FROM users WHERE id = ?";
    
    db.query(sql, [decoded.user_id], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      req.user = result[0];
      next();
    });

  } catch (error) {
    console.error("Middleware Error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default protectRoute;
