import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { IUserAddress } from 'src/interfaces/user-address.interface';
import { UserAddressDTO } from 'src/dtos/auth/user-address.dto';
export declare class UserAccountService {
    private userModel;
    private userAddressModel;
    constructor(userModel: Model<IUser>, userAddressModel: Model<IUserAddress>);
    getUserAccount(id: string): Promise<any>;
    getUserAddresses(id: string): Promise<any>;
    createUserAddress(userAddressDTO: UserAddressDTO): Promise<IUserAddress>;
}
