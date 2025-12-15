import { fetchAPI } from './api'

/**
 * Fetch articles, optionally filtering by category identifiers.
 *
 * @param {Object} options
 * @param {Array<number>} [options.categoryIds]   filter by category IDs
 * @param {Array<string>} [options.categorySlugs] filter by category slugs
 * @param {Array<string>} [options.categoryNames] filter by category names
 * @returns {Promise<Array>} array of article objects
 */
export async function getArticlesByCategory({
  categoryIds = [],
  categorySlugs = [],
  categoryNames = [],
} = {}) {
  let url = `articles?populate=*`

  if (categoryIds.length > 0) {
    url += `&filters[categories][id][$in]=${categoryIds.join(',')}`
  } else if (categorySlugs.length > 0) {
    url += `&filters[categories][slug][$in]=${categorySlugs.join(',')}`
  } else if (categoryNames.length > 0) {
    url += `&filters[categories][name][$in]=${categoryNames.join(',')}`
  }

  const res = await fetchAPI(url)
  return res?.data || []
}