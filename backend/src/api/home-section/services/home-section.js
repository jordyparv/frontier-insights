'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-section.home-section', ({ strapi }) => ({

  async getActiveSections() {
    return await strapi.entityService.findMany(
      'api::home-section.home-section',
      {
        filters: { active: true },
        sort: { order: 'asc' },
        publicationState: 'live',
        populate: {
          content: true,
          media_items: {
            populate: {
              image: true
            }
          }
        }
      }
    );
  }

}));
