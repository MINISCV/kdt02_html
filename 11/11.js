const getDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // const year = yesterday.getFullYear();
    // const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
    // const day = yesterday.getDate().toString().padStart(2, '0');
    return yesterday.toISOString().slice(0, 10);
}

const getMovieData = (date, ul) => {
    const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=6a297044a9c708817d3e785f3308ca25&targetDt=${date.value.replaceAll("-", "")}&itemPerPage=10`;
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
                const mvList = dailyBoxOfficeList.map((item) => `<li>
            <span class="spRank">${item.rank}</span> 
            <span class="spMv">${item.movieNm}</span>
            <span class="spInten">${item.rankInten == "0" ? "" : Math.abs(parseInt(item.rankInten))}
             ${parseInt(item.rankInten) > 0 ? '<i class="fa-solid fa-arrow-up"></i>'
                        : parseInt(item.rankInten) < 0 ? '<i class="fa-solid fa-arrow-down"></i>'
                            : '<i class="fa-solid fa-minus"></i>'}</span>
            
            </li>`);
                ul.innerHTML = mvList.join('');
                console.log(dailyBoxOfficeList)
            })
            .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
    const date = document.querySelector("input");
    const ul = document.querySelector("main > ul");
    date.value = getDate();
    date.setAttribute("max", getDate());
    getMovieData(date, ul);
    date.addEventListener("input", () => getMovieData(date, ul));
});

{/* <span class="spNew">${item.rankOldAndNew == "NEW" ? "NEW" : ""}</span> */ }