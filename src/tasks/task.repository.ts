import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm/index';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dtos/filter-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('task');
    if (status) query.andWhere('task.status = :status', { status });
    if (search) query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    return query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    return task.save();
  }

}