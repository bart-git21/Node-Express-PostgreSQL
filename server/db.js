import pg from "pg";
import { poolConfig } from "./config/database.config.js";
const { Pool } = pg;
const db = new Pool(poolConfig);
export { db };
