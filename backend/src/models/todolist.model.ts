import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { TodoItem } from './todoitem.model';

export interface TodoListAttributes {
    todoListId: number;
    name: string;
}

export interface TodoListCreationAttributes extends Optional<TodoListAttributes, "todoListId"> { };

export class TodoList extends Model<TodoListAttributes, TodoListCreationAttributes> implements TodoListAttributes {
    todoListId!: number;
    name!: string;

    public getTodoItems!: HasManyGetAssociationsMixin<TodoItem>;
    public addItem!: HasManyAddAssociationMixin<TodoItem, number>;

    public readonly todoItems?: TodoItem[];

    public static associations: {
        todoItems: Association<TodoList, TodoItem>;
    }

    public static initialize(sequelize: Sequelize) {
        TodoList.init(
            {
                todoListId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { tableName: "todolists", sequelize }
        );
        TodoList.hasMany(TodoItem, {
            sourceKey: "todoListId",
            foreignKey: "todoListId",
            as: "todoItems"
        });
    }
}