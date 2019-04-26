const cheerio = require('cheerio');
const request = require('request');

const fetchIndeedData = async () => {
    let start = 0;
    let title = [];
    let company = [];
    let location = [];
    let summary = [];

    for (let i = 0; i < 5; i++) {
        let url = `https://ca.indeed.com/jobs?q=full+stack+developer&l=Toronto,+ON&start=${start}`;
        await request(url, (err, response, body) => {
            const $ = cheerio.load(body);

            $('#resultsCol .jobsearch-SerpJobCard .title a').each((i, item) => {
                title.push(item.attribs.title);
            });

            $('#resultsCol .jobsearch-SerpJobCard .company a').each((i, item) => {
                company.push($(item).text().trim());
            });

            $('#resultsCol .jobsearch-SerpJobCard .location').each((i, item) => {
                location.push($(item).text());
            });

            $('#resultsCol .jobsearch-SerpJobCard .summary ').each((i, item) => {
                summary.push($(item).text());
            });
        });
        console.log(title);
        start += 10;
    }

    const jobPostings = {
        title,
        location,
        company,
        summary
    };

    return jobPostings;
};

const getData = fetchIndeedData().then(data => console.log(data));