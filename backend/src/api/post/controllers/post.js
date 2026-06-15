"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async find(ctx) {
    const {
      page = 1,
      pageSize = 10,
      category,
      tag,
      search,
      author,
    } = ctx.query;

    const filters = {};

    if (category) {
      filters.category = { slug: category };
    }

    if (tag) {
      filters.tags = { slug: tag };
    }

    if (search) {
      filters.title = { $containsi: search };
    }
    if (author) {
      [(filters.author = { name: author })];
    }

    const posts = await strapi.entityService.findMany("api::post.post", {
      filters,
      populate: {
        cover_image: true,
        gallery: true,
        category: true,
        author: {
          populate: {
            avatar: true,
          },
        },
        tags: true,
      },
      sort: { publishedAt: "desc" },
      page,
      pageSize,
    });

    return posts;
  },

  async findOne(ctx) {
    const { slug } = ctx.params;

    const post = await strapi.db.query("api::post.post").findOne({
      where: { slug },
      populate: {
        cover_image: true,
        gallery: true,
        category: true,
        author: true,
        tags: true,
      },
    });

    if (!post) {
      return ctx.notFound("Post not found");
    }

    return post;
  },
}));
