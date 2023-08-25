import { DataType, Model, Column, Table, BelongsToMany } from 'sequelize-typescript'
import { User } from './User.js'
import { UserRole } from './UserRole.js'

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
