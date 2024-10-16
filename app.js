const express = require('express');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/user.route');
const app = express();
connectDB();
app.use(express.json());
app.use("/api/users",userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

});
