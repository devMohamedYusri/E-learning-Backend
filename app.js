const express = require('express');
const connectDB = require('./config/db'); 
const userRoute = require('./routes/user.route');
const coursesRoutes=require("./routes/course.route");
const app = express();
connectDB();
app.use(express.json());
app.use("/api/users",userRoute);
app.use('/api/courses',coursesRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

});
