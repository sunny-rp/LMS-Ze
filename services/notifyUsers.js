import cron from "node-cron";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { BorrowBook } from "../models/borrowbook.model";
import { User } from "../models/user.model";
import { sendEmail } from "../utils/sendEmail";

export const notifyUsers = () => {
    cron.schedule("*/30 * * * *",async () =>{
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const borrowers = await BorrowBook.find({
                dueDate: { $lt: oneDayAgo },
                returnDate: null,
                notified: false,
            });


            for(const element of borrowers){
                if(element.user && element.user.email){
                    const user = await User.findById(element.user.id);
                    sendEmail({
                        email: element.user.email,
                        subject: "Book Return Reminder",
                        message: `Dear ${element.user.name},\n\nThis is a friendly reminder that the book you borrowed is overdue. Please return it as soon as possible to avoid any fines.\n\nThank you!`,
                    })

                    element.notified = true;
                    await element.save();
                }
            }
        } catch (error) {
            console.error("Error in notifyUsers cron job:", error);
        }
    })
}