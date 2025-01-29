import type { Pool, PoolOptions } from 'mysql2/promise'

import mysql from 'mysql2/promise'

export default class DataBase {
    private readonly config: PoolOptions
    private db: Pool | null

    constructor() {
        this.config = {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        }

        this.db = null
    }

    connect() {
        try {
            this.db = mysql.createPool(this.config)
        } catch (err) {
            console.log(err)
        }
    }

    async query(query: string) {
        if (!this.db) return null

        try {
            const [result] = await this.db.query(query)
            return result
        } catch (err) {
            console.log(err)
        }

        return null
    }
}
