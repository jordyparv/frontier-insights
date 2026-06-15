'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::home-section.home-section',
  ({ strapi }) => ({

    async find(ctx) {
      const sections = await strapi
        .service('api::home-section.home-section')
        .getActiveSections();

      ctx.body = {
        data: sections
      };
    }

  })
);
