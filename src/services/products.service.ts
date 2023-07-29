import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

  getMenJeansPants(){
    return 'All products'
  }

}
