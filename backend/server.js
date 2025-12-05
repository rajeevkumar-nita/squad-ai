const express = require('express');
const cors = require('cors');
const chatRoutes = require('./src/routes/chatRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Squad AI Backend is Running! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});