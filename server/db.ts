import pg from "pg";
import { poolConfig } from "./config/database.config";

const { Pool } = pg;
const db = new Pool(poolConfig);

export { db };
