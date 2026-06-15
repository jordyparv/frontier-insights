#!/bin/bash

echo "🚀 Setting up About Page in Strapi..."

BASE_PATH="./src"

# =========================
# CREATE DIRECTORIES
# =========================
mkdir -p $BASE_PATH/api/about/content-types/about
mkdir -p $BASE_PATH/api/about/controllers
mkdir -p $BASE_PATH/api/about/routes
mkdir -p $BASE_PATH/api/about/services

mkdir -p $BASE_PATH/components/shared

# =========================
# ABOUT SCHEMA
# =========================
cat <<EOF > $BASE_PATH/api/about/content-types/about/schema.json
{
  "kind": "singleType",
  "collectionName": "about",
  "info": {
    "singularName": "about",
    "pluralName": "about",
    "displayName": "About Page"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "hero_title": { "type": "string" },
    "hero_subtitle": { "type": "text" },
    "hero_label": { "type": "string" },

    "story_title": { "type": "string" },
    "story_text_1": { "type": "richtext" },
    "story_text_2": { "type": "richtext" },

    "story_image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },

    "philosophy": {
      "type": "component",
      "repeatable": true,
      "component": "shared.value"
    },

    "timeline": {
      "type": "component",
      "repeatable": true,
      "component": "shared.timeline"
    },

    "cta_text": { "type": "string" },
    "cta_button": { "type": "string" }
  }
}
EOF

echo "✅ About schema created"

# =========================
# VALUE COMPONENT
# =========================
cat <<EOF > $BASE_PATH/components/shared/value.json
{
  "collectionName": "components_shared_values",
  "info": {
    "displayName": "Value"
  },
  "attributes": {
    "title": { "type": "string" },
    "text": { "type": "text" }
  }
}
EOF

echo "✅ Value component created"

# =========================
# TIMELINE COMPONENT
# =========================
cat <<EOF > $BASE_PATH/components/shared/timeline.json
{
  "collectionName": "components_shared_timelines",
  "info": {
    "displayName": "Timeline"
  },
  "attributes": {
    "year": { "type": "string" },
    "text": { "type": "text" }
  }
}
EOF

echo "✅ Timeline component created"

# =========================
# CONTROLLER
# =========================
cat <<EOF > $BASE_PATH/api/about/controllers/about.js
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
EOF

echo "✅ Controller created"

# =========================
# SERVICE
# =========================
cat <<EOF > $BASE_PATH/api/about/services/about.js
"use strict";

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::about.about");
EOF

echo "✅ Service created"

# =========================
# ROUTES
# =========================
cat <<EOF > $BASE_PATH/api/about/routes/about.js
"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::about.about");
EOF

echo "✅ Routes created"

# =========================
# DONE
# =========================
echo "🎉 About Page setup complete!"
echo "👉 Restart Strapi server"
echo "👉 Go to Admin Panel → Create About Content"