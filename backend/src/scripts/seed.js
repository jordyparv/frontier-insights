// 'use strict';

// module.exports = async ({ strapi }) => {
//   console.log('🌱 Starting database seed...');

//   // // Prevent duplicate seeding
//   // const existingPosts = await strapi.entityService.findMany('api::post.post', { limit: 1 });
//   // if (existingPosts.length > 0) {
//   //   console.log('⚠️ Data already exists. Skipping seed.');
//   //   // return;
//   // }

//   // /* ================================
//   //    CATEGORIES
//   // ================================= */
//   // const categoryTech = await strapi.entityService.create('api::category.category', {
//   //   data: {
//   //     name: 'Technology',
//   //     slug: 'technology',
//   //     description: 'Innovation and future insights'
//   //   }
//   // });

//   // const categoryLeadership = await strapi.entityService.create('api::category.category', {
//   //   data: {
//   //     name: 'Leadership',
//   //     slug: 'leadership'
//   //   }
//   // });

//   // /* ================================
//   //    TAGS
//   // ================================= */
//   // const tagAI = await strapi.entityService.create('api::tag.tag', {
//   //   data: { name: 'AI', slug: 'ai' }
//   // });

//   // const tagInnovation = await strapi.entityService.create('api::tag.tag', {
//   //   data: { name: 'Innovation', slug: 'innovation' }
//   // });

//   // /* ================================
//   //    AUTHOR
//   // ================================= */
//   // const author = await strapi.entityService.create('api::author.author', {
//   //   data: {
//   //     name: 'Dr. Shaista Meraj',
//   //     bio: 'AI & Healthcare Innovator shaping medical imaging globally.'
//   //   }
//   // });

//   // /* ================================
//   //    POSTS
//   // ================================= */
//   // const post1 = await strapi.entityService.create('api::post.post', {
//   //   data: {
//   //     title: 'The Future of AI in Healthcare',
//   //     slug: 'future-of-ai-in-healthcare',
//   //     excerpt: 'How artificial intelligence is redefining diagnostics.',
//   //     content: 'Artificial Intelligence is revolutionizing early detection systems...',
//   //     category: categoryTech.id,
//   //     author: author.id,
//   //     tags: [tagAI.id, tagInnovation.id],
//   //     seo_title: 'AI in Healthcare',
//   //     seo_description: 'Deep analysis of AI applications in healthcare.',
//   //     publishedAt: new Date()
//   //   }
//   // });

//   // const post2 = await strapi.entityService.create('api::post.post', {
//   //   data: {
//   //     title: 'Modern Leadership in a Digital Era',
//   //     slug: 'modern-leadership-digital-era',
//   //     excerpt: 'Leadership transformation in the age of automation.',
//   //     content: 'Leadership today requires technological awareness and empathy...',
//   //     category: categoryLeadership.id,
//   //     author: author.id,
//   //     tags: [tagInnovation.id],
//   //     publishedAt: new Date()
//   //   }
//   // });

//   // /* ================================
//   //    PODCAST
//   // ================================= */
//   // await strapi.entityService.create('api::podcast.podcast', {
//   //   data: {
//   //     title: 'Voices of Impact Episode 01',
//   //     slug: 'voices-of-impact-01',
//   //     excerpt: 'Discussing AI transformation in healthcare.',
//   //     duration: '42:15',
//   //     transcript: 'In this episode we explore how AI is transforming diagnostics...',
//   //     publishedAt: new Date()
//   //   }
//   // });

//   // /* ================================
//   //    PARTNERS
//   // ================================= */
//   // await strapi.entityService.create('api::partner.partner', {
//   //   data: {
//   //     name: 'Global Tech Forum',
//   //     website: 'https://example.com'
//   //   }
//   // });

//   // /* ================================
//   //    HOME PAGE
//   // ================================= */
//   // await strapi.entityService.create('api::home-page.home-page', {
//   //   data: {
//   //     micro_label: 'Welcome to Frontline Insights',
//   //     hero_title: 'Frontline Insights',
//   //     hero_subtitle: 'Shaping the Future of Leadership & Innovation',
//   //     description: 'A luxury editorial platform exploring technology, impact and transformation.',
//   //     primary_button_text: 'Explore Insights',
//   //     secondary_button_text: 'View Magazines',
//   //     primary_button_link: '/posts',
//   //     secondary_button_link: '/magazines',
//   //     publishedAt: new Date()
//   //   }
//   // });

//      const existing = await strapi.entityService.findMany(
//     'api::site-setting.site-setting',
//     { limit: 1 }
//   );

//   // if (existing.length > 0) {
//   //   console.log('⚠ Data already exists. Skipping seed.');
//   //   return;
//   // }

//   /* ================= NAV ITEMS ================= */

//   const navItems = await Promise.all([
//     strapi.entityService.create('api::nav-item.nav-item', {
//       data: { name: 'Home', href: '/#', order: 1, active: true }
//     }),
//     strapi.entityService.create('api::nav-item.nav-item', {
//       data: { name: 'About', href: '/about', order: 2, active: true }
//     }),
//     strapi.entityService.create('api::nav-item.nav-item', {
//       data: { name: 'Women Visionaries', href: '/women-visionaries', order: 3, active: true }
//     }),
//     strapi.entityService.create('api::nav-item.nav-item', {
//       data: { name: 'Magazines', href: '/magazines', order: 4, active: true }
//     }),
//     strapi.entityService.create('api::nav-item.nav-item', {
//       data: { name: 'Podcasts', href: '/podcasts', order: 5, active: true }
//     })
//   ]);

//   /* ================= FOOTER LINKS ================= */

//   const footerLinks = await Promise.all([
//     strapi.entityService.create('api::footer-quick-link.footer-quick-link', {
//       data: { name: 'Privacy Policy', href: '/privacy', order: 1 }
//     }),
//     strapi.entityService.create('api::footer-quick-link.footer-quick-link', {
//       data: { name: 'Terms of Service', href: '/terms', order: 2 }
//     })
//   ]);

//   /* ================= SOCIAL LINKS ================= */

//   const socialLinks = await Promise.all([
//     strapi.entityService.create('api::social-link.social-link', {
//       data: { platform: 'instagram', url: 'https://instagram.com', order: 1 }
//     }),
//     strapi.entityService.create('api::social-link.social-link', {
//       data: { platform: 'linkedin', url: 'https://linkedin.com', order: 2 }
//     })
//   ]);

//   /* ================= SITE SETTING ================= */

//   await strapi.entityService.create('api::site-setting.site-setting', {
//     data: {
//       site_name: 'Frontline Insights',
//       // navbar_items: navItems.map(n => n.id),
//       footer_quick_links: footerLinks.map(f => f.id),
//       social_links: socialLinks.map(s => s.id),
//       show_contact_button: true
//     }
//   });
//   console.log('✅ Database seeded successfully!');
// };