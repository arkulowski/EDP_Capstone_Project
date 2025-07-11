// Imports
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// Configurations
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());

// MongoDB client setup
let db;
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Route: /
app.get('/', async (req, res) => {
    try {
        res.status(200).send('Server is running');
      } catch (err) {
        console.error('Error in / route:', err);
        res.status(500).send('Server error');
      }
});

// Route: /api/ping
app.get('/api/ping', (req, res) => {
  res.json({ message: 'ping from the server'})

})

// Route: /api/employees
app.get('/api/employees', async (req, res) => {
  try {
    // Logic to fetch employees
    const employeeCollection = db.collection('Employees');
    const employees = await employeeCollection.find({}).toArray();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees" });
  }
});

// Route: /api/employees/:id
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Logic to fetch a specific employee by id
    const employeeCollection = db.collection('Employees');
    const employee = await employeeCollection.findOne({employee_id : parseInt(id)});
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error fetching character with ID: ${id}` });
  }
});

// Route: /api/search
app.get('/api/search', async (req, res) =>{
  const { fQuery, lQuery } = req.query
  const requestingEmployeeId = req.headers['x-employee-id'];
  
  if (!requestingEmployeeId) {
    return res.status(400).json({ message: 'Missing Employee ID' });
  }

  const query = []
  if (fQuery){ query.push({firstname: { $regex: `^${fQuery}`, $options: 'i' }}) }
  if (lQuery) { query.push({lastname: { $regex: `^${lQuery}`, $options: 'i' }}) }

  try {
    // Logic to return searched values
    const employeeCollection = db.collection('Employees');
    const employee = await employeeCollection.find({ $and: query }).toArray();
    
    const filtered = employee.map(emp => {
      const isSelf = emp.employee_id === parseInt(requestingEmployeeId);
      const isManager = emp.manager_id === parseInt(requestingEmployeeId);

      return {
        employee_id: emp.employee_id,
        manager_id: emp.manager_id,
        firstname: emp.firstname,
        lastname: emp.lastname,
        phone_number: emp.phone_number,
        Age: emp.Age,
        Gender: emp.Gender,
        Country: emp.Country,
        Race: emp.Race,
        Job_Title: emp['Job Title'], // if the DB uses this format
        Senior: emp.Senior,
        Education_Level: emp['Education Level'],
        Years_of_Experience: emp['Years of Experience'],
        ...(isSelf || isManager ? { Salary: emp.Salary } : {}) // Only include salary if it's the same person
      };
    });

    res.json(filtered);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error searching employees' });
  }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});