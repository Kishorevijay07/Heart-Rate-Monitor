import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import userRoutes from "./routes/user.route.js";
import patientRoutes from "./routes/patient.route.js";
import heartRateRoutes from "./routes/heartrate.route.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
dotenv.config();
app.use("/users", userRoutes);
app.use("/patients", patientRoutes);
app.use("/heart-rate", heartRateRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
