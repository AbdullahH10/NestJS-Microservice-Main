import { Product, ProductDocument } from './product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) {}

    async all(): Promise<Product[]>{
        return await this.productModel.find().exec();
    }

    async create(productData): Promise<Product> {
        return new this.productModel(productData).save();
    }

    async findOne(id: number): Promise<Product> {
        return this.productModel.findById({id});
    }

    async update(id: number, productData): Promise<any> {
        return this.productModel.findOneAndUpdate({id}, productData);
    }

    async delete(id: number): Promise<any> {
        return this.productModel.deleteOne({id});
    }
}
