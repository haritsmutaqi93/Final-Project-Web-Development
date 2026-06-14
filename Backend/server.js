const express = require("express");
const db = require("./config/db");

const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const facilityRoutes = require("./routes/facilityRoutes");

const eventRoutes = require("./routes/eventRoutes");

const userRoutes = require("./routes/userRoutes");

const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", authRoutes);

app.use("/api", bookingRoutes);

app.use("/api", facilityRoutes);

app.use("/api", eventRoutes);

app.use("/api",userRoutes);

app.use("/api",reportRoutes);

app.get("/", (req,res)=>{
    res.send("ARENANGOR API RUNNING");
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});