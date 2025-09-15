import { Controller, Get, Param, Post, Body, Logger, Req, Inject } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCat.dto';
import { Logger as PinoLogger } from 'nestjs-pino';

@Controller('cats')
export class CatsController {
    constructor (private readonly catsService: CatsService,
        @Inject(PinoLogger) private readonly logger: PinoLogger
    ) {}

    @Get()
    getCats(){
        return this.catsService.findAll();
    }

    @Get(':id')
    getCat(@Param('id') id: string){
        return this.catsService.findOne(Number(id));
    }

    @Post()
    addCat(@Body() createCatDto: CreateCatDto, @Req() req: Request){
        this.logger.log(`Headers: ${JSON.stringify(req.headers)}`);
        this.logger.log(`Payload: ${JSON.stringify(createCatDto)}`);
        return this.catsService.addCat(Date.now(), createCatDto.name); 
    }
}
