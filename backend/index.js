import express from "express";
import bookModel from "./models/bookModel.js";
import connectDB from './db.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());

const startServer = async () => {
    try {
        await connectDB(); // ✅ Wait for MongoDB to connect

        // Define routes after DB is ready
        app.get("/", (req, res) => {
            console.log(req.method, req.url);
            return res.status(200).send("🎉 Hello, World! Your server is working!")
        });

        // ✅ Route to create a new book
        app.post("/books", async (req, res) => {
            try {
                const { title, author, publishYear } = req.body;

                // Validation (optional)
                if (!title || !author || !publishYear) {
                    return res.status(400).json({ error: "All fields are required" });
                }

                const newBook = new bookModel({
                    title,
                    author,
                    publishYear
                });

                const savedBook = await newBook.save(); // Save to MongoDB
                res.status(201).json(savedBook); // Send response
            } catch (error) {
                console.error("❌ Error saving book:", error);
                res.status(500).json({ error: "Server Error" });
            }
        });


       

        app.listen(PORT, () => {
            console.log(`App is listining to Port : ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error);
    }
};

startServer();



