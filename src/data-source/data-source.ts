import type { DataSourceOptions } from 'typeorm'
import { DataSource } from 'typeorm'

import { TodoEntity } from '../todo/entity/todo.entity'

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [TodoEntity],
}

export const AppDataSource = new DataSource(dataSourceOptions)
