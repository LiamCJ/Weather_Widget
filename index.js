const expHandlebars = require('express-handlebars')
const express = require('express');
const path = require('path');
var data = require("./weather.json")

const app = express();


//express-handlebars
app.engine('handlebars', expHandlebars({ defaultlayouts : 'main'}));
app.set('view engine', 'handlebars')

app.get('/', (req,res) => {

	var days = data.list;
	var currentDay;
	var today = new Date();
	var hour = today.getHours();
	var hourCheck;

	if( hour >= 0 && hour <= 2){
		hourCheck = "00:00:00";
		currentDay = days[1];
	}else if (hour >= 3 && hour < 6){
		hourCheck = "03:00:00";
		currentDay = days[1];
	}else if(hour >= 6 && hour < 9){
		hourCheck = "06:00:00";
		currentDay = days[0];
	}else if(hour >= 9 && hour < 12){
		hourCheck = "09:00:00";
		currentDay = days[0];
	}else if(hour >= 12 && hour < 15){
		hourCheck = "12:00:00";
		currentDay = days[0];
	}else if(hour >= 15 && hour < 18){
		hourCheck = "15:00:00";
		currentDay = days[0];
	}else if(hour >= 18 && hour < 21){
		hourCheck = "18:00:00";
		currentDay = days[1];
	}else if(hour >= 21 && hour < 24){
		hourCheck = "21:00:00";
		currentDay = days[1];
	}
	var nextDays = new Array();
	var count = 1;
	var weatherCnd = {"Clouds": "2.png", "Clear": "1.png", "Rain": "3.png"};
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var currentDate = currentDay.dt_txt.slice(0, -9);
	var nowCD = new Date(currentDate);
	var month = months[nowCD.getMonth()];

	days.forEach( function(element, index) {
		var time = element.dt_txt.slice(-8);

		if( time == hourCheck){
			var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
			var weather = {"Clouds": "2.png", "Clear": "1.png", "Rain": "3.png"};
			var weatherCond = element.weather[0].main
			var date = element.dt_txt.slice(0, -9);
			var now = new Date(date);
			var day = days[now.getDay()];
			nextDays.push({"day": day, "image": weather[weatherCond], "id": `day${count}`, "obj" :element});
			count +=  1;
		}
	})

	res.render('layouts/index', {
		condition : currentDay.weather[0].main,
		humidty: currentDay.main.humidity,
		temp: currentDay.main.temp,
		minTemp: currentDay.main.temp_min,
		maxTemp: currentDay.main.temp_max,
		wind: currentDay.wind.speed,
		image: weatherCnd[currentDay.weather[0].main],
		month: month,
		day: currentDate.slice(-2),
		year: currentDate.slice(0, -6),
		nextDays
	})

})

app.use(express.static('views/images')); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started On Port ${PORT} \nGo To: http://localhost:${PORT}`));
