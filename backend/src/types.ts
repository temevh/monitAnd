export type News = {
  title: string;
  source: string;
  author: string;
  url: string;
  date: string;
  content?: string;
};

export type RedditPost = {
  title: string;
  link: string;
  author: string;
  subreddit: string;
  date: string;
};
