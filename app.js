import express from "express";
import bodyParser from "body-parser";
// import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import database connection
import connectDB from "./db.js";

// Connect to MongoDB
connectDB();


// Import routes
import userRoutes from "./routes/userroutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

// Use routes
app.use("/user", userRoutes); 
app.use("/permission", permissionRoutes);
app.use("/role", roleRoutes);
app.use("/group", groupRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
}); 

// Start the server
const PORT = process.env.PORT || 3501;
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);
});