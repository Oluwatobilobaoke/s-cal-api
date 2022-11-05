import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Calculation extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public user_id!: string;

  @Column({ type: 'varchar' })
  public expression!: string;

  @Column({ type: 'varchar' })
  public result: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public inserted_at: Date;
}
