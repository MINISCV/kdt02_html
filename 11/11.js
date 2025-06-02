const posterCacheKey = "moviePosterCache";
let posterCache = JSON.parse(sessionStorage.getItem(posterCacheKey)) || {};

const getDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // const year = yesterday.getFullYear();
    // const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
    // const day = yesterday.getDate().toString().padStart(2, '0');
    return yesterday.toISOString().slice(0, 10);
}

const getPoster = (movieName) => {
    if (posterCache[movieName]) {
        const poster = document.querySelector(".poster");
        poster.innerHTML = `<img src="${posterCache[movieName]}" alt="${movieName} 포스터" class="posterImg">`;
        return;
    }        
    const apiKey = "b42483d9af611184a5e87b9980e11075";
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let posterPath = "https://image.tmdb.org/t/p/w500";
            if (data.results[0].poster_path === null)
                posterPath += data.results[0].backdrop_path;
            else
                posterPath += data.results[0].poster_path;
            posterCache[movieName] = posterPath;
            sessionStorage.setItem(posterCacheKey, JSON.stringify(posterCache));
            const poster = document.querySelector(".poster");
            poster.innerHTML = `<img src="${posterPath}" alt="${movieName} 포스터" class="posterImg">`;
        })
        .catch(err => console.log(err));
}

const getMovieData = (date, ul) => {
    const apiKey = "6a297044a9c708817d3e785f3308ca25";
    let url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${date.value.replaceAll("-", "")}&itemPerPage=10`;
    const movieType = document.querySelector("input[type=radio]:checked");
    if (movieType.id === 'commercial') {
        url += "&multiMovieYn=N";
    } else if (movieType.id === 'multi') {
        url += "&multiMovieYn=Y";
    }
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            const mvList = dailyBoxOfficeList.map((item) => 
                 `<li onmouseover="getPoster('${item.movieNm.replace(/'/g, "\\'")}')">
        <span class="spRank">${item.rank}</span> 
        <span class="spMv">${item.movieNm}</span>
        <span class="spInten">${item.rankInten == "0" ? "" : Math.abs(parseInt(item.rankInten))}
            ${parseInt(item.rankInten) > 0 ? '<i class="fa-solid fa-arrow-up"></i>'
                        : parseInt(item.rankInten) < 0 ? '<i class="fa-solid fa-arrow-down"></i>'
                            : '<i class="fa-solid fa-minus"></i>'}</span>
        
        </li>`);
            ul.innerHTML = mvList.join('');
            getPoster(dailyBoxOfficeList[0].movieNm);
        })
        .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
    const date = document.querySelector("input[type=date]");
    const ul = document.querySelector(".mvul");
    const movieType = document.querySelectorAll("input[type=radio]");

    date.value = getDate();
    date.setAttribute("max", getDate());
    getMovieData(date, ul);
    date.addEventListener("input", () => getMovieData(date, ul));
    movieType.forEach(r => r.addEventListener("change", () => getMovieData(date, ul)));
});