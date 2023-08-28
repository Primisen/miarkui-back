import { DataType, Model, Column, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Subject } from './subject.js'
import { User } from './User.js'

@Table({
  tableName: 'review',
  underscored: true,
  timestamps: false,
})
export class Review extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column(DataType.STRING)
  text!: string;

  @ForeignKey(() => Subject)
  @Column
  subjectId!: number;

  @BelongsTo(() => Subject)
  subject!: Subject;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
