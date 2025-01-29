import type { Pool, PoolOptions } from 'mysql2/promise'

import mysql from 'mysql2/promise'
import Status from './status'

export default class DataBase {
    private readonly config: PoolOptions
    private db: Pool | null
    private readonly status: Status

    constructor() {
        this.config = {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        }

        this.db = null

        this.status = new Status()
    }

    connect() {
        const badConnectionStatus = this.status.serverError("Can't connect to database")

        try {
            this.db = mysql.createPool(this.config)

            if (this.db) return this.status.ok()

            return badConnectionStatus
        } catch (err) {
            console.log(err)
        }

        return badConnectionStatus
    }

    async query<T = {}>(query: string) {
        const badConnectionStatus = this.status.serverError("Can't connect to database")

        if (!this.db) return badConnectionStatus

        try {
            const [result] = await this.db.query(query)
            return this.status.ok<T>(result as T)
        } catch (err) {
            console.log(err)
        }

        return badConnectionStatus
    }
}
