import type { DataSourceOptions } from 'typeorm'
import { DataSource } from 'typeorm'

import { Todo } from './entity/Todo'

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [Todo],
}

export const AppDataSource = new DataSource(dataSourceOptions)
