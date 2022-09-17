import { ProductService } from './product.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ){}
    
    @Get()
    async all() {
        this.productService.all();
    }
}
