import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  createUser(name: string, email: string){
    const user = this.userRepository.create({ name, secretEmail: email });
    return this.userRepository.save(user);
  }

  // Get all users
  findAll(){
    return this.userRepository.find();
  }

  // Get all users
  findOne(id: number){
    return this.userRepository.findOneBy({ id });
  }

  // Update a user
  updateUser(id: number, name: string, email: string) {
    return this.userRepository.update(id, {name, secretEmail: email});
  }

  // Delete a user
  deleteUser(id: number){
    return this.userRepository.delete(id);
  }
}