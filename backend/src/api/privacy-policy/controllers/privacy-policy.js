'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::privacy-policy.privacy-policy', ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.entityService.findMany(
      'api::privacy-policy.privacy-policy',
      { populate: { sections: true } }
    );

    if (entity?.sections) {
      entity.sections.sort((a, b) => a.order - b.order);
    }

    return entity;
  }
}));
