import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AddProductDTO, UpdateProductDTO } from 'src/dtos/product.dto';
import { IProduct } from 'src/interfaces/product.interface';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

  constructor(@InjectModel('Product') private productModel: Model<IProduct>){}

  async addProduct(addProductDTO: AddProductDTO): Promise<IProduct>{
    const newProduct = await new this.productModel(addProductDTO);
    return newProduct.save();
  }

  getProductByCategoryDept(dept: string, category: string){
    return this.productModel.find({
      dept: dept,
      category: category,
    }).exec();
  }

  productImageUpload(){
    
  }
}
