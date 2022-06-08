const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('../backend/config/db');
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require('./routes/userRoutes');
const compoundInterestCalculationRoutes = require('./routes/compoundInterestCalculationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/compound-interest-calculations', compoundInterestCalculationRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
