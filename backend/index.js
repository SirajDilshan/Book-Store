import express from "express";
import bookModel from "./models/bookModel.js";
import connectDB from './db.js';
import { PORT } from './config.js';
import bookRoute from "./routes/bookRoute.js";

const app = express();

app.use(express.json());

app.use("/books", bookRoute);

const startServer = async () => {
    try {
        await connectDB(); // ✅ Wait for MongoDB to connec


        app.listen(PORT, () => {
            console.log(`App is listining to Port : ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error);
    }
};

startServer();



