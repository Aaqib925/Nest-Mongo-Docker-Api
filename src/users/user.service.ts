import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    public async findAll(
        paginationQuery: PaginationQueryDto,
    ): Promise<User[]> {
        const { limit, offset } = paginationQuery;

        return await this.userModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
    }

    public async findOne(userId: string): Promise<User> {
        const user = await this.userModel
            .findById({ _id: userId })
            .exec();

        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return user;
    }

    public async create(
        createUserDto: CreateUserDto,
    ): Promise<IUser> {
        const newUser = await this.userModel.create(createUserDto);
        return newUser;
    }

    public async update(
        userId: string,
        updateUserDto: UpdateUserDto,
    ): Promise<IUser> {
        const existingUser = await this.userModel.findByIdAndUpdate(
            { _id: userId },
            updateUserDto,
        );

        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return existingUser;
    }

    public async remove(userId: string): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndRemove(
            userId,
        );
        return deletedUser;
    }
}
