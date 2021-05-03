const submit = document.querySelector("#sub");
const geoData = document.querySelector("#geo");
const result = document.querySelector("#result");

function writeToScreen(message, position) {
  let title = document.createElement("div");
  title.className = position;
  result.appendChild(title);
  let subTitle = document.createElement("div");
  subTitle.className = "col-6";
  title.appendChild(subTitle);
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.style.border = "solid";
  pre.style.background = "white";
  pre.innerHTML = message;
  subTitle.appendChild(pre);
}

const success = (position) => { 
  writeToScreen(`<a href="https://www.openstreetmap.org/#map=19/${position.coords.latitude}/${position.coords.longitude}">ГЕО-данные</a>`, "row justify-content-end");
}

const error = () =>{
  writeToScreen(`Информация о местоположении недоступна!`, "row justify-content-end");
}

let websocket;

document.addEventListener("DOMContentLoaded",() => {
  result.innerHTML = 'Ждем CONNECTED!!!';
  websocket = new WebSocket("wss://echo.websocket.org/");
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED, Можно писать сообщения!", "row justify-content-start");
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED", "row justify-content-start");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">Сервер: ' + evt.data+'</span>', "row justify-content-start"
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data , "row justify-content-start"
    );
  };
});

geoData.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
  }
});

submit.addEventListener('click', () => {
  let inputMessage = document.querySelector(".message").value;
  writeToScreen(`Пользователь: ${inputMessage}`, "row justify-content-end");
  websocket.send(inputMessage);
});
