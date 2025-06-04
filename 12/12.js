const cacheKey = "Cache";
let cache = JSON.parse(sessionStorage.getItem(cacheKey)) || {};

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input[type="text"]');
    const confirmBt = document.querySelector('#confirm');
    const resetBt = document.querySelector('#cancel');
    const contents = document.querySelector('.contents');
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        confirmBt.click();
    });

    confirmBt.addEventListener('click', (e) => {
        e.preventDefault();
        const keyword = input.value.trim();
        if (keyword === '') {
            contents.innerHTML = '검색어를 입력하세요';
            return;
        }
        if (cache[keyword]) {
            contents.innerHTML = cache[keyword];
            return;
        }
        const key = "";
        const url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=${key}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${keyword}&_type=json`;
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (data.response.header.resultMsg === "OK") {
                    contents.innerHTML = '';
                    const items = data.response.body.items.item;
                    if (items && items.length > 0) {
                        items.forEach(item => {
                            console.log(item.galWebImageUrl);
                            contents.innerHTML += `
                                <div class="content">
                                    <img src="${item.galWebImageUrl.replace(/^http:\/\//, 'https://')}" alt="${item.galTitle}"/>
                                    <div class="text">
                                        <div>${item.galTitle}</div>
                                        <div>${item.galPhotographyLocation}</div>
                                    </div>
                                </div>`;
                        })
                        cache[keyword] = contents.innerHTML;
                        sessionStorage.setItem(cacheKey, JSON.stringify(cache));
                    } else
                        contents.innerHTML = '검색 결과가 없음';
                }
                    
            })
            .catch(error => {
                contents.innerHTML = `<p>${error}</p>`;
            });
    });

    resetBt.addEventListener('click', () => {
        contents.innerHTML = '';
    });
});