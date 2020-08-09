import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class FilterTaskDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn(Object.keys(TaskStatus))
  status: TaskStatus;
}