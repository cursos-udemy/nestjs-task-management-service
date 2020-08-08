import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaksById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = { id: uuidv4(), title, description, status: TaskStatus.OPEN };
    this.tasks.push(task);
    return task;
  }

  public deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  public updateTaskStatus(id: string, newStatus: TaskStatus) : Task {
    const task = this.getTaksById(id);
    if (task) {
      task.status = newStatus
    }
    return task;
  }
}
