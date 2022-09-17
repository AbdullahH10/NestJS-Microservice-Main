import { ProductService } from './product.service';
import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices'


@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ){}
    
    @Get()
    async all() {
        this.productService.all();
    }

    @EventPattern('hello')
    async hello(data: string) {
        console.log(data);
    }
}
