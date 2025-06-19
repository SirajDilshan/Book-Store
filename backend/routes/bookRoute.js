// routes/bookRouter.js
import express from "express";
import bookModel from "../models/bookModel.js";

const router = express.Router();

// ✅ Create a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBook = new bookModel({ title, author, publishYear });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("❌ Error saving book:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Get all books
router.get("/", async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({
      Count: books.length,
      Data: books,
    });
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// ✅ Get book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("❌ Error fetching book:", error);
    res.status(500).json({ error: "Failed to retrieve book" });
  }
});

// ✅ Update book by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("❌ Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// ✅ Delete book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "📚 Book deleted successfully",
      deleted: deletedBook,
    });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default router;
