import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm/index';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}