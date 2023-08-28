import { DataType, Model, Column, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Category } from './category.js'

@Table({
  tableName: 'subject',
  underscored: true,
  timestamps: false,
})
export class Subject extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => Category)
  @Column
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;
}
