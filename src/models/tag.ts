import { DataType, Model, Column, Table } from 'sequelize-typescript';

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
    id!: number;

    @Column(DataType.STRING)
    name!: string;
}
