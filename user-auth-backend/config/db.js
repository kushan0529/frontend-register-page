import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const configureDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to db✅");
    } catch (err) {
        console.log("not connected", err.message);
    }
};

export default configureDB;