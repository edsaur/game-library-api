import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/AuthRoutes.js";
import gameRouter from "./routes/GameRoutes.js";


const app = express();
app.use(express.json()); 


// Check for required environment variables
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined in the environment variables.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("connected to database");
}).catch((error) => {
    console.log(error);
});

//  API Routes
app.use("/api/auth", authRouter);
app.use("/api/games", gameRouter);

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});


app.listen(process.env.PORT || 5000, () => {
    console.log("server started");
});
