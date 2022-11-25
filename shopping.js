const puppeteer = require('puppeteer')
const process = require("process")
const { argv } = require('process')

async function shop() {

    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    page.setDefaultTimeout(0)
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36')
    await page.goto('https://www.sainsburys.co.uk/', {waitUntil: 'networkidle0'})
      
    await page.click('#onetrust-accept-btn-handler')
    await page.waitForNetworkIdle()
    await page.click('a[href="#login"]')
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle0"}),
        page.click('a[data-label="Groceries account"]')
    ])
    
    await page.click('#onetrust-accept-btn-handler')
    await page.type('input#username', 'jgrennan94@gmail.com')
    await page.type('input#password', 'forDemoPurposes1!')
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle0"}),
        page.click('button[data-testid="log-in"]'),
    ])

    const searchArgs = []

    function searchTerm() {
        for(i = 2; i < process.argv.length; i++) {
            searchArgs.push(process.argv[i])
        }
        
        if(process.argv[2]) {
            return searchArgs.join(" ")
        } else {
            return "cakes"
        }
    }

    
    await page.type('input#search-bar-input', searchTerm())
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle0"}),
        page.click('button[type="submit"]')
    ])
    
    function getRandomNum(max) {
        return Math.floor(Math.random() * max);
    }

    await page.waitForSelector('.ln-c-pagination__list')
    const itemArray = await page.$$('button[data-test-id="add-button"]')
    await itemArray[getRandomNum(itemArray.length - 1)].click()
    await page.waitForNetworkIdle({idleTime: 200})
    await browser.close()
}

shop()