'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/layout',
      handler: 'layout.find',
      config: {
        auth: false
      }
    }
  ]
};
