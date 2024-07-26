import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete, Put} from '@nestjs/common';
import { Public } from 'src/decorators/public.deco';
import { ProductDTO, ProductFilterDTO } from 'src/dtos';
import { ProductImageDTO } from 'src/dtos/image.dto';
import { ProductService } from 'src/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  
  @Public()
  @Get('getAll')
  async getAllProducts() {
    const res = await this.productService.getAllProducts();
    return res;
  }
  
  @Public()
  @Get('details/:articleNo')
  async getProductById(@Param() param) {
    const res = await this.productService.getProductByArticleNo(param.articleNo);
    return res;
  }
  
  @Public()
  @Get(':dept/:category/:id')
  async getProductByCategoryDeptArticleNo(@Param() param) {
    const res = await this.productService.getProductByCategoryDeptArticleNo(param.dept, param.category, param.id);
    return res;
  }
  
  @Public()
  @Get(':dept/:category')
  async getProductByCategoryDept(@Param() param) {
    const res = await this.productService.getProductByCategoryDept(param.dept, param.category);
    return res;
  }
  
  @Public()
  @Get(':dept')
  async getProductByDept(@Param() param) {
    const res = await this.productService.getProductByDept(param.dept);
    return res;
  }

  @Public()
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

  @Public()
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

  @Public()
  @Post('getLatestArticleNo')
  async getLatestArticleNo() {
    const res = await this.productService.getLatestArticleNo();
    return res? res.articleNo : '10050';
  }

  @Put(':id')
  async updateProduct(@Res() response, @Body() body, @Param() params) {
    try {
      const updateProduct = await this.productService.updateProduct(params.id, body);
      return response.status(HttpStatus.ACCEPTED).json({
        type: 'success',
        message: 'Product has been updated successfully',
        data: updateProduct
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not updated!',
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
