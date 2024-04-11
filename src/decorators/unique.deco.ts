import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';
import { ICart } from 'src/interfaces';

@ValidatorConstraint({ async: true })
export class IsItemAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(@InjectModel('cart') private cartModel: Model<ICart>) { }

  validate(productId: any, args: ValidationArguments) {
    return this.cartModel.findOne({
      productId
    }).then(item => {
      if (item) return false;
      return true;
    });
  }
}

export function IsItemAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsItemAlreadyExistConstraint,
    });
  };
}