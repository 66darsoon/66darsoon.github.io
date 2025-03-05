const northernRegion = [
  "臺北市",
  "新北市",
  "基隆市",
  "新竹市",
  "桃園市",
  "新竹縣",
  "宜蘭縣",
];
const centralRegion = ["臺中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣"];
const southernRegion = [
  "高雄市",
  "臺南市",
  "嘉義市",
  "嘉義縣",
  "屏東縣",
  "澎湖縣",
];
const easternRegion = ["花蓮縣", "臺東縣"];
const IslandRegion = ["金門縣", "連江縣"];
let north = [];
const center = [];
const south = [];
const east = [];
const island = [];
// 原陣列(將資料整理出需要的部分)
let weatherInfo = [];
// 宣告新陣列存放更改過的資訊
let selectedWeatherInfo = [];

const cardRegion = document.querySelector(".card-region");
const areaItem = document.querySelectorAll(".area-item");

// 取得資料API
const getData = async () => {
  try {
    const url =
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-F11F9602-7BFC-435C-BF1F-935B28D1CF38";
    const response = await fetch(url);
    const result = await response.json();
    // render(result.records.location);
    let data = county(result);
    render(data);
  } catch (error) {
    console.log(error);
  }
};

// 畫面渲染
const render = (data) => {
  let content = "";
  let temp = "";

  data.forEach((county) => {
    if (county.minTemp === county.maxTemp) {
      temp = `${county.minTemp} °C`;
    } else {
      temp = `${county.minTemp} ~ ${county.maxTemp} °C`;
    }

    content += `
    <div class="card">
        <h2>${county.name}</h2>
        <h3>${county.time}</h3>
        <div class="weather-temp">
        <img src="" alt="" />
        <h3>${temp}</h3>
        </div>
        <div class="info">
          <table>
              <thead>
              <tr>
                  <th colspan="2">天氣資訊</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>天氣現象</td>
                  <td>${county.Wx}</td>
              </tr>
              <tr>
                  <td>舒適度</td>
                  <td>${county.CI}</td>
              </tr>
              <tr>
                  <td>降雨機率</td>
                  <td>${county.PoP}%</td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
    `;
  });
  cardRegion.innerHTML = content;
};
// 全台縣市資訊
// 將會用到的資料整理後進陣列再給render()使用
const county = (result) => {
  const countys = result.records.location;
  let weatherMinNum = "";
  let weatherMaxNum = "";
  let weatherWx = "";
  let weatherCI = "";
  let weatherPoP = "";
  // let countyWeather = '';
  let weatherState = "";
  let state = [];
  for (let index in countys) {
    for (let i = 0; i < countys[index].weatherElement.length; i++) {
      weatherState = countys[index].weatherElement[i];
      state = countyWeatherState(weatherState);
      if (state[0] === "Wx") {
        weatherWx = state[2];
      } else if (state[0] === "CI") {
        weatherCI = state[2];
      } else if (state[0] === "PoP") {
        weatherPoP = state[2];
      } else if (state[0] === "MinT") {
        weatherMinNum = state[2];
      } else if (state[0] === "MaxT") {
        weatherMaxNum = state[2];
      }
    }

    const dateStr = state[1];
    const dateObj = new Date(dateStr); // 轉換為 Date 物件
    const formattedDate = dateObj.toISOString().split("T")[0]; // 轉換為 ISO 格式並取得日期部分

    weatherInfo.push({
      name: countys[index].locationName,
      time: formattedDate,
      minTemp: weatherMinNum,
      maxTemp: weatherMaxNum,
      Wx: weatherWx,
      CI: weatherCI,
      PoP: weatherPoP,
    });
  }

  //   點擊事件綁定
  areaItem.forEach((area) => {
    area.addEventListener("click", () => {
      areaItem.forEach((item) => {
        item.classList.remove("bgcolor");
      });
      area.classList.add("bgcolor");
      switch (area.textContent) {
        case "全臺":
          selectedWeatherInfo = weatherInfo;
          break;
        case "北部":
          checkArea(northernRegion, weatherInfo, north);
          selectedWeatherInfo = north;
          break;
        case "中部":
          checkArea(centralRegion, weatherInfo, center);
          selectedWeatherInfo = center;
          break;
        case "南部":
          checkArea(southernRegion, weatherInfo, south);
          selectedWeatherInfo = south;
          break;
        case "東部":
          checkArea(easternRegion, weatherInfo, east);
          selectedWeatherInfo = east;
          break;
        case "外島":
          checkArea(IslandRegion, weatherInfo, island);
          selectedWeatherInfo = island;
          break;
        default:
          selectedWeatherInfo = weatherInfo;
      }
      render(selectedWeatherInfo);
    });
  });
  selectedWeatherInfo = weatherInfo;
  return selectedWeatherInfo;
};

// 判斷天氣現象 obj 的狀態是哪一種並回傳(Wx(天氣現象)、MaxT(最高溫度)、MinT(最低溫度)、CI(舒適度)、PoP(降雨機率))
const countyWeatherState = (weatherState) => {
  let name = "";
  let stateTime = "";
  let state = "";
  if (weatherState.elementName === "Wx") {
    name = weatherState.elementName;
    stateTime = weatherState.time[2].startTime;
    state = weatherState.time[2].parameter.parameterName;
  } else if (weatherState.elementName === "CI") {
    name = weatherState.elementName;
    stateTime = weatherState.time[2].startTime;
    state = weatherState.time[2].parameter.parameterName;
  } else if (weatherState.elementName === "PoP") {
    name = weatherState.elementName;
    stateTime = weatherState.time[2].startTime;
    state = weatherState.time[2].parameter.parameterName;
  } else if (weatherState.elementName === "MinT") {
    name = weatherState.elementName;
    stateTime = weatherState.time[2].startTime;
    state = weatherState.time[2].parameter.parameterName;
  } else if (weatherState.elementName === "MaxT") {
    name = weatherState.elementName;
    stateTime = weatherState.time[2].startTime;
    state = weatherState.time[2].parameter.parameterName;
  }
  return [name, stateTime, state];
};

function checkArea(areaArr, data, position) {
  // 先清空陣列，避免舊資料累加
  position.length = 0;
  data.forEach((item) => {
    for (let i = 0; i < areaArr.length; i++) {
      if (areaArr[i] === item.name) {
        position.push(item);
        return;
      }
    }
  });
}

getData();
