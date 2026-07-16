import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/user.model.js";
import { Book } from "../models/book.model.js";


export const addBook = catchAsyncErrors(async (req, res, next) => {
    const {title,author,description,price,quantity} = req.body;

    if(!title || !author || !description || !price || !quantity){
        return next(new ErrorHandler("Please provide all required fields",400));
    }

    const book = await Book.create({
        title,
        author,
        description,
        price,
        quantity
    });

    if(!book){
        return next(new ErrorHandler("Something went wrong. Book not added",400));
    }
    res.status(201).json({
        success: true,
        message: "Book added successfully",
        book
    });
});

export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        books,
        message: "Books fetched successfully",
        
    });
})

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const book = await Book.findById(id);
    if(!book){
        return next(new ErrorHandler("Book not found",404));
    }
    await book.deleteOne();
    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
});