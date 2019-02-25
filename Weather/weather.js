const API_KEY = '64e799bda0864985904a855811463b12';
const CITY = 'London';
const UNITS = 'metric';
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

new Vue({
    el: "#app",
    data: {
        message: '123',
        wData: null,
        temp: '',
        wMain: {},
        cTime: {},
        icon: ''
    },
    methods: {
        getData() {
            // Make a request for a user with a given ID
            axios.get('http://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        q: CITY,
                        appid: API_KEY,
                        units: UNITS
                    }
                })
                .then((response) => {
                    // this.setWeather(response.data);
                    this.wData = response.data;
                    this.temp = Math.floor(this.wData.main.temp) + '°';
                    this.wMain = {
                        main: this.wData.weather[0].main,
                        desc: this.wData.weather[0].description
                    };
                    console.log(this.wData.weather[0].icon)
                    this.icon = this.wData.weather[0].icon;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        },
        sun(time) {
            let date = new Date(time * 1000);
            return `${date.getUTCHours()}:${this.min(date.getUTCMinutes())} `
        },
        time() {
            let date = new Date();
            console.log(date)
            return this.cTime = {
                mon: monthNames[date.getMonth()],
                day: date.getDate(),
                hours: date.getHours(),
                min: this.min(date.getMinutes()),
                sec: this.min(date.getSeconds())
            }

        },
        min(min) {
            return min > 10 ? min : '0' + min
        }
    },
    computed: {
        iconSrc: function () {
            return `http://openweathermap.org/img/w/${this.icon}.png`;
        }
    },
    created() {
        this.getData();
        setInterval(() => {
            this.time()
        }, 1000);
    }
});