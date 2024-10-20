import "dotenv/config";
import type { Config } from "drizzle-kit";

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debugging step

export default {
    schema: "./db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Using the DATABASE_URL
    },
} satisfies Config;
