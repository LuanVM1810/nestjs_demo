import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './user.entity';

export const toUserResponse = (user: User): UserResponseDto => {
  return plainToInstance(UserResponseDto, user, {
    excludeExtraneousValues: true,
  });
};

export const toUsersResponse = (users: User[]): UserResponseDto[] => {
  return users.map((user) => toUserResponse(user));
};
