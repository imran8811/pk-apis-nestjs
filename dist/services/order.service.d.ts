/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { OrderDTO } from 'src/dtos';
import { IOrder, ICart } from 'src/interfaces';
export declare class OrderService {
    private orderModel;
    private cartModel;
    constructor(orderModel: Model<IOrder>, cartModel: Model<ICart>);
    getAllOrdersByUser(userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, IOrder> & IOrder & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    createOrder(orderDTO: OrderDTO): Promise<any>;
    deleteCartItemByUserId(userId: string): Promise<any>;
}
