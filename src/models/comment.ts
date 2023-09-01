import { DataType, Model, Column, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from './user.js'
import { Review } from './review.js'

@Table({
  tableName: 'comment',
  underscored: true,
  timestamps: false,
})
export class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column(DataType.STRING)
  text!: string;

  @ForeignKey(() => Review)
  @Column
  reviewId!: number;

  @BelongsTo(() => Review)
  review!: Review;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
