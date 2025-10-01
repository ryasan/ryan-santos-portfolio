export interface Blog {
  __typename: 'Blog';
  sys?: {
    id?: string;
    publishedAt?: string;
  };
  title?: string;
  slug?: string;
  description?: string;
  canonicalUrl?: string;
  blogBody?: {
    json?: any;
  };
  openGraphImage?: {
    title?: string;
    description?: string;
    url?: string;
  };
}
