import { DataType, Model, Column, Table, BelongsToMany } from 'sequelize-typescript'
import { Review } from './review.js';
import { TagReview } from './tagReview.js';

@Table({
    tableName: 'tag',
    underscored: true,
    timestamps: false,
})
export class Tag extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column(DataType.STRING)
    name: string;

    @BelongsToMany(() => Review, () => TagReview, 'tag_id')
    reviews: Review[]

}
