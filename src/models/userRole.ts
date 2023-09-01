import { DataType, Model, Column, Table, ForeignKey } from 'sequelize-typescript'
import { User } from './user.js'
import { Role } from './role.js'

@Table({
  tableName: 'user_role',
  underscored: true,
  timestamps: false,
})
export class UserRole extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Role)
  @Column
  roleId!: number;
}
