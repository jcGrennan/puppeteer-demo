const puppeteer = require("puppeteer")

async function shop(searchTerm) {
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.sainsburys.co.uk/")

}

shop()