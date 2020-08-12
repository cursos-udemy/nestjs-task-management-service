import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm/index';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('task');
    query.andWhere('task.user.id = :userId', { userId: user.id });
    if (status) query.andWhere('task.status = :status', { status });
    if (search) query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    return query.getMany();
  }

  async getTaskByIdAndUserId(id: number, userId: number): Promise<Task> {
    const query = this.createQueryBuilder('task');
    query.andWhere('task.user.id = :userId', { userId: userId });
    query.andWhere('task.id = :taskId', { taskId: id });
    return query.getOne();
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    task.status = TaskStatus.OPEN;
    await task.save();
    delete task.user;
    return task;
  }

  async deleteTaskById(id: number, user: User): Promise<any> {
    const query = this.createQueryBuilder('task')
      .delete()
      .andWhere('id = :id', { id })
      .andWhere('user = :userId', { userId: user.id });
    return await query.execute();
  }

}