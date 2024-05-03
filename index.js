const express = require('express');
const app = express();

require('dotenv').config();
const connectDB = require('./connection/conn')
const productsRoutes = require('./routes/product');
const ordersRoutes = require('./routes/orders')
// const AdminRoutes = require('./routes/admin')
const main = require('./routes/main')
app.use(express.json())


app.use('/api/login', main)
app.use('/api/product', productsRoutes);
// app.use('/api/admin', AdminRoutes);
app.use('/api/order', ordersRoutes);

const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
start();
  