import axios from 'axios';
const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const apiUrl = 'http://3.84.121.75:8080/teams';

    let teamNames = [];

    axios
        .get(apiUrl)
        .then((response) => response.data)
        .then((data) => {
            const teams = data.data.map(o => o.team_name);
            teams.forEach(element => {
                teamNames.push(element);
            });
    });


    console.log(teamNames[5]);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [ImageName] = await page.$x('//*[@id="team"]/ul/li[73]/a/img');
    const src = await ImageName.getProperty('src');
    const srcTxt = await src.jsonValue();

    const [Team] = await page.$x('//*[@id="team"]/ul/li[73]/a');
    const text = await Team.getProperty('textContent');
    const name = await text.jsonValue();

    console.log({srcTxt, name});

    browser.close();
}

scrapeProduct('https://www.sportslogos.net/teams/list_by_league/30/NCAA_Division_I_a-c/NCAA_a-c/logos/');

