import { 
    CreateDateColumn, 
    DeleteDateColumn, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from 'typeorm'

export class EntityBase {

  @PrimaryGeneratedColumn()
  id?: number

  @DeleteDateColumn({ select: false, nullable: true })
  deletedAt?: Date

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}