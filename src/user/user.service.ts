import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { create } from 'domain';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>
  ) {}


  async createU(createUserDto: CreateUserDto) {
    const newuser = await this.userRepo.create(createUserDto)
    await this.userRepo.save(newuser)
    return newuser
  }

  async findAll() {
    return await this.userRepo.find()
  }

  async findOneById(id: string) {
    const founduser = await this.userRepo.findOneBy({id})
    if (!founduser) throw new HttpException('xxxx', HttpStatus.NOT_FOUND)
    return founduser

  }

  async findOneByEmail(email: string) {
    const founduser = await this.userRepo.findOneBy({email})
    if (!founduser) throw new HttpException('xxxx', HttpStatus.NOT_FOUND)
    return founduser

  }  


  async updateU(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto)
    const updateduser = await this.userRepo.findOneBy({id})
    if (updateduser) return updateduser
  }

  async deleteU(id: string) {
    const deleteresponse = await this.userRepo.delete(id)
    if (!deleteresponse.affected) throw new HttpException('xxxx', HttpStatus.NOT_FOUND)
  }
}
