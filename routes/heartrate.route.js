import express from "express";
import db from "../db.js";
import { Inseretheartrecorddetails , getalldataofpatient ,latestheartrateofpatient,avarageheartreateofpatient} from "../controller/heartrate.controller.js";

const router = express.Router();

router.post("/",Inseretheartrecorddetails);
router.get("/:patientId",getalldataofpatient);
router.get("/:patientId/latest", latestheartrateofpatient);
router.get("/:patientId/average",avarageheartreateofpatient);

export default router;
