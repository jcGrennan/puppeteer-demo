const puppeteer = require('puppeteer')
const searchTerm = require('./modules/getSearchTerm')
const getRandomNum = require('./modules/getRandomNum')

async function shop() {

    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    page.setDefaultTimeout(0)
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36')
    await page.goto('https://www.sainsburys.co.uk/', {waitUntil: 'networkidle0'})
      
    await page.waitForSelector('#onetrust-accept-btn-handler')
    await page.click('#onetrust-accept-btn-handler')
    await page.waitForNetworkIdle()
    await page.click('a[href="#login"]')
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle0"}),
        page.click('a[data-label="Groceries account"]')
    ])
    
    await page.waitForSelector('#onetrust-accept-btn-handler')
    await page.click('#onetrust-accept-btn-handler')
    await page.type('input#username', 'jgrennan94@gmail.com')
    await page.type('input#password', 'forDemoPurposes1!')
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle0"}),
        page.click('button[data-testid="log-in"]'),
    ])

    await page.type('input#search-bar-input', searchTerm())
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle0"}),
        page.click('button[type="submit"]')
    ])
    
    await page.waitForSelector('button[data-test-id="feedback-btn-confirm"]')
    let resultsTitle = await page.$eval('h1', (element) => element.innerHTML)
    let itemArray = await page.$$('button[data-test-id="add-button"]')
    
    if(resultsTitle.includes(searchTerm())) {
        
        async function addToCart() {
            for(let i = 1; i <= getRandomNum(itemArray.length - 1, 5); i++) {
                itemArray = await page.$$('button[data-test-id="add-button"]')
                await itemArray[getRandomNum(itemArray.length - 1)].click()
            }
        }
    
        await addToCart()
        await page.waitForSelector('button[tabindex="0"]')
        await Promise.all([
            page.waitForNavigation({waitUntil: "networkidle0"}),
            page.click('button[tabindex="0"]')
        ]),
        
        await page.waitForNetworkIdle({idleTime: 200})
        await browser.close()
       
    } else {
        console.log("search returned no items")
        await browser.close()
    }

}

shop()