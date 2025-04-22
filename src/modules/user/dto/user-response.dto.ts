import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  isActive: boolean;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
