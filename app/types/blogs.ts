export interface Blog {
  sys: Sys;
  title: string;
  slug: string;
  description: string;
  tag: string[];
  openGraphImage: OpenGraphImage;
}

interface OpenGraphImage {
  title: string;
  url: string;
}

interface Sys {
  firstPublishedAt: string;
}
