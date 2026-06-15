module.exports = async ({ strapi }) => {

  await strapi.entityService.create('api::privacy-policy.privacy-policy', {
    data: {
      title: "Privacy Policy",
      version: "1.0",
      last_updated: "2026-03-01",
      introduction: "<p>This Privacy Policy explains how we collect and use data.</p>",
      sections: [
        {
          title: "Information We Collect",
          content: "<p>We collect name, email, and usage data.</p>",
          order: 1
        },
        {
          title: "How We Use Data",
          content: "<p>We use data to improve our services.</p>",
          order: 2
        }
      ],
      publishedAt: new Date()
    }
  });

  await strapi.entityService.create('api::terms-of-service.terms-of-service', {
    data: {
      title: "Terms of Service",
      version: "1.0",
      last_updated: "2026-03-01",
      introduction: "<p>By using this website you agree to the following terms.</p>",
      sections: [
        {
          title: "Acceptance",
          content: "<p>You accept these terms by accessing the website.</p>",
          order: 1
        },
        {
          title: "Liability",
          content: "<p>We are not liable for indirect damages.</p>",
          order: 2
        }
      ],
      publishedAt: new Date()
    }
  });

  console.log("Legal data seeded.");
};
