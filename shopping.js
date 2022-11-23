const puppeteer = require("puppeteer")

async function shop(searchTerm) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36")
    await page.goto("https://www.sainsburys.co.uk/")
      
    await page.waitForNetworkIdle()
    await page.click("#onetrust-accept-btn-handler")

    await page.waitForNetworkIdle()
    await page.type("#term", searchTerm)
    await Promise.all([page.click("[data-testid~=search-btn]"), page.waitForNavigation({waitUntil: "networkidle0"})])
    await page.screenshot({path:"test.png", fullPage: true})
  

    await browser.close()

}

shop("chicken")