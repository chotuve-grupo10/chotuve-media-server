'use strict';
const MongoDB = require('../../MongoDB').MongoDB;

describe('MongoDB handler functions', function() {
  describe('MongoDB connection', function() {
    it('should connect to DB successfully',
      async function() {

        const db_service = new MongoDB();
        await db_service.start();
        await db_service.stop();
      });
  });
});
