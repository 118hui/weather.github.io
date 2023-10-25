const container = document.querySelector('.container'); // 取得容器元素
const search = document.querySelector('.search-box button'); // 取得搜尋按鈕元素
const weatherBox = document.querySelector('.weather-box'); // 取得天氣盒子元素
const weatherDetails = document.querySelector('.weather-details'); // 取得天氣詳細資訊元素
const error404 = document.querySelector('.not-found'); // 取得錯誤訊息元素

search.addEventListener('click', () => {

    const APIKey = 'cb5dfdf1f9803a9f589ba4d30c34ba6f'; // OpenWeatherMap API 金鑰
    const city = document.querySelector('.search-box input').value; // 取得使用者輸入的城市名稱

    if (city === '')
        return; // 如果城市名稱為空，則不進行查詢

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') { // 如果回傳的狀態碼是 '404'，表示找不到城市
                container.style.height = '400px'; // 設定容器高度
                weatherBox.style.display = 'none'; // 隱藏天氣盒子
                weatherDetails.style.display = 'none'; // 隱藏天氣詳細資訊
                error404.style.display = 'block'; // 顯示錯誤訊息
                error404.classList.add('fadeIn'); // 加入淡入動畫效果
                return; // 中止函式執行
            }

            error404.style.display = 'none'; // 隱藏錯誤訊息
            error404.classList.remove('fadeIn'); // 移除淡入動畫效果

            const image = document.querySelector('.weather-box img'); // 取得天氣圖示元素
            const temperature = document.querySelector('.weather-box .temperature'); // 取得溫度元素
            const description = document.querySelector('.weather-box .description'); // 取得天氣描述元素
            const humidity = document.querySelector('.weather-details .humidity span'); // 取得濕度元素
            const wind = document.querySelector('.weather-details .wind span'); // 取得風速元素

            // 根據天氣狀態選擇對應的圖示
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; // 顯示溫度
            description.innerHTML = `${json.weather[0].description}`; // 顯示天氣描述
            humidity.innerHTML = `${json.main.humidity}%`; // 顯示濕度
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; // 顯示風速

            weatherBox.style.display = ''; // 顯示天氣盒子
            weatherDetails.style.display = ''; // 顯示天氣詳細資訊
            weatherBox.classList.add('fadeIn'); // 加入淡入動畫效果
            weatherDetails.classList.add('fadeIn'); // 加入淡入動畫效果
            container.style.height = '590px'; // 設定容器高度


        });


});

//這段程式碼是一個簡單的天氣查詢應用程式，使用了 OpenWeatherMap API 來取得天氣資訊。
//根據 API 的回傳結果，更新網頁上的天氣資訊和圖示。如果找不到指定的城市，則顯示錯誤訊息。