import { Column , Table , DataType , Model } from "sequelize-typescript";

@Table({
    tableName : "orders",
    modelName : "Order",
    timestamps : true
})

class Order extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string;

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    declare phoneNumber : string;

    @Column({
        type : DataType.STRING,
        allowNull : false
    })

    declare shippingAddress : string;

    @Column({
        type : DataType.FLOAT,
        allowNull : false
    })
    declare totalAmount : number;

    @Column({
        type : DataType.ENUM('pending','cancelled','delivered','onTheWay','preparation'),
        defaultValue : "pending",
        allowNull : false
    })
    declare orderStatus : string
}

export default Order