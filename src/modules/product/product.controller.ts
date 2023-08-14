import { Controller, Get, Post, Res, Param, Body, HttpStatus, UseInterceptors, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddProductDTO } from 'src/dtos/product.dto';
import { IProduct } from 'src/interfaces/product.interface';
import { ProductService } from 'src/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':dept/:category')
  async getProductByCategoryDept(@Param() param) {
    const res = await this.productService.getProductByCategoryDept(param.dept, param.category);
    return res;
  }

  @Post('create')
  async addProduct(@Res() response, @Body() addProductDTO: AddProductDTO) {
    try {
      const newProduct = await this.productService.addProduct(addProductDTO)
      return response.status(HttpStatus.CREATED).json({
        message: 'new Product has been added successfully',
        data: newProduct
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request'
      })
    }
  }

  @Post('image-upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
        ]
      })
    ) 
    file: Express.Multer.File
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
