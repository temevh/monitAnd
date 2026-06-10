export type postBodyDto = {
  keyword: string;
  sources: string[];
};

export type KeywordData = {
  keyword: string;
  search_count: number;
  last_searched_at: string;
  search_logs: SearchLogItem[];
};

type SearchLogItem = {
  searched_at: string;
};
