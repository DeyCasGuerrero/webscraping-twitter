import puppeteer from "puppeteer";
import fs from "fs/promises"

async function laodingWebPage() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 0, height: 0}); //personaliza la h y w
    await page.goto("https://twitter.com/ado1024imokenp");

    for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Space')
        await new Promise(r => setTimeout(r, 1000))
    }

    const data = await page.evaluate(() => {

        const articles = document.querySelectorAll("article");
        const articleObjects = [];

        if (articles.length > 0) {
            articles.forEach(article => {
                const images = article.querySelectorAll('img');
                const imagesSrc = [];

                const numeros=article.querySelector()

                const links = article.querySelectorAll('a')
                const linksA = [];

                links.forEach(link => {
                    const src = link.getAttribute("href");
                    if (src && /^https?:\/\//i.test(src)) {
                        linksA.push(src);
                    }
                });

                images.forEach(img => {
                    const src = img.getAttribute("src");
                    if (src) {
                        imagesSrc.push(src);
                    }
                });

                const articleObject = {
                    texto: article.innerText,
                    link: linksA,
                    imagenes: imagesSrc
                };

                articleObjects.push(articleObject);
            });
            return articleObjects;
        } else {
            return null;
        }
    })
    console.log(`------------------------------`);
    console.log(data);
    await fs.writeFile('data.json', JSON.stringify(data, null, 2));
    await browser.close();

}


laodingWebPage();