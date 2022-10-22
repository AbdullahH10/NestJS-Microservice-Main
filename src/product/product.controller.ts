import { ProductService } from './product.service';
import { Controller, Get, HttpService, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices'


@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        private httpService: HttpService
    ){}
    
    @Get()
    async all() {
        return await this.productService.all();
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = this.productService.findOne(id);

        this.httpService.post(`http://localhost:8000/api/products/${id}/like`).subscribe(
            res => {
                console.log(res);
            }
        )
        
        return this.productService.update(
            id,
            {
                likes: (await product).likes+1
            }
        );
    }

    @EventPattern('product_created')
    async create(product: any) {
        await this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        });
    }

    @EventPattern('product_updated')
    async update(product: any) {
        await this.productService.update(
            product.id,
            {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
            }
        );
    }

    @EventPattern('product_deleted')
    async delete(id: number) {
        await this.productService.delete(id);
    }
}
