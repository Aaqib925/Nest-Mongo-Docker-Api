import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    NotFoundException,
    Delete,
    Param,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    public async getAllUsers(
        @Res() res: any,
        @Query() paginationQuery: PaginationQueryDto,
    ) {
        const users = await this.userService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Res() res, @Param('id') userId: string) {
        if (!userId) {
            throw new NotFoundException('User ID does not exist');
        }

        const user = await this.userService.findOne(userId);

        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    public async addUser(
        @Res() res,
        @Body() createUserDto: CreateUserDto,
    ) {
        try {
            const user = await this.userService.create(createUserDto);
            return res.status(HttpStatus.OK).json({
                message: 'User has been created successfully',
                user: user,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not created!',
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    @Put('/:id')
    public async updateUser(
        @Res() res,
        @Param('id') userId: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        try {
            const user = await this.userService.update(
                userId,
                updateUserDto,
            );
            if (!user) {
                throw new NotFoundException('User does not exist!');
            }
            return res.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                user: user,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not updated!',
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    @Delete('/:id')
    public async deleteUser(@Res() res, @Param('id') userId: string) {
        if (!userId) {
            throw new NotFoundException('User ID does not exist');
        }

        const user = await this.userService.remove(userId);

        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user,
        });
    }
}
