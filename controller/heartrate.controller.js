import db from "../db.js";

    //One-to-Many Relationship : One patient can have many heart rate records.

    //The patientId in heart_rates is a foreign key linking it to the patients table.

    //ON DELETE CASCADE ensures that if a patient is deleted, their heart rate records are also removed.
export const Inseretheartrecorddetails =  (req, res) => {
    try {
        const { bpm, patientId } = req.body;
    
        if (!bpm || !patientId) {
        return res.status(400).json({ error: "Both bpm and patientId are required" });
        }
        const recordedAt= new Date();
    
        const sql = "INSERT INTO heart_rates (bpm, patientId, recordedAt) VALUES (?, ?, ?)";
   
        db.query(sql, [bpm, patientId, recordedAt], (err, result) => {
        if (err) return res.status(500).json({ error: "Error recording heart rate" });
    
        let alert = null;
        if (bpm < 50) {
            alert = "Low heart rate detected! Seek medical attention.";
        } else if (bpm > 120) {
            alert = "High heart rate detected! Seek medical attention.";
        }
   
        res.status(201).json({ 
            message: "Heart rate recorded", 
            recordId: result.insertId, 
            alert 
        });
        });  
    } 
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });   
    }
  }

  export const getalldataofpatient = (req, res) => {
    try {
        const { patientId } = req.params;
        if (!patientId || isNaN(patientId)) {
            return res.status(400).json({ error: "Invalid or missing patient ID" });
        }
        const sql = "SELECT * FROM heart_rates WHERE patientId = ? ORDER BY recordedAt DESC";
        db.query(sql, [patientId], (err, results) => {
            if (err) {
                console.error("Database Error:", err.message);
                return res.status(500).json({ error: "Error retrieving heart rate data" });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "No heart rate records found for this patient" });
            }
            res.json(results);
        });
    }
     catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

  export const latestheartrateofpatient = (req, res) => {
    try {
        const { patientId } = req.params;
    
        const sql = "SELECT * FROM heart_rates WHERE patientId = ? ORDER BY recordedAt DESC LIMIT 1";
        db.query(sql, [patientId], (err, result) => {
        if (err) return res.status(500).json({ error: "Error retrieving latest heart rate" });
    
        if (result.length === 0) {
            return res.status(404).json({ message: "No heart rate records found for this patient" });
        }
    
        res.json(result[0]);
        });
            
        } 
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });   
    }
  }

  export const avarageheartreateofpatient =  (req, res) => {
    try {
        const { patientId } = req.params;

        const sql = "SELECT AVG(bpm) AS avgBpm FROM heart_rates WHERE patientId = ?";
        db.query(sql, [patientId], (err, result) => {
        if (err) return res.status(500).json({ error: "Error calculating average heart rate" });
    
        res.json({ patientId, averageBpm: result[0].avgBpm });
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  }