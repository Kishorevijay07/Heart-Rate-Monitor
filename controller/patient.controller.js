import db from "../db.js";

export const InsertPatient = async (req, res) => {
  try {
    
    const userId = req.user?.id; 
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, age, gender, medicalHistory } = req.body;
    if (!name || !age || !gender || !medicalHistory) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const sql = "INSERT INTO patients (name, age, gender, medicalHistory, userId) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, age, gender, medicalHistory, userId], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Error adding patient" });
      }
      res.status(201).json({ message: "Patient added successfully", patientId: result.insertId });
    });
  } catch (error) {
    console.error("InsertPatient Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getallpatient = (req, res) => {

  try {
    const sql = "SELECT * FROM patients";

    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: "Error retrieving patients" });

      if (results.length === 0){
        res.status(200).json({message:"The patients list is empty"})
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
}



export const getpatientbyid = (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing patient ID" });
    }

  const sql = "SELECT * FROM patients WHERE id = ?";
  db.query(sql, [id], (err, results) => {

      if (err) {
          console.error("Database Query Error:", err.message);
          return res.status(500).json({ error: "Database query failed" });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: "Patient not found" });
      }
      res.json(results[0]);
  })} 
  catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
};
