import { DataType, Model, Column, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from './user.js'
import { Subject } from './subject.js'

@Table({
  tableName: 'rating',
  underscored: true,
  timestamps: false,
})
export class Rating extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column(DataType.SMALLINT)
  score: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Subject)
  @Column
  subjectId: number;

  @BelongsTo(() => Subject)
  subject: Subject;
}
