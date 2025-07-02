import express from "express";
import cors from "cors";
import connectDB from './db.js';
import { PORT } from './config.js';
import bookRoute from "./routes/bookRoute.js";

const app = express();

app.use(cors());

// app.use(cors({
//   origin: "http://localhost:3000", // only allow this frontend
//   methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
//   credentials: true, // if you're sending cookies or auth headers
//   allowedHeaders:['Content-Type'],
// }));

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



