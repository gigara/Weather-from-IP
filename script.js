
    getWeather();

    async function getLocation() {
        return fetch('https://api64.ipify.org?format=json')
            .then((response) => response.json())
            .then(function (data) {
                var ip = data['ip'];
                console.log(ip);
                var apiKey = 'YOUR API KEY';

                return fetch('https://geo.ipify.org/api/v1?apiKey=' + apiKey + '&ipAddress=' + ip)
                    .then((response) => response.json())
                    .then(function (data) {
                        var location = data['location'];
                        console.log(location);
                        document.getElementById("location").innerHTML = location;
                        return location;
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
            })
            .catch(function (e) {
                console.log(e);
            });
    };

    async function getWeather() {
        var location = await this.getLocation();
        var lat = location['lat'];
        var lon = location['lng'];

        var apiKey = 'YOUR API KEY';
        fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' +
            lat + '&lon=' + lon + '&appid=' + apiKey)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                var weather = data['weather'];
                var temp = data['main'];
                console.log("\n\n### Weather Result ###");
                console.log(weather[0]);
                console.log(temp);
                document.getElementById("weather").innerHTML = weather[0];
            })
            .catch(function (e) {
                console.log(e);
            });
    }

    window.onload = function () {
        getWeather();
    }
