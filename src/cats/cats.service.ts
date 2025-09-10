import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    private cats = [{id: 1, name:"Alice"}];

    findAll(){
        return this.cats;
    }

    findOne(id: number){
        return this.cats.find(cat => cat.id === id);
    }
}
