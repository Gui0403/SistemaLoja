import { IsEmail, IsDateString, IsString } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class CreateUserDto {

  @PrimaryColumn()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: string;
}
