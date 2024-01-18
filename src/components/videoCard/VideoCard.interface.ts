export interface VideoCardProps {
  title: string;
  publishDate: string;
  id: string;
  img: string;
}

export interface VideoListResponse {
  kind: string;
  etag: string;
  items: VideoItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  statistics: VideoStatistics;
}

interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}
