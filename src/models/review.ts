import { DataType, Model, Column, Table, BelongsTo, ForeignKey, BelongsToMany, HasMany } from 'sequelize-typescript'
import { Subject } from './subject.js';
import { User } from './user.js';
import { Tag } from './tag.js';
import { TagReview } from './tagReview.js';
import { Comment } from './comment.js'

@Table({
    tableName: 'review',
    underscored: true,
    timestamps: false,
})
export class Review extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.STRING)
    text!: string;

    @ForeignKey(() => Subject)
    @Column
    subjectId!: number;

    @BelongsTo(() => Subject)
    subject!: Subject;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column(DataType.STRING)
    coverImageUrl!: string;

    @BelongsToMany(() => Tag, () => TagReview)
    tags!: Tag[];

    @HasMany(() => Comment)
    comments?: Comment[]
}
