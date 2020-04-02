// index.js
const fs = require('fs')
const fm = require('front-matter')

/**
 * getFiles - Get list of files in directory
 * @param {string} dir
 * @returns {Array} Array of objects
 */
const getFiles = (dir) => {
  const files = fs.readdirSync(dir)
  let filelist = []

  files.forEach((file) => {
    const post = fs.readFileSync(`content/analysis/${file}`, 'utf-8')
    const content = fm(post)
    const { title, date, ...meta } = content.attributes

    const slug =
      '/analysis/' +
      file
        .split('.')
        .slice(0, -1)
        .join('.')

    const dateObj = new Date(date)
    const month = dateObj.toLocaleString('en-US', { month: 'short' })
    const day = dateObj.getDay()
    const year = dateObj.getFullYear()

    filelist.push({
      title,
      slug,
      timestamp: date,
      date: `${month} ${day}, ${year}`,
      ...meta
    })
  })

  filelist.sort((a, b) => b.timestamp - a.timestamp)

  return filelist
}

/**
 * Write analysis json file
 */
const writeAnalysis = async () => {
  const fileArray = await getFiles('content/analysis/')

  fs.writeFile('content/analysis.json', JSON.stringify(fileArray), (err) => {
    if (err) throw new Error(err)
  })
}

writeAnalysis()
