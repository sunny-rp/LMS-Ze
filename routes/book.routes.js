import express from "express";
import {isAuthenticated} from "../middlewares/authMiddleware.js";
import { addBook, getAllBooks, deleteBook } from "../controllers/book.controller.js";
import { isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/add-book", isAuthenticated,isAuthorized("Admin"), addBook);
router.get("/get-all-books", isAuthenticated, getAllBooks);
router.delete("/admin/delete-book/:id", isAuthenticated,isAuthorized("Admin"), deleteBook);





export default router;