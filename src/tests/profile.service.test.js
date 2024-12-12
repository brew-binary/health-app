const ProfileService = require('../services/profile.service');
const { ProfileAggregatedHealthData } = require('../model');

jest.mock('../model', () => ({
  ProfileAggregatedHealthData: {
    create: jest.fn(),
  },
}));

describe('ProfileService', () => {
  describe('aggregateHeartRateData', () => {
    it('should throw an error if HEART_RATE.data is not an array', async () => {
      const reqBody = { clinical_data: { HEART_RATE: { uom: 'beats/min', data: 'not an array' } } };
      const userId = 'user123';

      await expect(ProfileService.aggregateHeartRateData(reqBody, userId))
        .rejects
        .toThrow('Invalid HEART_RATE data: Data should be an array');
    });

    it('should throw an error if HEART_RATE.data array is empty', async () => {
      const reqBody = { clinical_data: { HEART_RATE: { uom: 'beats/min', data: [] } } };
      const userId = 'user123';

      await expect(ProfileService.aggregateHeartRateData(reqBody, userId))
        .rejects
        .toThrow('Invalid HEART_RATE data: Data array is empty');
    });

    it('should throw an error if HEART_RATE.data contains invalid on_date', async () => {
      const reqBody = {
        clinical_data: {
          HEART_RATE: {
            uom: 'beats/min',
            data: [{ on_date: 'invalid date', measurement: '70' }],
          },
        },
      };
      const userId = 'user123';

      await expect(ProfileService.aggregateHeartRateData(reqBody, userId))
        .rejects
        .toThrow('Invalid HEART_RATE data at index 0: Invalid or missing on_date');
    });

    it('should throw an error if HEART_RATE.data contains invalid measurement', async () => {
      const reqBody = {
        clinical_data: {
          HEART_RATE: {
            uom: 'beats/min',
            data: [{ on_date: '2023-01-01T00:00:00Z', measurement: 'invalid' }],
          },
        },
      };
      const userId = 'user123';

      await expect(ProfileService.aggregateHeartRateData(reqBody, userId))
        .rejects
        .toThrow('Invalid HEART_RATE data at index 0: Invalid or missing measurement');
    });

    it('should aggregate heart rate data and save it', async () => {
      const reqBody = {
        clinical_data: {
          HEART_RATE: {
            uom: 'beats/min',
            data: [
              { on_date: '2023-01-01T00:00:00Z', measurement: '70' },
              { on_date: '2023-01-01T00:10:00Z', measurement: '75' },
              { on_date: '2023-01-01T00:20:00Z', measurement: '80' },
            ],
          },
        },
      };
      const userId = 'user123';

      const result = await ProfileService.aggregateHeartRateData(reqBody, userId);

      expect(result).toEqual([
        {
          from_date: '2023-01-01T00:00:00.000Z',
          to_date: '2023-01-01T00:15:00.000Z',
          measurement: { low: '70', high: '75' },
        },
        {
          from_date: '2023-01-01T00:20:00.000Z',
          to_date: '2023-01-01T00:35:00.000Z',
          measurement: { low: '80', high: '80' },
        },
      ]);

      expect(ProfileAggregatedHealthData.create).toHaveBeenCalledWith({
        profileId: userId,
        data: result,
      });
    });
  });
});