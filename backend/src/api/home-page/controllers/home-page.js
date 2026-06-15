'use strict';

module.exports = {
  async find(ctx) {
    const entity = await strapi.entityService.findMany(
      'api::home-page.home-page',
      {
        populate: {
          partner_logos: {
            populate: '*'
          },
          sections: {
            populate: '*'
          }
        }
      }
    );

    if (!entity) {
      ctx.body = { data: null };
      return;
    }

    const filteredSections = entity.sections
      ?.filter(section => section.active !== false)
      ?.sort((a, b) => (a.order || 0) - (b.order || 0));

    ctx.body = {
      data: {
        ...entity,
        sections: filteredSections
      }
    };
  }
};
