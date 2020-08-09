import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {

  public transform(value: string): TaskStatus {
    value = value.toUpperCase();
    if (!(value in TaskStatus)) {
      throw new BadRequestException(`'${value}' is a invalid task status`);
    }
    return TaskStatus[value];
  }

}