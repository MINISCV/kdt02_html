const getDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // const year = yesterday.getFullYear();
    // const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
    // const day = yesterday.getDate().toString().padStart(2, '0');
    return yesterday.toISOString().slice(0, 10);
}

const getMovieData = (date, ul) => {
    const apiKey = "";
    let url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${date.value.replaceAll("-", "")}&itemPerPage=10`;
    const movieType = document.querySelector("input[type=radio]:checked");
    console.log(movieType.id);
    if (movieType.id === 'commercial') {
        url += "&multiMovieYn=N";
    } else if (movieType.id === 'multi') {
        url += "&multiMovieYn=Y";
    }
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
        })
        .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
    const date = document.querySelector("input");
    const ul = document.querySelector("main > ul");
    const movieType = document.querySelectorAll("input[type=radio]");

    date.value = getDate();
    date.setAttribute("max", getDate());
    getMovieData(date, ul);
    date.addEventListener("input", () => getMovieData(date, ul));
    movieType.forEach(r => r.addEventListener("change", () => getMovieData(date, ul)));
});