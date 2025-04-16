import { 
  BeforeInsert,
    CreateDateColumn, 
    DeleteDateColumn, 
    PrimaryColumn, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid';

export class EntityBase {

  @PrimaryColumn('uuid')
  id?: string

  @DeleteDateColumn({ select: false, nullable: true })
  deletedAt?: Date

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}