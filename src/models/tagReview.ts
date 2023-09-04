import { DataType, Model, Column, Table, ForeignKey } from 'sequelize-typescript'
import { Tag } from './tag.js'
import { Review } from './review.js'

@Table({
  tableName: 'tag_review',
  underscored: true,
  timestamps: false,
})
export class TagReview extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Tag)
  @Column
  tagId!: number;

  @ForeignKey(() => Review)
  @Column
  reviewId!: number;
}
