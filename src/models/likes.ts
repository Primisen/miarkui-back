import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from './user.js'
import { Review } from './review.js'

@Table({
    tableName: 'likes',
    underscored: true,
    timestamps: false,
})
export class Likes extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Review)
    @Column
    reviewId: number;
}
