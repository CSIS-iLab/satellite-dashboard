/**
 * Make a search index string by removing duplicated words
 * and removing less useful, common short words
 * From: https://github.com/philhawksworth/hawksworx.com/blob/8c96ba2541c8fd6fe6f521cdb5e17848c231636c/src/site/_filters/squash.js
 *
 * @param {String} text
 */

export const squash = function(text) {
  let content = new String(text)

  // all lower case, please
  content = content.toLowerCase()

  // remove all html elements and new lines
  let re = /(&lt;.*?&gt;)/gi
  let plain = unescape(content.replace(re, ''))

  // remove duplicated words
  let words = plain.split(' ')
  let deduped = [...new Set(words)]
  let dedupedStr = deduped.join(' ')

  // remove short and less meaningful words
  let result = dedupedStr.replace(
    /\b(\.|,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi,
    ''
  )
  //remove newlines, and punctuation
  result = result.replace(/\.|,|\?|-|—|\n/g, '')
  //remove repeated spaces
  result = result.replace(/[ ]{2,}/g, ' ')

  return result
}
