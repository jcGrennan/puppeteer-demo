const puppeteer = require("puppeteer")

async function shop(searchTerm) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.sainsburys.co.uk/")

    await page.click("#onetrust-accept-btn-handler")
    await page.screenshot({path: "test.png"})

    await browser.close()

}

shop()