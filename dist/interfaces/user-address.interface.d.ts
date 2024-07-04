import { Document } from "mongoose";
export interface IUserAddress extends Document {
    addressId: string;
    userId: string;
    country: string;
    state: string;
    city: string;
    area: string;
    postalCode: string;
    addressType: string;
    shippingAddressId: string;
}
