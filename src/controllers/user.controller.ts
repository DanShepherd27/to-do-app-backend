import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { UUID } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async upsert(@Body() users: User[], @Res() res: Response) {
    try {
      await this.userService.upsert(users);
      return res
        .status(200)
        .json({ message: 'User(s) upserted successfully.' });
    } catch (e) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get()
  async findOne(@Query('id') id: UUID, @Res() res: Response) {
    const user: User | null = await this.userService.findOne(id);
    if (user !== null) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User not found.' });
  }
}
