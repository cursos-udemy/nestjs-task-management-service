import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  public getTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Task[] {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.getTasksWithFilters(filterTaskDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) newStatus: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, newStatus);
  }

}
