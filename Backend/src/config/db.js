import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB_NAME || "WildVista",
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Connected database name: ${conn.connection.name}`);
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;