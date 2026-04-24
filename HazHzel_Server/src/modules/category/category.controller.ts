import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public, ResponseMessage } from '@/shared/decorators/customize';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ResponseMessage('Create category successful')
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('Check createCategory:', createCategoryDto);
    return this.categoryService.create(createCategoryDto, files);
  }

  @Get('/admin')
  @ResponseMessage('Fetched all categories for admin successful')
  findAllForAdmin(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.categoryService.findAllForAdmin(
      query,
      Number(current) || 1,
      Number(pageSize) || 10,
    );
  }

  @Get()
  @ResponseMessage('Fetched all categories successful')
  findAll(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.categoryService.findAll(
      query,
      Number(current) || 1,
      Number(pageSize) || 10,
    );
  }
  @Public()
  @Get('nav-metadata')
  @ResponseMessage('Get navigation metadata successful')
  getNavMetadata() {
    return this.categoryService.getNavMetadata();
  }

  @Get(':id')
  @ResponseMessage('Fetched category successful')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Get('/by-slug/:slug')
  @ResponseMessage('Fetched category by slug')
  findBySlug(@Param('slug') slug: string) {
    return this.categoryService.findIdBySlug(slug);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  @ResponseMessage('Update category successful')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.categoryService.update(id, updateCategoryDto, files);
  }

  @Delete(':id')
  @ResponseMessage('Delete category successful')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
