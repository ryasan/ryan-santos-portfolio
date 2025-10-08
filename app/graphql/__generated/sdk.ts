import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/articleGridSection) */
export type ArticleGridSection = Entry & _Node & {
  __typename?: 'ArticleGridSection';
  _id: Scalars['ID']['output'];
  articlesCollection?: Maybe<ArticleGridSectionArticlesCollection>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ArticleGridSectionLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/articleGridSection) */
export type ArticleGridSectionArticlesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ArticleGridSectionArticlesFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/articleGridSection) */
export type ArticleGridSectionInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/articleGridSection) */
export type ArticleGridSectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/articleGridSection) */
export type ArticleGridSectionTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type ArticleGridSectionArticlesCollection = {
  __typename?: 'ArticleGridSectionArticlesCollection';
  items: Array<Maybe<ArticleGridSectionArticlesItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ArticleGridSectionArticlesFilter = {
  AND?: InputMaybe<Array<InputMaybe<ArticleGridSectionArticlesFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ArticleGridSectionArticlesFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleGridSectionArticlesItem = Blog | Projects;

export type ArticleGridSectionCollection = {
  __typename?: 'ArticleGridSectionCollection';
  items: Array<Maybe<ArticleGridSection>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ArticleGridSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<ArticleGridSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ArticleGridSectionFilter>>>;
  articles?: InputMaybe<CfarticlesMultiTypeNestedFilter>;
  articlesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleGridSectionLinkingCollections = {
  __typename?: 'ArticleGridSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type ArticleGridSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type ArticleGridSectionLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ArticleGridSectionLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum ArticleGridSectionLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ArticleGridSectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  blogCollection?: Maybe<BlogCollection>;
  entryCollection?: Maybe<EntryCollection>;
  globalHeaderCollection?: Maybe<GlobalHeaderCollection>;
  heroSectionCollection?: Maybe<HeroSectionCollection>;
  projectsCollection?: Maybe<ProjectsCollection>;
  seoMetaDataCollection?: Maybe<SeoMetaDataCollection>;
};


export type AssetLinkingCollectionsBlogCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsGlobalHeaderCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsHeroSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsProjectsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsSeoMetaDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type Blog = Entry & _Node & {
  __typename?: 'Blog';
  _id: Scalars['ID']['output'];
  blogBody?: Maybe<BlogBlogBody>;
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<BlogLinkingCollections>;
  openGraphImage?: Maybe<Asset>;
  publishDate?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogBlogBodyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogCanonicalUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogOpenGraphImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogPublishDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/blog) */
export type BlogTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type BlogBlogBody = {
  __typename?: 'BlogBlogBody';
  json: Scalars['JSON']['output'];
  links: BlogBlogBodyLinks;
};

export type BlogBlogBodyAssets = {
  __typename?: 'BlogBlogBodyAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type BlogBlogBodyEntries = {
  __typename?: 'BlogBlogBodyEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type BlogBlogBodyLinks = {
  __typename?: 'BlogBlogBodyLinks';
  assets: BlogBlogBodyAssets;
  entries: BlogBlogBodyEntries;
  resources: BlogBlogBodyResources;
};

export type BlogBlogBodyResources = {
  __typename?: 'BlogBlogBodyResources';
  block: Array<BlogBlogBodyResourcesBlock>;
  hyperlink: Array<BlogBlogBodyResourcesHyperlink>;
  inline: Array<BlogBlogBodyResourcesInline>;
};

export type BlogBlogBodyResourcesBlock = ResourceLink & {
  __typename?: 'BlogBlogBodyResourcesBlock';
  sys: ResourceSys;
};

export type BlogBlogBodyResourcesHyperlink = ResourceLink & {
  __typename?: 'BlogBlogBodyResourcesHyperlink';
  sys: ResourceSys;
};

export type BlogBlogBodyResourcesInline = ResourceLink & {
  __typename?: 'BlogBlogBodyResourcesInline';
  sys: ResourceSys;
};

export type BlogCollection = {
  __typename?: 'BlogCollection';
  items: Array<Maybe<Blog>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BlogFilter = {
  AND?: InputMaybe<Array<InputMaybe<BlogFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BlogFilter>>>;
  blogBody_contains?: InputMaybe<Scalars['String']['input']>;
  blogBody_exists?: InputMaybe<Scalars['Boolean']['input']>;
  blogBody_not_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  openGraphImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BlogLinkingCollections = {
  __typename?: 'BlogLinkingCollections';
  articleGridSectionCollection?: Maybe<ArticleGridSectionCollection>;
  carouselSectionCollection?: Maybe<CarouselSectionCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type BlogLinkingCollectionsArticleGridSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogLinkingCollectionsArticleGridSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type BlogLinkingCollectionsCarouselSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogLinkingCollectionsCarouselSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type BlogLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum BlogLinkingCollectionsArticleGridSectionCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum BlogLinkingCollectionsCarouselSectionCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlidesPerViewAsc = 'slidesPerView_ASC',
  SlidesPerViewDesc = 'slidesPerView_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum BlogOrder {
  CanonicalUrlAsc = 'canonicalUrl_ASC',
  CanonicalUrlDesc = 'canonicalUrl_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  PublishDateAsc = 'publishDate_ASC',
  PublishDateDesc = 'publishDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/carouselSection) */
export type CarouselSection = Entry & _Node & {
  __typename?: 'CarouselSection';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<CarouselSectionLinkingCollections>;
  slidesCollection?: Maybe<CarouselSectionSlidesCollection>;
  slidesPerView?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/carouselSection) */
export type CarouselSectionInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/carouselSection) */
export type CarouselSectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/carouselSection) */
export type CarouselSectionSlidesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CarouselSectionSlidesFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/carouselSection) */
export type CarouselSectionSlidesPerViewArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/carouselSection) */
export type CarouselSectionTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type CarouselSectionCollection = {
  __typename?: 'CarouselSectionCollection';
  items: Array<Maybe<CarouselSection>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CarouselSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<CarouselSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CarouselSectionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slides?: InputMaybe<CfslidesMultiTypeNestedFilter>;
  slidesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slidesPerView?: InputMaybe<Scalars['Int']['input']>;
  slidesPerView_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slidesPerView_gt?: InputMaybe<Scalars['Int']['input']>;
  slidesPerView_gte?: InputMaybe<Scalars['Int']['input']>;
  slidesPerView_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  slidesPerView_lt?: InputMaybe<Scalars['Int']['input']>;
  slidesPerView_lte?: InputMaybe<Scalars['Int']['input']>;
  slidesPerView_not?: InputMaybe<Scalars['Int']['input']>;
  slidesPerView_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CarouselSectionLinkingCollections = {
  __typename?: 'CarouselSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type CarouselSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type CarouselSectionLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CarouselSectionLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum CarouselSectionLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum CarouselSectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlidesPerViewAsc = 'slidesPerView_ASC',
  SlidesPerViewDesc = 'slidesPerView_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type CarouselSectionSlidesCollection = {
  __typename?: 'CarouselSectionSlidesCollection';
  items: Array<Maybe<CarouselSectionSlidesItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CarouselSectionSlidesFilter = {
  AND?: InputMaybe<Array<InputMaybe<CarouselSectionSlidesFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CarouselSectionSlidesFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CarouselSectionSlidesItem = Blog | Projects;

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItem = Entry & _Node & {
  __typename?: 'ExperienceItem';
  _id: Scalars['ID']['output'];
  company?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<ExperienceItemDescription>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  isCurrent?: Maybe<Scalars['Boolean']['output']>;
  linkedFrom?: Maybe<ExperienceItemLinkingCollections>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  sys: Sys;
  title?: Maybe<ExperienceItemTitle>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemCompanyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemEndDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemIsCurrentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemStartDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceItem) */
export type ExperienceItemTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type ExperienceItemCollection = {
  __typename?: 'ExperienceItemCollection';
  items: Array<Maybe<ExperienceItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ExperienceItemDescription = {
  __typename?: 'ExperienceItemDescription';
  json: Scalars['JSON']['output'];
  links: ExperienceItemDescriptionLinks;
};

export type ExperienceItemDescriptionAssets = {
  __typename?: 'ExperienceItemDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ExperienceItemDescriptionEntries = {
  __typename?: 'ExperienceItemDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ExperienceItemDescriptionLinks = {
  __typename?: 'ExperienceItemDescriptionLinks';
  assets: ExperienceItemDescriptionAssets;
  entries: ExperienceItemDescriptionEntries;
  resources: ExperienceItemDescriptionResources;
};

export type ExperienceItemDescriptionResources = {
  __typename?: 'ExperienceItemDescriptionResources';
  block: Array<ExperienceItemDescriptionResourcesBlock>;
  hyperlink: Array<ExperienceItemDescriptionResourcesHyperlink>;
  inline: Array<ExperienceItemDescriptionResourcesInline>;
};

export type ExperienceItemDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'ExperienceItemDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type ExperienceItemDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'ExperienceItemDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type ExperienceItemDescriptionResourcesInline = ResourceLink & {
  __typename?: 'ExperienceItemDescriptionResourcesInline';
  sys: ResourceSys;
};

export type ExperienceItemFilter = {
  AND?: InputMaybe<Array<InputMaybe<ExperienceItemFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ExperienceItemFilter>>>;
  company?: InputMaybe<Scalars['String']['input']>;
  company_contains?: InputMaybe<Scalars['String']['input']>;
  company_exists?: InputMaybe<Scalars['Boolean']['input']>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  company_not?: InputMaybe<Scalars['String']['input']>;
  company_not_contains?: InputMaybe<Scalars['String']['input']>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  endDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  isCurrent_exists?: InputMaybe<Scalars['Boolean']['input']>;
  isCurrent_not?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
};

export type ExperienceItemLinkingCollections = {
  __typename?: 'ExperienceItemLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  experienceSectionCollection?: Maybe<ExperienceSectionCollection>;
};


export type ExperienceItemLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type ExperienceItemLinkingCollectionsExperienceSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ExperienceItemLinkingCollectionsExperienceSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum ExperienceItemLinkingCollectionsExperienceSectionCollectionOrder {
  InsertDividersAsc = 'insertDividers_ASC',
  InsertDividersDesc = 'insertDividers_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ExperienceItemOrder {
  CompanyAsc = 'company_ASC',
  CompanyDesc = 'company_DESC',
  EndDateAsc = 'endDate_ASC',
  EndDateDesc = 'endDate_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  IsCurrentAsc = 'isCurrent_ASC',
  IsCurrentDesc = 'isCurrent_DESC',
  StartDateAsc = 'startDate_ASC',
  StartDateDesc = 'startDate_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ExperienceItemTitle = {
  __typename?: 'ExperienceItemTitle';
  json: Scalars['JSON']['output'];
  links: ExperienceItemTitleLinks;
};

export type ExperienceItemTitleAssets = {
  __typename?: 'ExperienceItemTitleAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ExperienceItemTitleEntries = {
  __typename?: 'ExperienceItemTitleEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ExperienceItemTitleLinks = {
  __typename?: 'ExperienceItemTitleLinks';
  assets: ExperienceItemTitleAssets;
  entries: ExperienceItemTitleEntries;
  resources: ExperienceItemTitleResources;
};

export type ExperienceItemTitleResources = {
  __typename?: 'ExperienceItemTitleResources';
  block: Array<ExperienceItemTitleResourcesBlock>;
  hyperlink: Array<ExperienceItemTitleResourcesHyperlink>;
  inline: Array<ExperienceItemTitleResourcesInline>;
};

export type ExperienceItemTitleResourcesBlock = ResourceLink & {
  __typename?: 'ExperienceItemTitleResourcesBlock';
  sys: ResourceSys;
};

export type ExperienceItemTitleResourcesHyperlink = ResourceLink & {
  __typename?: 'ExperienceItemTitleResourcesHyperlink';
  sys: ResourceSys;
};

export type ExperienceItemTitleResourcesInline = ResourceLink & {
  __typename?: 'ExperienceItemTitleResourcesInline';
  sys: ResourceSys;
};

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceSection) */
export type ExperienceSection = Entry & _Node & {
  __typename?: 'ExperienceSection';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  experienceCollection?: Maybe<ExperienceSectionExperienceCollection>;
  insertDividers?: Maybe<Scalars['Boolean']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ExperienceSectionLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceSection) */
export type ExperienceSectionExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ExperienceSectionExperienceCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExperienceItemFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceSection) */
export type ExperienceSectionInsertDividersArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceSection) */
export type ExperienceSectionInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceSection) */
export type ExperienceSectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/experienceSection) */
export type ExperienceSectionTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type ExperienceSectionCollection = {
  __typename?: 'ExperienceSectionCollection';
  items: Array<Maybe<ExperienceSection>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ExperienceSectionExperienceCollection = {
  __typename?: 'ExperienceSectionExperienceCollection';
  items: Array<Maybe<ExperienceItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ExperienceSectionExperienceCollectionOrder {
  CompanyAsc = 'company_ASC',
  CompanyDesc = 'company_DESC',
  EndDateAsc = 'endDate_ASC',
  EndDateDesc = 'endDate_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  IsCurrentAsc = 'isCurrent_ASC',
  IsCurrentDesc = 'isCurrent_DESC',
  StartDateAsc = 'startDate_ASC',
  StartDateDesc = 'startDate_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ExperienceSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<ExperienceSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ExperienceSectionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  experience?: InputMaybe<CfExperienceItemNestedFilter>;
  experienceCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  insertDividers?: InputMaybe<Scalars['Boolean']['input']>;
  insertDividers_exists?: InputMaybe<Scalars['Boolean']['input']>;
  insertDividers_not?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ExperienceSectionLinkingCollections = {
  __typename?: 'ExperienceSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type ExperienceSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type ExperienceSectionLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ExperienceSectionLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum ExperienceSectionLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ExperienceSectionOrder {
  InsertDividersAsc = 'insertDividers_ASC',
  InsertDividersDesc = 'insertDividers_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalFooter) */
export type GlobalFooter = Entry & _Node & {
  __typename?: 'GlobalFooter';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  copyRightText?: Maybe<Scalars['String']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<GlobalFooterLinkingCollections>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalFooter) */
export type GlobalFooterCopyRightTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalFooter) */
export type GlobalFooterInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalFooter) */
export type GlobalFooterLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GlobalFooterCollection = {
  __typename?: 'GlobalFooterCollection';
  items: Array<Maybe<GlobalFooter>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GlobalFooterFilter = {
  AND?: InputMaybe<Array<InputMaybe<GlobalFooterFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<GlobalFooterFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  copyRightText?: InputMaybe<Scalars['String']['input']>;
  copyRightText_contains?: InputMaybe<Scalars['String']['input']>;
  copyRightText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  copyRightText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  copyRightText_not?: InputMaybe<Scalars['String']['input']>;
  copyRightText_not_contains?: InputMaybe<Scalars['String']['input']>;
  copyRightText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type GlobalFooterLinkingCollections = {
  __typename?: 'GlobalFooterLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type GlobalFooterLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum GlobalFooterOrder {
  CopyRightTextAsc = 'copyRightText_ASC',
  CopyRightTextDesc = 'copyRightText_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalHeader) */
export type GlobalHeader = Entry & _Node & {
  __typename?: 'GlobalHeader';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<GlobalHeaderLinkingCollections>;
  logoImageDarkMode?: Maybe<Asset>;
  logoImageLightMode?: Maybe<Asset>;
  logoLink?: Maybe<Link>;
  menuItemsCollection?: Maybe<GlobalHeaderMenuItemsCollection>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalHeader) */
export type GlobalHeaderInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalHeader) */
export type GlobalHeaderLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalHeader) */
export type GlobalHeaderLogoImageDarkModeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalHeader) */
export type GlobalHeaderLogoImageLightModeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalHeader) */
export type GlobalHeaderLogoLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/globalHeader) */
export type GlobalHeaderMenuItemsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<GlobalHeaderMenuItemsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LinkFilter>;
};

export type GlobalHeaderCollection = {
  __typename?: 'GlobalHeaderCollection';
  items: Array<Maybe<GlobalHeader>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GlobalHeaderFilter = {
  AND?: InputMaybe<Array<InputMaybe<GlobalHeaderFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<GlobalHeaderFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logoImageDarkMode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  logoImageLightMode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  logoLink?: InputMaybe<CfLinkNestedFilter>;
  logoLink_exists?: InputMaybe<Scalars['Boolean']['input']>;
  menuItems?: InputMaybe<CfLinkNestedFilter>;
  menuItemsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type GlobalHeaderLinkingCollections = {
  __typename?: 'GlobalHeaderLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type GlobalHeaderLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type GlobalHeaderMenuItemsCollection = {
  __typename?: 'GlobalHeaderMenuItemsCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum GlobalHeaderMenuItemsCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export enum GlobalHeaderOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSection = Entry & _Node & {
  __typename?: 'HeroSection';
  _id: Scalars['ID']['output'];
  avatar?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<HeroSectionDescription>;
  internalName?: Maybe<Scalars['String']['output']>;
  isTopOfPage?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Link>;
  linkedFrom?: Maybe<HeroSectionLinkingCollections>;
  subtitle?: Maybe<HeroSectionSubtitle>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionAvatarArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionIsTopOfPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionSubtitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/heroSection) */
export type HeroSectionTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type HeroSectionCollection = {
  __typename?: 'HeroSectionCollection';
  items: Array<Maybe<HeroSection>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HeroSectionDescription = {
  __typename?: 'HeroSectionDescription';
  json: Scalars['JSON']['output'];
  links: HeroSectionDescriptionLinks;
};

export type HeroSectionDescriptionAssets = {
  __typename?: 'HeroSectionDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HeroSectionDescriptionEntries = {
  __typename?: 'HeroSectionDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HeroSectionDescriptionLinks = {
  __typename?: 'HeroSectionDescriptionLinks';
  assets: HeroSectionDescriptionAssets;
  entries: HeroSectionDescriptionEntries;
  resources: HeroSectionDescriptionResources;
};

export type HeroSectionDescriptionResources = {
  __typename?: 'HeroSectionDescriptionResources';
  block: Array<HeroSectionDescriptionResourcesBlock>;
  hyperlink: Array<HeroSectionDescriptionResourcesHyperlink>;
  inline: Array<HeroSectionDescriptionResourcesInline>;
};

export type HeroSectionDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'HeroSectionDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type HeroSectionDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'HeroSectionDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type HeroSectionDescriptionResourcesInline = ResourceLink & {
  __typename?: 'HeroSectionDescriptionResourcesInline';
  sys: ResourceSys;
};

export type HeroSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<HeroSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HeroSectionFilter>>>;
  avatar_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isTopOfPage?: InputMaybe<Scalars['Boolean']['input']>;
  isTopOfPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  isTopOfPage_not?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<CfLinkNestedFilter>;
  link_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HeroSectionLinkingCollections = {
  __typename?: 'HeroSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type HeroSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type HeroSectionLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<HeroSectionLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum HeroSectionLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum HeroSectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  IsTopOfPageAsc = 'isTopOfPage_ASC',
  IsTopOfPageDesc = 'isTopOfPage_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type HeroSectionSubtitle = {
  __typename?: 'HeroSectionSubtitle';
  json: Scalars['JSON']['output'];
  links: HeroSectionSubtitleLinks;
};

export type HeroSectionSubtitleAssets = {
  __typename?: 'HeroSectionSubtitleAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HeroSectionSubtitleEntries = {
  __typename?: 'HeroSectionSubtitleEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HeroSectionSubtitleLinks = {
  __typename?: 'HeroSectionSubtitleLinks';
  assets: HeroSectionSubtitleAssets;
  entries: HeroSectionSubtitleEntries;
  resources: HeroSectionSubtitleResources;
};

export type HeroSectionSubtitleResources = {
  __typename?: 'HeroSectionSubtitleResources';
  block: Array<HeroSectionSubtitleResourcesBlock>;
  hyperlink: Array<HeroSectionSubtitleResourcesHyperlink>;
  inline: Array<HeroSectionSubtitleResourcesInline>;
};

export type HeroSectionSubtitleResourcesBlock = ResourceLink & {
  __typename?: 'HeroSectionSubtitleResourcesBlock';
  sys: ResourceSys;
};

export type HeroSectionSubtitleResourcesHyperlink = ResourceLink & {
  __typename?: 'HeroSectionSubtitleResourcesHyperlink';
  sys: ResourceSys;
};

export type HeroSectionSubtitleResourcesInline = ResourceLink & {
  __typename?: 'HeroSectionSubtitleResourcesInline';
  sys: ResourceSys;
};

export enum ImageFormat {
  /** AVIF image format. */
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/link) */
export type Link = Entry & _Node & {
  __typename?: 'Link';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  internalPage?: Maybe<Page>;
  label?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<LinkLinkingCollections>;
  sys: Sys;
  url?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/link) */
export type LinkInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/link) */
export type LinkInternalPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/link) */
export type LinkLabelArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/link) */
export type LinkLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/link) */
export type LinkUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type LinkCollection = {
  __typename?: 'LinkCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LinkFilter = {
  AND?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalPage?: InputMaybe<CfPageNestedFilter>;
  internalPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LinkLinkingCollections = {
  __typename?: 'LinkLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  globalHeaderCollection?: Maybe<GlobalHeaderCollection>;
  heroSectionCollection?: Maybe<HeroSectionCollection>;
};


export type LinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LinkLinkingCollectionsGlobalHeaderCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsGlobalHeaderCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LinkLinkingCollectionsHeroSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsHeroSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum LinkLinkingCollectionsGlobalHeaderCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum LinkLinkingCollectionsHeroSectionCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  IsTopOfPageAsc = 'isTopOfPage_ASC',
  IsTopOfPageDesc = 'isTopOfPage_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum LinkOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/page) */
export type Page = Entry & _Node & {
  __typename?: 'Page';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageLinkingCollections>;
  pageSectionsCollection?: Maybe<PagePageSectionsCollection>;
  seoMetadata?: Maybe<SeoMetaData>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/page) */
export type PageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/page) */
export type PageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/page) */
export type PagePageSectionsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PagePageSectionsFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/page) */
export type PageSeoMetadataArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeoMetaDataFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/page) */
export type PageSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type PageCollection = {
  __typename?: 'PageCollection';
  items: Array<Maybe<Page>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageSections?: InputMaybe<CfpageSectionsMultiTypeNestedFilter>;
  pageSectionsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoMetadata?: InputMaybe<CfSeoMetaDataNestedFilter>;
  seoMetadata_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type PageLinkingCollections = {
  __typename?: 'PageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  linkCollection?: Maybe<LinkCollection>;
};


export type PageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type PageLinkingCollectionsLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageLinkingCollectionsLinkCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum PageLinkingCollectionsLinkCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export enum PageOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PagePageSectionsCollection = {
  __typename?: 'PagePageSectionsCollection';
  items: Array<Maybe<PagePageSectionsItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PagePageSectionsFilter = {
  AND?: InputMaybe<Array<InputMaybe<PagePageSectionsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PagePageSectionsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PagePageSectionsItem = ArticleGridSection | CarouselSection | ExperienceSection | HeroSection | SocialSection;

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type Projects = Entry & _Node & {
  __typename?: 'Projects';
  _id: Scalars['ID']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  desc?: Maybe<ProjectsDesc>;
  link?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ProjectsLinkingCollections>;
  previewImage?: Maybe<Asset>;
  releaseDate?: Maybe<Scalars['DateTime']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type ProjectsCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type ProjectsDescArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type ProjectsLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type ProjectsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type ProjectsPreviewImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type ProjectsReleaseDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/projects) */
export type ProjectsTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectsCollection = {
  __typename?: 'ProjectsCollection';
  items: Array<Maybe<Projects>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectsDesc = {
  __typename?: 'ProjectsDesc';
  json: Scalars['JSON']['output'];
  links: ProjectsDescLinks;
};

export type ProjectsDescAssets = {
  __typename?: 'ProjectsDescAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ProjectsDescEntries = {
  __typename?: 'ProjectsDescEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ProjectsDescLinks = {
  __typename?: 'ProjectsDescLinks';
  assets: ProjectsDescAssets;
  entries: ProjectsDescEntries;
  resources: ProjectsDescResources;
};

export type ProjectsDescResources = {
  __typename?: 'ProjectsDescResources';
  block: Array<ProjectsDescResourcesBlock>;
  hyperlink: Array<ProjectsDescResourcesHyperlink>;
  inline: Array<ProjectsDescResourcesInline>;
};

export type ProjectsDescResourcesBlock = ResourceLink & {
  __typename?: 'ProjectsDescResourcesBlock';
  sys: ResourceSys;
};

export type ProjectsDescResourcesHyperlink = ResourceLink & {
  __typename?: 'ProjectsDescResourcesHyperlink';
  sys: ResourceSys;
};

export type ProjectsDescResourcesInline = ResourceLink & {
  __typename?: 'ProjectsDescResourcesInline';
  sys: ResourceSys;
};

export type ProjectsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectsFilter>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  desc_contains?: InputMaybe<Scalars['String']['input']>;
  desc_exists?: InputMaybe<Scalars['Boolean']['input']>;
  desc_not_contains?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_contains?: InputMaybe<Scalars['String']['input']>;
  link_exists?: InputMaybe<Scalars['Boolean']['input']>;
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  link_not?: InputMaybe<Scalars['String']['input']>;
  link_not_contains?: InputMaybe<Scalars['String']['input']>;
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  previewImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  releaseDate?: InputMaybe<Scalars['DateTime']['input']>;
  releaseDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  releaseDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  releaseDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  releaseDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  releaseDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  releaseDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectsLinkingCollections = {
  __typename?: 'ProjectsLinkingCollections';
  articleGridSectionCollection?: Maybe<ArticleGridSectionCollection>;
  carouselSectionCollection?: Maybe<CarouselSectionCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type ProjectsLinkingCollectionsArticleGridSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectsLinkingCollectionsArticleGridSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type ProjectsLinkingCollectionsCarouselSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectsLinkingCollectionsCarouselSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type ProjectsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProjectsLinkingCollectionsArticleGridSectionCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ProjectsLinkingCollectionsCarouselSectionCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlidesPerViewAsc = 'slidesPerView_ASC',
  SlidesPerViewDesc = 'slidesPerView_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ProjectsOrder {
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  ReleaseDateAsc = 'releaseDate_ASC',
  ReleaseDateDesc = 'releaseDate_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Query = {
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  articleGridSection?: Maybe<ArticleGridSection>;
  articleGridSectionCollection?: Maybe<ArticleGridSectionCollection>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  blog?: Maybe<Blog>;
  blogCollection?: Maybe<BlogCollection>;
  carouselSection?: Maybe<CarouselSection>;
  carouselSectionCollection?: Maybe<CarouselSectionCollection>;
  entryCollection?: Maybe<EntryCollection>;
  experienceItem?: Maybe<ExperienceItem>;
  experienceItemCollection?: Maybe<ExperienceItemCollection>;
  experienceSection?: Maybe<ExperienceSection>;
  experienceSectionCollection?: Maybe<ExperienceSectionCollection>;
  globalFooter?: Maybe<GlobalFooter>;
  globalFooterCollection?: Maybe<GlobalFooterCollection>;
  globalHeader?: Maybe<GlobalHeader>;
  globalHeaderCollection?: Maybe<GlobalHeaderCollection>;
  heroSection?: Maybe<HeroSection>;
  heroSectionCollection?: Maybe<HeroSectionCollection>;
  link?: Maybe<Link>;
  linkCollection?: Maybe<LinkCollection>;
  page?: Maybe<Page>;
  pageCollection?: Maybe<PageCollection>;
  projects?: Maybe<Projects>;
  projectsCollection?: Maybe<ProjectsCollection>;
  seoMetaData?: Maybe<SeoMetaData>;
  seoMetaDataCollection?: Maybe<SeoMetaDataCollection>;
  socialLink?: Maybe<SocialLink>;
  socialLinkCollection?: Maybe<SocialLinkCollection>;
  socialSection?: Maybe<SocialSection>;
  socialSectionCollection?: Maybe<SocialSectionCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryArticleGridSectionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryArticleGridSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ArticleGridSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ArticleGridSectionFilter>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryBlogArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBlogCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlogFilter>;
};


export type QueryCarouselSectionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCarouselSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CarouselSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CarouselSectionFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryExperienceItemArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryExperienceItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ExperienceItemOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExperienceItemFilter>;
};


export type QueryExperienceSectionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryExperienceSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ExperienceSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExperienceSectionFilter>;
};


export type QueryGlobalFooterArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGlobalFooterCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<GlobalFooterOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GlobalFooterFilter>;
};


export type QueryGlobalHeaderArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGlobalHeaderCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<GlobalHeaderOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GlobalHeaderFilter>;
};


export type QueryHeroSectionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryHeroSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<HeroSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HeroSectionFilter>;
};


export type QueryLinkArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LinkFilter>;
};


export type QueryPageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageFilter>;
};


export type QueryProjectsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProjectsFilter>;
};


export type QuerySeoMetaDataArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySeoMetaDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetaDataOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SeoMetaDataFilter>;
};


export type QuerySocialLinkArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySocialLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SocialLinkOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SocialLinkFilter>;
};


export type QuerySocialSectionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySocialSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SocialSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SocialSectionFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/seoMetaData) */
export type SeoMetaData = Entry & _Node & {
  __typename?: 'SeoMetaData';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<SeoMetaDataLinkingCollections>;
  ogImage?: Maybe<Asset>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/seoMetaData) */
export type SeoMetaDataDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/seoMetaData) */
export type SeoMetaDataInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/seoMetaData) */
export type SeoMetaDataLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/seoMetaData) */
export type SeoMetaDataOgImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/seoMetaData) */
export type SeoMetaDataTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type SeoMetaDataCollection = {
  __typename?: 'SeoMetaDataCollection';
  items: Array<Maybe<SeoMetaData>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SeoMetaDataFilter = {
  AND?: InputMaybe<Array<InputMaybe<SeoMetaDataFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SeoMetaDataFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ogImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SeoMetaDataLinkingCollections = {
  __typename?: 'SeoMetaDataLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type SeoMetaDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type SeoMetaDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetaDataLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum SeoMetaDataLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum SeoMetaDataOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialLink) */
export type SocialLink = Entry & _Node & {
  __typename?: 'SocialLink';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  icon?: Maybe<Scalars['String']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<SocialLinkLinkingCollections>;
  sys: Sys;
  url?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialLink) */
export type SocialLinkIconArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialLink) */
export type SocialLinkInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialLink) */
export type SocialLinkLabelArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialLink) */
export type SocialLinkLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialLink) */
export type SocialLinkUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type SocialLinkCollection = {
  __typename?: 'SocialLinkCollection';
  items: Array<Maybe<SocialLink>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SocialLinkFilter = {
  AND?: InputMaybe<Array<InputMaybe<SocialLinkFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SocialLinkFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon?: InputMaybe<Scalars['String']['input']>;
  icon_contains?: InputMaybe<Scalars['String']['input']>;
  icon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_not?: InputMaybe<Scalars['String']['input']>;
  icon_not_contains?: InputMaybe<Scalars['String']['input']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SocialLinkLinkingCollections = {
  __typename?: 'SocialLinkLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  socialSectionCollection?: Maybe<SocialSectionCollection>;
};


export type SocialLinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type SocialLinkLinkingCollectionsSocialSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SocialLinkLinkingCollectionsSocialSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum SocialLinkLinkingCollectionsSocialSectionCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum SocialLinkOrder {
  IconAsc = 'icon_ASC',
  IconDesc = 'icon_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialSection) */
export type SocialSection = Entry & _Node & {
  __typename?: 'SocialSection';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<SocialSectionLinkingCollections>;
  socialLinksCollection?: Maybe<SocialSectionSocialLinksCollection>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialSection) */
export type SocialSectionInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialSection) */
export type SocialSectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialSection) */
export type SocialSectionSocialLinksCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SocialSectionSocialLinksCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SocialLinkFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/h4xhjdvwsvf7/content_types/socialSection) */
export type SocialSectionTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type SocialSectionCollection = {
  __typename?: 'SocialSectionCollection';
  items: Array<Maybe<SocialSection>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SocialSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<SocialSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SocialSectionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  socialLinks?: InputMaybe<CfSocialLinkNestedFilter>;
  socialLinksCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SocialSectionLinkingCollections = {
  __typename?: 'SocialSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type SocialSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type SocialSectionLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SocialSectionLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum SocialSectionLinkingCollectionsPageCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum SocialSectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type SocialSectionSocialLinksCollection = {
  __typename?: 'SocialSectionSocialLinksCollection';
  items: Array<Maybe<SocialLink>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum SocialSectionSocialLinksCollectionOrder {
  IconAsc = 'icon_ASC',
  IconDesc = 'icon_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']['output']>;
};

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type CfExperienceItemNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfExperienceItemNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfExperienceItemNestedFilter>>>;
  company?: InputMaybe<Scalars['String']['input']>;
  company_contains?: InputMaybe<Scalars['String']['input']>;
  company_exists?: InputMaybe<Scalars['Boolean']['input']>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  company_not?: InputMaybe<Scalars['String']['input']>;
  company_not_contains?: InputMaybe<Scalars['String']['input']>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  endDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  isCurrent_exists?: InputMaybe<Scalars['Boolean']['input']>;
  isCurrent_not?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
};

export type CfLinkNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfLinkNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfLinkNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfPageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageSectionsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoMetadata_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfSeoMetaDataNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfSeoMetaDataNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfSeoMetaDataNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ogImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfSocialLinkNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfSocialLinkNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfSocialLinkNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon?: InputMaybe<Scalars['String']['input']>;
  icon_contains?: InputMaybe<Scalars['String']['input']>;
  icon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_not?: InputMaybe<Scalars['String']['input']>;
  icon_not_contains?: InputMaybe<Scalars['String']['input']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfarticlesMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfarticlesMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfarticlesMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfpageSectionsMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfpageSectionsMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfpageSectionsMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfslidesMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfslidesMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfslidesMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};



export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;