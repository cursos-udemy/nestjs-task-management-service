import { TasksService } from './tasks.service';
import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

const mockUser = { id: 10, username: 'test-user' };
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  getTaskByIdAndUserId: jest.fn(),
  createTask: jest.fn(),
  deleteTaskById: jest.fn(),
});

describe(TasksService.name, () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('get all tasks from repository', async () => {
      taskRepository.getTasks.mockResolvedValue('some value');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const result = await tasksService.getTasks(new FilterTaskDto(), mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some value');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.getTaskByIdAndUserId and successfully retrieve and return the task', async () => {
      const mockTask = { title: 'test-title', description: 'test-description' };
      taskRepository.getTaskByIdAndUserId.mockResolvedValue(mockTask);

      expect(taskRepository.getTaskByIdAndUserId).not.toHaveBeenCalled();
      const findTaskId: number = 1;
      const result = await tasksService.getTaskById(findTaskId, mockUser);
      expect(taskRepository.getTaskByIdAndUserId).toHaveBeenCalledWith(findTaskId, mockUser.id);
      expect(result).toEqual(mockTask);
    });

    it('throw NotFoundException when task not found', async () => {
      taskRepository.getTaskByIdAndUserId.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask and create a task', async () => {
      taskRepository.createTask.mockResolvedValue(new Task());

      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const createTaskDto = { title: 'test-title', description: 'test-description' };
      const result = await tasksService.createTask(createTaskDto, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto, mockUser);
      expect(result).toBeInstanceOf(Task);
    });
  });

  describe('deleteTask', () => {
    it('calls taskRepository.deleteTaskById and delete task', async () => {
      taskRepository.deleteTaskById.mockResolvedValue({ affected: 1 });

      expect(taskRepository.deleteTaskById).not.toHaveBeenCalled();
      const taskId = 10;
      await tasksService.deleteTask(taskId, mockUser);
      expect(taskRepository.deleteTaskById).toHaveBeenCalledWith(taskId, mockUser);
    });

    it('throw Error when task not found', async () => {
      taskRepository.deleteTaskById.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTaskStatus', () => {
    it('update task status ', async () => {
      const mockSave = jest.fn().mockResolvedValue(true);

      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save: mockSave,
      });
      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      expect(mockSave).not.toHaveBeenCalled();
      const taskId = 11;
      const newTaskStatus = TaskStatus.IN_PROGRESS;
      const result = await tasksService.updateTaskStatus(taskId, newTaskStatus, mockUser);
      expect(tasksService.getTaskById).toHaveBeenCalledWith(taskId, mockUser);
      expect(mockSave).toHaveBeenCalled();
      expect(result.status).toEqual(newTaskStatus);
    });

  });
});