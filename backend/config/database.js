import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "dotolist",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to PostgreSQL database");
        client.release();
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

export const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error("Database query error:", error.message);
        throw error;
    }
};

export default pool;
