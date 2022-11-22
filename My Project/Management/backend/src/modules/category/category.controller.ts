import { Request } from 'express';
import { Body, ClassSerializerInterceptor, Controller, Get, Logger, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { CategoryService } from './category.service';
import { CategoryInfoDTO, CategoryCreateDTO } from './dtos'

@Controller('api/category')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('category-resource')
export class CategoryController {
    logger = new Logger('CategoryController');

    constructor(private readonly categoryService: CategoryService) {}

    @Get('/get-all')
    @ApiOperation({ title: 'Get the list of categories' })
    @ApiResponse({
        status: 200,
        description: 'List all categories',
        type: CategoryInfoDTO,
    })
    async getAllCategories(): Promise<CategoryInfoDTO[]> {
        return await this.categoryService.findAll();
    }

    @Post('/create')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create create' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CategoryCreateDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createUser(@Req() req: Request, @Body() categoryCreateDTO: any): Promise<any> {
        return {};
    }
}
