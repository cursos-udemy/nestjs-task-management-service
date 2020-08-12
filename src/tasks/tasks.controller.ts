import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { json } from 'express';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  private logger = new Logger(TasksController.name);

  constructor(private tasksService: TasksService) {
  }

  @Get()
  public getTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterTaskDto: FilterTaskDto): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retrieving all tasks with filters ${JSON.stringify(filterTaskDto)}`);
    return this.tasksService.getTasks(filterTaskDto, user);
  }

  @Get('/:id')
  public getTaskById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.debug(`User ${user.username} retrieving all tasks with filters ${JSON.stringify(createTaskDto)}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  public deleteTask(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) newStatus: TaskStatus): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, newStatus, user);
  }
}
