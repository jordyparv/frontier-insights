module.exports = async ({ strapi }) => {

  await strapi.entityService.create('api::privacy-policy.privacy-policy', {
    data: {
      title: "Privacy Policy",
      version: "1.0",
      last_updated: "2026-03-01",
      introduction: "<p>This Privacy Policy explains how we collect and protect data.</p>",
      sections: [
        {
          title: "Information We Collect",
          content: "<p>We collect name and email data.</p>",
          order: 1
        },
        {
          title: "Use of Data",
          content: "<p>We use your data to improve services.</p>",
          order: 2
        }
      ],
      publishedAt: new Date()
    }
  });

  console.log("Privacy policy seeded.");
};
