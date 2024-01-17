interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: Localized;
  country: string;
}

interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ChannelListResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface ChannelStatisticsProps {
  channelId: string;
}
