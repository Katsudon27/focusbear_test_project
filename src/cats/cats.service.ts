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

    addCat(cat_id: number, cat_name : string){
        const newCat = { id: cat_id, name: cat_name}
        this.cats.push(newCat);
        return true;
    }
}
