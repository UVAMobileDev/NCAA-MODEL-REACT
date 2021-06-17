const axios = require('axios');
const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const apiUrl = 'http://3.84.121.75:8080/teams';

    let teamNames = [];

    await axios
        .get(apiUrl)
        .then((response) => response.data)
        .then((data) => {
            const teams = data.data.map(o => o.team_name);
            teams.forEach(element => {
                teamNames.push(element);
            });
    });

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    for (i = 1; i < 75; i++) { 
        var xPathImg = '//*[@id="team"]/ul/li[' + i + ']/a/img';
        var xPathText = '//*[@id="team"]/ul/li[' + i + ']/a';

        var [ImageName] = await page.$x(xPathImg);
        var src = await ImageName.getProperty('src');
        var srcTxt = await src.jsonValue();

        var [Team] = await page.$x(xPathText);
        var text = await Team.getProperty('textContent');

        var name = await text.jsonValue();
        name = await name.trim();        

        console.log({srcTxt, name});
    }

    // console.log(teamNames.length);

    browser.close();
}

scrapeProduct('https://www.sportslogos.net/teams/list_by_league/30/NCAA_Division_I_a-c/NCAA_a-c/logos/');