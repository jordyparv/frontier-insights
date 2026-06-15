"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::podcast.podcast", ({ strapi }) => ({
  async find(ctx) {
  const { page = 1, pageSize = 10, search } = ctx.query;

  const filters = {};

  if (search) {
    filters.title = { $containsi: search };
  }

  const { results, pagination } = await strapi
    .service("api::podcast.podcast")
    .find({
      filters,
      populate: {
        audio_file: true,
        cover_image: true,
      },
      sort: { publishedAt: "desc" },
      pagination: {
        page: Number(page),
        pageSize: Number(pageSize),
      },
    });
  return {
    data: results,
    meta: { pagination },
  };
},

  async findOne(ctx) {
    const { id } = ctx.params;
    const podcast = await strapi.db.query("api::podcast.podcast").findOne({
      where: { slug: id },
      populate: {
        audio_file: true,
        cover_image: true,
      },
    });

    if (!podcast) {
      return ctx.notFound("Podcast not found");
    }

    return podcast;
  },
}));
