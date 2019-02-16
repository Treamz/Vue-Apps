const api_key = '00243336e2f949edba05fc655da4510e';
const poster_url = 'https://image.tmdb.org/t/p/w500/';
new Vue({
	el: '#app',
	data: {
		MoviesList: [],
        pagescount: 1,
        page: 1,
        loading: true,
        imgsrc: '',
        mtitle: '',
        moverview: ''
	
	},
	methods: {
		rand(max,min) {
			 return Math.floor(Math.random() * (max - min + 1)) + min;

		},
		async getrandomfilm() {
			this.loading = true
			this.MoviesList = []
			await axios
				.get(`https://api.themoviedb.org/3/trending/all/day?language=ru-RU`,{
					params: {
						api_key: api_key,
						with_genres: this.selected_genre,
						primary_release_year: this.year,
						page: this.page
					}
				})
				.then(response => (
					 console.log(response.data),
					 this.pagescount = response.data.total_pages,
					 this.MoviesList.push(response.data.results[this.rand(20,0)]),
					 this.page = this.page + 1,
					 this.imgsrc = this.MoviesList[0].poster_path,
					 this.mtitle = this.MoviesList[0].title,
					 this.moverview = this.MoviesList[0].overview,
					 this.loading = false
					))
				.catch(error =>( console.log(error)));
						
		}
	},
	created() {
		this.getrandomfilm();

	},
	computed: {
       		
       poster: function() {
       	return poster_url + this.imgsrc
       },
       title: function() {
       	 if(this.mtitle != 'не определено' ) {
       	 	return this.mtitle + ''
       	 } else {
       	 	return this.mtitle = this.MoviesList[0].orignal_name + '1'
       	 }
       },
       overview: function() {
       	  return this.moverview + ''
       }

	}
})