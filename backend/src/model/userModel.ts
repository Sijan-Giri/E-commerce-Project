import {
    Table,
    Model,
    Column,
    DataType
} from "sequelize-typescript"

@Table({
    tableName : "users",
    modelName : "User",
    timestamps : true
})

class User extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type : DataType.STRING
    })
    declare username : string

    @Column({
        type : DataType.STRING
    })
    declare email : string

    @Column({
        type : DataType.ENUM("admin","customer"),
        defaultValue : "customer"
    })
    declare role : string

    @Column({
        type : DataType.STRING
    })
    declare password : string
}

export default User