'use strict';

module.exports = {
  /**
   * @param {{ body: { siteSetting: any; navItems: any; quickLinks: any; socialLinks: any; }; }} ctx
   */
  async find(ctx) {

    const siteSetting = await strapi.entityService.findMany(
      'api::site-setting.site-setting',
      {
        populate: {
          site_logo: {
            fields: ['url']
          }
        }
      }
    );

    const quickLinks = await strapi.entityService.findMany(
      'api::footer-quick-link.footer-quick-link',
      {
        filters: { active: true },
        sort: { order: 'asc' }
      }
    );

    const navItems = await strapi.entityService.findMany(
      'api::nav-item.nav-item',
      {
        filters: { active: true },
        sort: { order: 'asc' }
      }
    );

    const socialLinks = await strapi.entityService.findMany(
      'api::social-link.social-link',
      {
        filters: { active: true },
        sort: { order: 'asc' }
      }
    );

    ctx.body = {
      siteSetting,
      navItems,
      quickLinks,
      socialLinks
    };
  }
};