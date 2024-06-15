import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Model } from 'mongoose';
import { ICart } from 'src/interfaces';
export declare class IsItemAlreadyExistConstraint implements ValidatorConstraintInterface {
    private cartModel;
    constructor(cartModel: Model<ICart>);
    validate(productId: any, args: ValidationArguments): Promise<boolean>;
}
export declare function IsItemAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
