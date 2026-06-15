"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::magazine.magazine", ({ strapi }) => ({

  async find(ctx) {

    const {
      page = 1,
      pageSize = 10,
      search,
      category,
      author
    } = ctx.query;

    const filters = {};
  
    // 🔎 Search
    if (search) {
      filters.$or = [
        { title: { $containsi: search } },
        { excerpt: { $containsi: search } }
      ];
    }

    // 📂 Filter by category slug
    if (category) {
      filters.category = {
        slug: category
      };
    }

    // 👤 Filter by author slug
    if (author) {
      filters.author = {
        slug: author
      };
    }

    const { results, pagination } = await strapi
      .service("api::magazine.magazine")
      .find({
        filters,
        populate: {
          cover_image: true,
          pdf_file: true,
          category: true,
          author: {
            populate: {
              avatar: true
            }
          }
        },
        sort: { createdAt: "desc" },
        pagination: {
          page: Number(page),
          pageSize: Number(pageSize)
        }
      });

    return {
      data: results,
      meta: { pagination }
    };
  },

  async findOne(ctx) {

    const { id } = ctx.params;

    const magazine = await strapi.db
      .query("api::magazine.magazine")
      .findOne({
        where: { slug: id },
        populate: {
          cover_image: true,
          pdf_file: true,
          category: true,
          author: {
            populate: {
              avatar: true
            }
          }
        }
      });

    if (!magazine) {
      return ctx.notFound("Magazine not found");
    }

    return { data: magazine };
  }

}));