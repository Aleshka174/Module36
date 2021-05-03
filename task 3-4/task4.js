const changeButton = document.querySelector('#sub');
const result = document.querySelector('#result');

const request = (latitude, longitude )=>{
	const geoloc = "https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat="+latitude+"&long="+longitude;
	return fetch(geoloc)
		.then((response)=>{
			return response.json();
		})
};

const success = async (position) => { 
	const requestResult = await request(position.coords.latitude, position.coords.longitude);
	result.innerHTML = `
			Временная зона, в которой находится пользователь:  ${requestResult.timezone};
			<br>
			Местные дата и время: ${requestResult.date_time_txt}.
		`;
}

const error = () =>{
		result.innerHTML = `
			Информация о местоположении недоступна!
		`;	
}

changeButton.addEventListener('click', ()=>{
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, error)
	}
});

request;