import { Request } from 'express';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Logger,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { ProductService } from './product.service';

@Controller('api/admin/products')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('product-resource')
export class ProductController {
    logger = new Logger('ProductController');

    constructor(private readonly productService: ProductService) {}

    @Get('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Get the list of products' })
    @ApiResponse({
        status: 200,
        description: 'List all products',
    })
    async getAllProducts(): Promise<any[]> {
        return await this.productService.findAll();
    }
}
