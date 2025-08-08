import { TaskStatus } from './../../generated/prisma';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: jest.Mocked<TaskService>;

  const now = new Date();

  const mockTasks = [
    {
      id: 1,
      title: 'General Task',
      description: 'Default task for items without specific classification',
      status: TaskStatus.PENDING,
      userId: 'user-1',
      categoryId: 1,
      createdAt: now,
      updatedAt: now,
    },
  ];

  beforeEach(() => {
    taskService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<TaskService>;

    taskController = new TaskController(taskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const now = new Date();

      const newTask = {
        id: 2,
        title: 'Casa',
        description: 'tarefas de casa',
        status: TaskStatus.PENDING,
        userId: 'user-123',
        categoryId: 1,
        createdAt: now,
        updatedAt: now,
      };

      const mockRequest = { user: { userId: 'user-123' } };

      taskService.create.mockResolvedValue(newTask);

      const result = await taskController.create(newTask, mockRequest as any);

      expect(result).toEqual(newTask);
      expect(taskService.create).toHaveBeenCalledWith(newTask, 'user-123');
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      taskService.findAll.mockResolvedValue(mockTasks);

      const result = await taskController.findAll();

      expect(result).toEqual(mockTasks);
      expect(taskService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task by ID', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Creating one task just for test',
        status: TaskStatus.PENDING,
        userId: 'user-1',
        categoryId: 2,
        createdAt: now,
        updatedAt: now,
      };

      taskService.findOne.mockResolvedValue(mockTask);

      const result = await taskController.findOne(1);

      expect(result).toEqual(mockTask);
      expect(taskService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return null if task not found', async () => {
      taskService.findOne.mockResolvedValue(null);

      const result = await taskController.findOne(999);

      expect(result).toBeNull();
      expect(taskService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const id = 1;
      const now = new Date();

      const updateDto = {
        title: 'Updated Task',
        description: 'Updated description',
        status: TaskStatus.PENDING,
        userId: 'user-1',
        categoryId: 3,
      };

      const updatedTask = {
        id,
        ...updateDto,
        createdAt: now,
        updatedAt: now,
      };

      taskService.update.mockResolvedValue(updatedTask);

      const result = await taskController.update(id, updateDto);

      expect(result).toEqual(updatedTask);
      expect(taskService.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const id = 1;

      const deletedTask = {
        id,
        title: 'Task Test',
        description: 'Just a test',
        status: TaskStatus.PENDING,
        userId: 'user-123',
        categoryId: 2,
        createdAt: now,
        updatedAt: now,
      };

      taskService.remove.mockResolvedValue(deletedTask);

      const result = await taskController.remove(id);

      expect(result).toEqual(deletedTask);
      expect(taskService.remove).toHaveBeenCalledWith(id);
    });
  });
});
