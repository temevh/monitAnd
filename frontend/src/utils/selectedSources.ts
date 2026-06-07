export function selectedSources () {
  const selected = []
  const reddit = localStorage.getItem('reddit_selected')
  const news = localStorage.getItem('news_selected')
  const twitter = localStorage.getItem('twitter_selected')

  if (reddit === 'true') {
    selected.push('reddit')
  }
  if (news === 'true') {
    selected.push('news')
  }
  if (twitter === 'true') {
    selected.push('twitter')
  }

  return selected
}
