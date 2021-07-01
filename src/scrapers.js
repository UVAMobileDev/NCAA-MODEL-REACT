const axios = require('axios');
const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const apiUrl = 'http://35.153.97.187:8080/teams';

    let teamNames = [];

    let teamData = [];

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

    for (i = 1; i < 47; i++) { 
        var xPathImg = '//*[@id="team"]/ul/li[' + i + ']/a/img';
        var xPathText = '//*[@id="team"]/ul/li[' + i + ']/a';

        var [ImageName] = await page.$x(xPathImg);
        var src = await ImageName.getProperty('src');
        var srcTxt = await src.jsonValue();

        var [Team] = await page.$x(xPathText);
        var text = await Team.getProperty('textContent');

        var name = await text.jsonValue();
        name = await name.trim();  

        // teamData.push({srcTxt , name});

        teamData.push({srcTxt, name});
    }

    console.log(teamData); //jQuery

    browser.close();
}

// function funScrape() {
//     axios
//         .get("./LogoList.json")
//         .then((response) => response.data)
//         .then((data) => {
//             const txt = data.data.map(o => o.srcTxt);
//             txt.forEach(element => {
//                 console.log(element);
//             });
//     });

//     console.log('Test');
// }

scrapeProduct('https://www.sportslogos.net/teams/list_by_league/35/NCAA_Division_I_u-z/NCAA_u-z/logos/');

// funScrape();