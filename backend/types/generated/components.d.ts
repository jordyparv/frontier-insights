import type { Schema, Struct } from '@strapi/strapi';

export interface LegalLegalSection extends Struct.ComponentSchema {
  collectionName: 'components_legal_sections_2';
  info: {
    displayName: 'Legal Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LegalSection extends Struct.ComponentSchema {
  collectionName: 'components_legal_sections';
  info: {
    displayName: 'Legal Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsEditorialHighlight extends Struct.ComponentSchema {
  collectionName: 'components_sections_editorial_highlight';
  info: {
    displayName: 'Editorial Highlight';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsEliteArchives extends Struct.ComponentSchema {
  collectionName: 'components_sections_elite_archives';
  info: {
    displayName: 'Elite Archives';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHallOfFame extends Struct.ComponentSchema {
  collectionName: 'components_sections_hall_of_fame';
  info: {
    displayName: 'Hall of Fame';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsInnovationTechnology extends Struct.ComponentSchema {
  collectionName: 'components_sections_innovation_technology';
  info: {
    displayName: 'Innovation & Technology';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsMagazineRelease extends Struct.ComponentSchema {
  collectionName: 'components_sections_magazine_release';
  info: {
    displayName: 'Magazine Release';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSectionContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_content';
  info: {
    displayName: 'Section Content';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    micro_label: Schema.Attribute.String;
    primary_button_link: Schema.Attribute.String;
    primary_button_text: Schema.Attribute.String;
    secondary_button_link: Schema.Attribute.String;
    secondary_button_text: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSectionMedia extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_media';
  info: {
    displayName: 'Section Media';
  };
  attributes: {
    alt_text: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    image_link: Schema.Attribute.String;
    image_quote: Schema.Attribute.Text;
    profession_title: Schema.Attribute.String;
  };
}

export interface SectionsShowcase extends Struct.ComponentSchema {
  collectionName: 'components_sections_showcase';
  info: {
    displayName: 'Showcase';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTrendingInsights extends Struct.ComponentSchema {
  collectionName: 'components_sections_trending_insights';
  info: {
    displayName: 'Trending Insights';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsVisionaryVoices extends Struct.ComponentSchema {
  collectionName: 'components_sections_visionary_voices';
  info: {
    displayName: 'Visionary Voices';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWomenVisionaries extends Struct.ComponentSchema {
  collectionName: 'components_sections_women_visionaries';
  info: {
    displayName: 'Women Visionaries';
    icon: 'apps';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedTimeline extends Struct.ComponentSchema {
  collectionName: 'components_shared_timelines';
  info: {
    displayName: 'Timeline';
  };
  attributes: {
    text: Schema.Attribute.Text;
    year: Schema.Attribute.String;
  };
}

export interface SharedValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_values';
  info: {
    displayName: 'Value';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'legal.legal-section': LegalLegalSection;
      'legal.section': LegalSection;
      'sections.editorial-highlight': SectionsEditorialHighlight;
      'sections.elite-archives': SectionsEliteArchives;
      'sections.hall-of-fame': SectionsHallOfFame;
      'sections.innovation-technology': SectionsInnovationTechnology;
      'sections.magazine-release': SectionsMagazineRelease;
      'sections.section-content': SectionsSectionContent;
      'sections.section-media': SectionsSectionMedia;
      'sections.showcase': SectionsShowcase;
      'sections.trending-insights': SectionsTrendingInsights;
      'sections.visionary-voices': SectionsVisionaryVoices;
      'sections.women-visionaries': SectionsWomenVisionaries;
      'shared.timeline': SharedTimeline;
      'shared.value': SharedValue;
    }
  }
}
