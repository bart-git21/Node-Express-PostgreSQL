import "dotenv/config";

type PoolConfigType = {
    user?: string,
    host?: string,
    database?: string,
    password?: string,
    port?: number,
}

export const poolConfig : PoolConfigType = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
};
