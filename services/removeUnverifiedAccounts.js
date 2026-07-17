import cron from 'node-cron';
import { User } from '../models/User.js';
import { sendEmail } from '../utils/emailService.js';


export const removeUnverifiedAccounts = async() => {
    cron.schedule("*/10 * * * *", async() =>{
         const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
         await User.deleteMany({ isVerified: false, createdAt: { $lt: tenMinutesAgo } });
    })
}