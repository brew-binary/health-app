const ProfileService = require('../services/profile.service');

class ProfileController {
  static async processHealthData
  (req, res) {
    try {
      const clinicalData = req.body; // Assuming the data comes in the request body

      // Validate the incoming request body
      if (!clinicalData || typeof clinicalData !== 'object') {
        return res.status(400).json({ error: 'Invalid request data' });
      }

      // Call the service to process and save the data
      const aggregatedData = await ProfileService.aggregateHeartRateData(clinicalData, req.profile.id);

      // Respond with the aggregated data
      return res.status(200).json(aggregatedData);
    } catch (error) {
      console.error('Error handling heart rate data:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
}

module.exports = ProfileController;
