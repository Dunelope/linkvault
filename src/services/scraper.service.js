import axios from 'axios'
import * as cheerio from 'cheerio'

export const scrapeMetadata = async (url) => {
  try {
    const { data } = await axios.get(url, { timeout: 5000 })
    const $ = cheerio.load(data)

    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').text() ||
      null

    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      null

    const image =
      $('meta[property="og:image"]').attr('content') ||
      null

    return { title, description, image }
  } catch (err) {
    return { title: null, description: null, image: null }
  }
}