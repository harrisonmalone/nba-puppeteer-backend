const puppeteer = require('puppeteer');

const getGames = async () => {
  const browser = await puppeteer.launch({devtools: false});
  const page = await browser.newPage();
  await page.goto('https://help.kayosports.com.au/s/article/What-s-on-Kayo-this-week#NBA');
  await page.waitForSelector('tbody')
  const games = await page.evaluate(() => {
    const nba = Array.from(document.querySelectorAll('tbody')[1].children).slice(3)
    const data = []
    nba.forEach((game) => {
      const [event, date] = game.children
      data.push({
        event: event.innerText,
        date: date.innerText
      })
    })
    return data
  })
  await browser.close()
  return games
}

module.exports = getGames