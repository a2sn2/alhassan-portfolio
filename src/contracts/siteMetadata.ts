export interface SiteMetadata {
  siteUrl: string;
  productionDomain: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  author: {
    name: string;
    url: string;
    role: string;
  };
  locale: string;
  themeColor: string;
}
