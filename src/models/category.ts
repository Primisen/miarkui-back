import { DataType, Model, Column, Table } from 'sequelize-typescript';

@Table({
    tableName: 'category',
    underscored: true,
    timestamps: false,
})
export class Category extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column(DataType.STRING)
    name: string;
}
