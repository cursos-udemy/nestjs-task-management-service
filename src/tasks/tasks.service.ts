import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { DeleteResult } from 'typeorm/index';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
  }

  public async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDto, user);
  }

  public async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.getTaskByIdAndUserId(id, user.id);
    if (!found) throw new NotFoundException(`Task with id '${id}' not found`);
    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  public async updateTaskStatus(id: number, newStatus: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = newStatus;
    return task.save();
  }

  public async deleteTask(id: number, user: User): Promise<void> {
    const result: DeleteResult = await this.taskRepository.deleteTaskById(id, user)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id '${id}' not found`);
    }

    //const task = await this.getTaskById(id, user);
    //if (!task) throw new NotFoundException(`Task with id '${id}' not found`);
    //await this.taskRepository.remove(task);
  }
}
