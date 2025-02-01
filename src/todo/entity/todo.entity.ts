import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date
}
