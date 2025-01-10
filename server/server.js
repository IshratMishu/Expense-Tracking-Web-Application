const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 6001;

//middleware
app.use(cors({
  origin: 'http://localhost:3000/',  
  methods: ['GET', 'POST']
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zzqeakj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();

    // Expense collection setup
    const expenseCollection = client.db("ExpenseDB").collection("addExpense");

    // POST endpoint to add an expense
    app.post('/api/addExpense', async (req, res) => {
      const newExpense = req.body;
      try {
        const result = await expenseCollection.insertOne(newExpense);
        res.send(result);
      } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).send({ error: "Failed to add expense" });
      }
    });

    // GET endpoint to fetch all expenses
    app.get('/api/addExpense', async (req, res) => {
      try {
        const cursor = expenseCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error("Error reading expense:", error);
        res.status(500).send({ error: "Failed to read expense" });
      }
    })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Expense IS RUNNING');
})

app.listen(port, () => {
  console.log(`Expenses are running on port, ${port}`);
})


