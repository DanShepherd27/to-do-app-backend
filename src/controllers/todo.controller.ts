import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';
import { UUID } from 'crypto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async sync(
    @Body() body: { changed: Todo[]; removed: Todo[] },
    @Res() res: Response,
  ) {
    try {
      await this.todoService.syncLog(body.changed, body.removed);
      await this.todoService.upsert(body.changed);
      await this.todoService.remove(body.removed);
      return res.status(200).json({ message: 'Synced successfully.' });
    } catch {
      return res.status(500).json({ message: 'Sync failed' });
    }
  }

  @Get()
  async findAll(@Query('userId') userId: UUID, @Res() res: Response) {
    try {
      const todos: Todo[] = await this.todoService.findAll(userId);
      return res.status(200).json(todos);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(404).json(e.message);
      }
      return res.status(500);
    }
  }

  @Get()
  async findOne(@Query('id') id: UUID, @Res() res: Response) {
    const todo: Todo | null = await this.todoService.findOne(id);
    if (todo !== null) {
      return res.status(200).json(todo);
    }
    return res.status(404).json({ message: 'Item not found.' });
  }
}
