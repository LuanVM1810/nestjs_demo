import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { toUserResponse, toUsersResponse } from './user.mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return toUsersResponse(users);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
    });
    return toUserResponse(user);
  }

  async create(userData: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);
    return toUserResponse(savedUser);
  }

  async update(id: number, userData: UpdateUserDto): Promise<UserResponseDto> {
    await this.findOne(id);
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<string> {
    await this.findOne(id);
    await this.userRepository.delete(id);
    return `Delete user ${id} successfully`;
  }
}
