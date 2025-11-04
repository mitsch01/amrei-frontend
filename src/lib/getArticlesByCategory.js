import { fetchAPI } from './api'

/**
 * Fetch articles, optionally filtering by category names or IDs.
 *
 * @param {Object} options
 * @param {Array<number>} [options.categoryIds] - filter articles by these category IDs
 * @param {Array<string>} [options.categoryNames] - filter articles by these category names
 * @param {number} [options.limit] - pagination limit
 * @returns {Promise<Array>} - array of article objects
 */
export async function getArticlesByCategory({ categoryIds = [], categoryNames = [] } = {}) {
  let url = `articles?populate=*`

  if (categoryIds.length > 0) {
    url += `&filters[categories][id][$in]=${categoryIds.join(',')}`
  } else if (categoryNames.length > 0) {
    url += `&filters[categories][name][$in]=${categoryNames.join(',')}`
  }

  const res = await fetchAPI(url)
  return res?.data || []
}