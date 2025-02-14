import express from "express";
import protectroute from './../middleware/protectroue.js';
import { InsertPatient,getallpatient,getpatientbyid} from "../controller/patient.controller.js";
const router = express.Router();


router.post("/",protectroute, InsertPatient);//insertting a patient and adding user id
router.get("/", getallpatient); //Get all patient 
router.get("/:id", getpatientbyid);// Get Patient by ID

export default router;
