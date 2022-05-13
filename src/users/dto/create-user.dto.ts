import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsInt,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;
  
  @IsDate()
  @IsNotEmpty()
  readonly dateOfBirth: Date;

  @IsDate()
  @IsNotEmpty()
  readonly previousDay: Date;

  @IsInt()
  @IsNotEmpty()
  readonly balance: number;
}
