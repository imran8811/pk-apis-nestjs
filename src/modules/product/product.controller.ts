import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete, Put} from '@nestjs/common';
import { ProductDTO, ProductFilterDTO } from 'src/dtos';
import { ProductImageDTO } from 'src/dtos/product/image.dto';
import { ProductService } from 'src/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getAll')
  async getAllProducts() {
    const res = await this.productService.getAllProducts();
    return res;
  }

  @Get('details/:id')
  async getProductById(@Param() param) {
    const res = await this.productService.getProductById(param.id);
    return res;
  }

  @Get(':dept/:category/:id')
  async getProductByCategoryDeptArticleNo(@Param() param) {
    const res = await this.productService.getProductByCategoryDeptArticleNo(param.dept, param.category, param.id);
    return res;
  }
  
  @Get(':dept/:category')
  async getProductByCategoryDept(@Param() param) {
    const res = await this.productService.getProductByCategoryDept(param.dept, param.category);
    return res;
  }

  @Get('getLatestArticleNo')
  async getLatestArticleNo() {
    const res = await this.productService.getLatestArticleNo();
    return res? res.articleNo : '10050';
  }

  @Post('update-image-path')
  async UpdateProductImagePath(@Res() response, @Body() productImageDTO: ProductImageDTO) {
    try {
      const res = await this.productService.UpdateProductImagePath(productImageDTO);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'Image path updates',
        data: res
      })
      
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: err
      })
    }
  }

  @Post()
  async addProduct(@Res() response, @Body() addProductDTO: ProductDTO) {
    try {
      const newProduct = await this.productService.addProduct(addProductDTO);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'new Product has been added successfully',
        data: newProduct
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: err
      })
    }
  }

  @Post('GetProductsByFilters')
  async getProductByFilters(@Res() response, @Body() productFilterDTO: ProductFilterDTO){
    try {
      const filteredProducts = await this.productService.getProductsByFilters(productFilterDTO);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        data: filteredProducts
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not Found!',
        error: 'Bad Request'
      })
    }
  }

  @Delete(':articleNo')
  async deleteProductById(@Res() response, @Param() param) {
    try {
      const productDelRes = await this.productService.deleteProductById(param.articleNo);
      const productImagesDelRes = await this.deleteProductImages(param.articleNo);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        productDelRes,
        productImagesDelRes
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to delete!',
        error: 'Bad Request'
      })
    }
  }

  async deleteProductImages(articleNo:string) {
    const res = await this.productService.deleteProductImages(articleNo);
    return res;
  }
}
