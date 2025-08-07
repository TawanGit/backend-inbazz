import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: jest.Mocked<CategoryService>;

  const mockCategories = [
    {
      id: 1,
      name: 'General',
      description: 'Default category for tasks without specific classification',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    categoryService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<CategoryService>;

    categoryController = new CategoryController(categoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const newCategory = {
        id: 1,
        name: 'Casa',
        description: 'tarefas de casa',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      categoryService.create.mockResolvedValue(newCategory);

      const result = await categoryController.create(newCategory);
      expect(result).toEqual(newCategory);
      expect(categoryService.create).toHaveBeenCalledWith(newCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      categoryService.findAll.mockResolvedValue(mockCategories);

      const result = await categoryController.findAll();
      expect(result).toEqual(mockCategories);
      expect(categoryService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category by ID', async () => {
      const mockCategory = {
        id: 1,
        name: 'Test Category',
        description: 'Creating one category just for test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      categoryService.findOne.mockResolvedValue(mockCategory);

      const result = await categoryController.findOne(1);
      expect(result).toEqual(mockCategory);
      expect(categoryService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return null if category not found', async () => {
      categoryService.findOne.mockResolvedValue(null);

      const result = await categoryController.findOne(999);
      expect(result).toBeNull();
      expect(categoryService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = 1;
      const updateDto = {
        name: 'Updated Category',
        description: 'Updated description',
      };

      const updatedCategory = {
        id,
        name: 'Updated Category',
        description: 'Updated description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(categoryService, 'update').mockResolvedValue(updatedCategory);

      const result = await categoryController.update(id, updateDto);

      expect(result).toEqual(updatedCategory);
      expect(categoryService.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  it('should remove a category', async () => {
    const id = 1;

    const deletedCategory = {
      id,
      name: 'Category Test',
      description: 'Just a test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(categoryService, 'remove').mockResolvedValue(deletedCategory);

    const result = await categoryController.remove(id);

    expect(result).toEqual(deletedCategory);
    expect(categoryService.remove).toHaveBeenCalledWith(id);
  });
});
