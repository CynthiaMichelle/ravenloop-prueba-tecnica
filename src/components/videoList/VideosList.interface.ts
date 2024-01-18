interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Id {
  kind: string;
  videoId: string;
}

interface SearchResult {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  statistics: Statistics;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface YoutubeSearchListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: SearchResult[];
}
