import { DataType, Model, Column, Table, BelongsToMany } from 'sequelize-typescript'
import { Role } from './role.js'
import { UserRole } from './userRole.js'

@Table({
    tableName: 'user',
    underscored: true,
    timestamps: false,
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];
}
