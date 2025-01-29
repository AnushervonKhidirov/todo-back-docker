import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'todos' })
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    text: string

    @Column({ type: 'timestamp' })
    created_at: Date
    
}