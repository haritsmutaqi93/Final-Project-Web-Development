const express = require("express");
const path = require("path");
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

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../Frontend")));

app.use("/api", authRoutes);
app.use("/api", bookingRoutes);
app.use("/api", facilityRoutes);
app.use("/api", eventRoutes);
app.use("/api", userRoutes);
app.use("/api", reportRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});