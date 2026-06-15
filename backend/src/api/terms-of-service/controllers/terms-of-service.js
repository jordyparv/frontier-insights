'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::terms-of-service.terms-of-service', ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.entityService.findMany(
      'api::terms-of-service.terms-of-service',
      { populate: { sections: true } }
    );
    return entity;
  }
}));
