import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { DATABASE_CONNECTION } from './../db/database-connection';

const DBMock = {
  query: {
    PropertyTable: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
};

describe('PropertiesService', () => {
  let service: PropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: DATABASE_CONNECTION,
          useValue: DBMock,
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
  });

  describe('getPropertyList', () => {
    const mockListings = [
      {
        id: 1,
        title: 'Test Property',
        price: '500000',
        bedrooms: 3,
        bathrooms: 2,
      },
    ];

    beforeEach(() => {
      DBMock.query.PropertyTable.findMany.mockResolvedValue(mockListings);
      DBMock.where.mockResolvedValue([{ count: 1 }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return paginated properties', async () => {
      const result = await service.getPropertyList({ page: 1, limit: 10 });

      expect(result.data).toEqual(mockListings);
      expect(result.paginationMeta).toBeDefined();
    });
  });

  describe('getPropertyById', () => {
    const mockProperty = { id: 1, title: 'Test Property', agent: { id: 1 } };

    beforeEach(() => {
      DBMock.query.PropertyTable.findFirst.mockResolvedValue(mockProperty);
    });

    it('should return property with agent', async () => {
      const result = await service.getPropertyById('1', false);
      expect(result).toEqual(mockProperty);
    });

    it('should include adminMetadata when isAdmin is true', async () => {
      await service.getPropertyById('1', true);

      expect(DBMock.query.PropertyTable.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          with: { agent: true, adminMetadata: true },
        }),
      );
    });

    it('should exclude adminMetadata when isAdmin is false', async () => {
      await service.getPropertyById('1', false);

      expect(DBMock.query.PropertyTable.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          with: { agent: true },
        }),
      );
    });
  });
});
