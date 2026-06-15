"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::about.about", ({ strapi }) => ({
  async find(ctx) {
    const data = await strapi.entityService.findMany("api::about.about", {
      populate: {
        story_image: true,
        philosophy: true,
        timeline: true
      }
    });

    return data;
  }
}));
