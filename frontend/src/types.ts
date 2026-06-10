export type News = {
  title: string
  source: string
  author: string
  url: string
  date: string
  content?: string
}

export type RedditPost = {
  title: string
  link: string
  author: string
  subreddit: string
  date: string
}

export type KeywordData = {
  keyword: string
  search_count: number
  last_searched_at: string
  search_logs: SearchLogItem[]
}

type SearchLogItem = {
  searched_at: string
}
