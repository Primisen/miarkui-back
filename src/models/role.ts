import { DataType, Model, Column, Table, BelongsToMany } from 'sequelize-typescript'
import { User } from './user.js'
import { UserRole } from './userRole.js'

@Table({
    tableName: 'role',
    underscored: true,
    timestamps: false
})
export class Role extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @BelongsToMany(() => User, () => UserRole)
    users!: User[];
}
