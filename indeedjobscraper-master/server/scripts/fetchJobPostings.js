const cheerio = require('cheerio');
const axios = require('axios');

const fetchIndeedData = async(keyword) => {
    let start = 0;
    let title = [];
    let company = [];
    let location = [];
    let summary = [];

    const key = keyword.split(' ').join('+');

    for (let i = 0; i < 5; i++) {

        try {
            const body = await axios.get(`https://ca.indeed.com/jobs?q=${key}&l=Toronto,+ON&start=${start}`);
            const $ = cheerio.load(body.data);

            $('#resultsCol .jobsearch-SerpJobCard .title a').each((i, item) => {
                title.push(item.attribs.title);
            });

            $('#resultsCol .jobsearch-SerpJobCard .sjcl .company').each((i, item) => {
                //company.push($(item).text().trim());
                company.push($(item).text().trim())
            });

            $('#resultsCol .jobsearch-SerpJobCard .location').each((i, item) => {
                location.push($(item).text());
            });

            $('#resultsCol .jobsearch-SerpJobCard .summary ').each((i, item) => {
                summary.push($(item).text().replace(/\s+/g,' ').trim()); // 清楚多余的空格
            });
        } catch (e) {
            console.log(e);
        }
        start += 10;
    }

    return {
        title,
        company,
        location,
        summary,
        keyword
    }
};

module.exports = { fetchIndeedData };