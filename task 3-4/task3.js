const changeButton = document.querySelector('#sub');
const result = document.querySelector('#result');
const display = `Размеры экрана пользователя ${window.screen.width} и ${window.screen.height}. 
			<br>`;


const success = (position) => {
	const { coords } = position; 
	    result.innerHTML = `
	    	${display}
			Широта - ${coords.latitude} Долгота - ${coords.longitude}
		`
}

const error = () =>{
		result.innerHTML = `
			${display}
			Информация о местоположении недоступна!
		`;	
}

changeButton.addEventListener('click', ()=>{
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, error)
	}
});
