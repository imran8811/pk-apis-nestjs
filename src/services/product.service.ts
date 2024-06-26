import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductDTO } from 'src/dtos/product/product.dto';
import { ProductImageDTO } from 'src/dtos/image.dto';

import { IProduct } from 'src/interfaces/product.interface';
import { IProductImage } from 'src/interfaces/image.interface';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private product: Model<IProduct>,
    @InjectModel('ProductImages') private productImages: Model<IProductImage>
  ){}

  async addProduct(addProductDTO: ProductDTO): Promise<IProduct>{
    const newProduct = new this.product(addProductDTO);
    return newProduct.save();
  }

  async updateProduct(productId, data): Promise<any>{
    let filter = { _id: productId }
    // return {
    //   productId,
    //   data
    // };
    let update = data 
    const updateProduct = await this.product.findOneAndUpdate(filter, update, {new: true});
    return updateProduct;
  }

  getProductByCategoryDept(dept: string, category: string){
    const getProducts = this.product.find({
      dept,
      category
    })
    .populate('productImages')
    .exec();
    return getProducts;
  }

  getProductById(productId:number){
    const getProductById = this.product.findOne({
      _id : productId
    })
    .populate('productImages')
    .exec();
    return getProductById;
  }

  getProductByCategoryDeptArticleNo(dept: string, category: string, productId:string){
    const getProductDetails = this.product.find({
      dept: dept,
      category: category,
      _id: productId,
    })
    .populate('productImages')
    .sort({'createdAt': -1})
    .exec();
    return getProductDetails;
  }

  getAllProducts(){
    const getAllProducts = this.product.find().populate('productImages').exec();
    return getAllProducts;
  }

  deleteProductById(articleNo:string){
    return this.product.deleteOne({
      articleNo,
    }).exec();
  }

  deleteProductImages(articleNo:string){
    return this.productImages.deleteOne({
      articleNo,
    }).exec();
  }

  getLatestArticleNo(){
    const res = this.product.findOne().sort({'createdAt' : -1 }).exec();
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
      const newProductImage = new this.productImages(productImageDTO);
      const res = await newProductImage.save();
      this.UpdateProductImageId(productImageDTO.articleNo, res._id)
    }
  }

  async UpdateProductImageId(articleNo, objectId): Promise<any>{
    return this.product.updateOne({
      articleNo
    }, {
      $push :{
        productImages : objectId
      }
    }, {
      upsert: false, 
      new: true
    })
  }

  getProductsByFilters(filters){
    return this.product.find({
      dept: filters.dept,
      category: filters.category,
      color: filters.color,
      fitting: filters.fitting,
      washType: filters.washType
    }).exec();
  }
}
