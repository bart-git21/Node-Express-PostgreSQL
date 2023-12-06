import pg from "pg";
const { Pool } = pg;

const poolConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
}
const db = new Pool(poolConfig);

export { db };
