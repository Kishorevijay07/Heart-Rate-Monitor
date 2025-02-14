import db from "../db.js";
import bcrypt from "bcrypt";
import generatetoken from "../utils/generatewebtoken.js";

export const Register = async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!email){
          return res.status(400).json({error : "The Email Not Provided"})
      }
      if(!password){
          return res.status(400).json({error : "The password is not Provided"})
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Invalid email format" });
      }
      const existing_email_sql = "SELECT * FROM users WHERE email=?";
      const emailval = [email];
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      db.query(existing_email_sql, emailval, (err, result) => {
          if (err) return res.status(500).json({ error: "Email check failed" });
      
          if (result.length > 0) {
              return res.status(400).json({ message: "User already exists", email: result[0].email });
          }
  
          const register_sql = "INSERT INTO users (email, password) VALUES (?, ?)";
          db.query(register_sql, [email, hashedPassword], (err, registerResult) => {
          if (err) return res.status(500).json({ error: "Registration failed" });
    
          generateToken(registerResult.insertId, res);

          res.status(201).json({ message: "User registered successfully", userId: registerResult.insertId });
          });
      });
  
      } catch (error) {
          console.error(`Error occurred: ${error.message}`);
          res.status(500).json({ error: "Internal server error" });
      }
  }

export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
  
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
  
        
        if (result.length === 0) {// Check if user exists
          return res.status(401).json({ message: "user not Found Check email" });
        }
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: "Incorrect password" });
        }
        generatetoken(user.id, res);
        res.json({ message: "Login successfully", user: { id: user.id, email: user.email } });
      });
  
    } catch (error) {
      console.error(`Error occurred: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }