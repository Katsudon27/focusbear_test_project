import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCat.dto';

@Controller('cats')
export class CatsController {
    constructor (private readonly catsService: CatsService) {}

    @Get()
    getCats(){
        return this.catsService.findAll();
    }

    @Get(':id')
    getCat(@Param('id') id: string){
        return this.catsService.findOne(Number(id));
    }

    @Post()
    addCat(@Body() createCatDto: CreateCatDto){
        return this.catsService.addCat(Date.now(), createCatDto.name); 
    }
}
