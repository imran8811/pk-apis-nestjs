import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductDTO } from 'src/dtos/product/product.dto';
import { ProductImageDTO } from 'src/dtos/product/image.dto';

import { IProduct } from 'src/interfaces/product.interface';
import { IProductImage } from 'src/interfaces/image.interface';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('product') private productInfo: Model<IProduct>,
    @InjectModel('productimage') private productImages: Model<IProductImage>
  ){}

  async addProduct(addProductDTO: ProductDTO): Promise<IProduct>{
    const newProduct = await new this.productInfo(addProductDTO);
    return newProduct.save();
  }

  getProductByCategoryDept(dept: string, category: string){
    const getProducts = this.productInfo.find({
      dept,
      category
    })
    .populate('productImages')
    .exec();
    return getProducts;
  }

  getProductById(productId:number){
    const getProductById = this.productInfo.find({
      productId
    })
    .populate('productImages')
    .exec();
    return getProductById;
  }

  getProductByCategoryDeptArticleNo(dept: string, category: string, articleNo:number){
    const getProductDetails = this.productInfo.find({
      dept: dept,
      category: category,
      articleNo: articleNo,
    }).populate('productImages')
    .exec();
    return getProductDetails;
  }

  getAllProducts(){
    const getAllProducts = this.productInfo.find().populate('productImages').exec();
    return getAllProducts;
  }

  deleteProductById(articleNo:string){
    return this.productInfo.deleteOne({
      articleNo,
    }).exec();
  }

  deleteProductImages(articleNo:string){
    return this.productImages.deleteOne({
      articleNo,
    }).exec();
  }

  getLatestArticleNo(){
    const res = this.productInfo.findOne().sort({'createdAt' : -1 }).exec();
    return res;
  }

  async UpdateProductImagePath(productImageDTO: ProductImageDTO): Promise<any>{
    let doc = await this.productImages.findOne({articleNo: productImageDTO.articleNo});
    if(doc) {
      if(productImageDTO.frontImgUrl != ''){
        doc.frontImgUrl = productImageDTO.frontImgUrl
      }
      if(productImageDTO.backImgUrl != ''){
        doc.backImgUrl = productImageDTO.backImgUrl
      }
      if(productImageDTO.other1ImgUrl != ''){
        doc.other1ImgUrl = productImageDTO.other1ImgUrl
      }
      if(productImageDTO.other2ImgUrl != ''){
        doc.other2ImgUrl = productImageDTO.other2ImgUrl
      }
      if(productImageDTO.other3ImgUrl != ''){
        doc.other3ImgUrl = productImageDTO.other3ImgUrl
      }
      const res =  await doc.save();
      this.UpdateProductImageId(productImageDTO.articleNo, res._id)
      return res;
    } else {
      const newProductImage = await new this.productImages(productImageDTO);
      const res = await newProductImage.save();
      this.UpdateProductImageId(productImageDTO.articleNo, res._id)
    }
  }

  async UpdateProductImageId(articleNo, objectId): Promise<any>{
    return this.productInfo.updateOne({
      articleNo
    }, {
      $push :{
        productImages : objectId
      }
    }, {
      upsert: false, 
      new: true
    }
    )
  }

  getProductsByFilters(filters){
    return this.productInfo.find({
      dept: filters.dept,
      category: filters.category,
      color: filters.color,
      fitting: filters.fitting,
      washType: filters.washType
    }).exec();
  }
}
