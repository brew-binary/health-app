const {  ProfileAggregatedHealthData } = require('../model');

class ProfileService {
  static async aggregateHeartRateData(reqBody, userId) {
    const clinicalData = reqBody.clinical_data;
    const heartRate = clinicalData.HEART_RATE;
    // if !heartRate or !heartRate.uom or heartRate.uom !== 'beats/min' or !Array.isArray(heartRate.data) or heartRate.data.length === 0
    if (!heartRate || !heartRate.uom || heartRate.uom !== 'beats/min') {
      console.log('Invalid HEART_RATE data:', heartRate.uom);
      throw new Error('Invalid HEART_RATE data: Incorrect or missing unit of measurement');
    }

    if (!Array.isArray(heartRate.data)) {
      throw new Error('Invalid HEART_RATE data: Data should be an array');
    }

    if (heartRate.data.length === 0) {
      throw new Error('Invalid HEART_RATE data: Data array is empty');
    }

    heartRate.data.forEach((reading, index) => {
      if (!reading.on_date || isNaN(new Date(reading.on_date).getTime())) {
        throw new Error(`Invalid HEART_RATE data at index ${index}: Invalid or missing on_date`);
      }

      if (!reading.measurement || isNaN(parseInt(reading.measurement, 10))) {
        throw new Error(`Invalid HEART_RATE data at index ${index}: Invalid or missing measurement`);
      }
    });

    const aggregatedData = this.processHeartRateData(heartRate.data);
    // here we can save the data 
    await this.saveAggregatedData(aggregatedData, userId);

    return aggregatedData;
  }

  static processHeartRateData(data) {
    const aggregatedData = [];

    // Sort data by on_date
    data.sort((a, b) => new Date(a.on_date) - new Date(b.on_date));

    let currentIntervalStart = null;
    let currentIntervalEnd = null;
    let currentMin = Infinity;
    let currentMax = -Infinity;

    data.forEach((reading) => {
      const readingDate = new Date(reading.on_date);
      const readingValue = parseInt(reading.measurement, 10);

      if (!currentIntervalStart) {
        currentIntervalStart = new Date(readingDate);
        currentIntervalEnd = new Date(currentIntervalStart);
        currentIntervalEnd.setMinutes(currentIntervalEnd.getMinutes() + 15);
      }

      if (readingDate < currentIntervalEnd) {
        currentMin = Math.min(currentMin, readingValue);
        currentMax = Math.max(currentMax, readingValue);
      } else {
        aggregatedData.push({
          from_date: currentIntervalStart.toISOString(),
          to_date: currentIntervalEnd.toISOString(),
          measurement: {
            low: currentMin.toString(),
            high: currentMax.toString(),
          },
        });

        currentIntervalStart = new Date(readingDate);
        currentIntervalEnd = new Date(currentIntervalStart);
        currentIntervalEnd.setMinutes(currentIntervalEnd.getMinutes() + 15);

        currentMin = readingValue;
        currentMax = readingValue;
      }
    });

    // Add the last interval
    if (currentIntervalStart) {
      aggregatedData.push({
        from_date: currentIntervalStart.toISOString(),
        to_date: currentIntervalEnd.toISOString(),
        measurement: {
          low: currentMin.toString(),
          high: currentMax.toString(),
        },
      });
    }

    return aggregatedData;
  }

  static async saveAggregatedData(aggregatedData, userId) {
    try {
      console.log('Saving aggregated data:', userId);
          await ProfileAggregatedHealthData.create({
            profileId: userId,
            data: aggregatedData
          });
        
    } catch (error) {
      console.error('Error saving aggregated data:', error);
      throw new Error('Failed to save aggregated data');
    }
  }
}

module.exports = ProfileService;
