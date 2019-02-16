var AppId = "c26f0af86cac413e6884d54e9586eec574f7178fc6e9875265169cec80ebeefa";

new Vue({
	el: "#app",
	data: {
		photos: [],
		totalPhotos: 0,
		perPage: 8,
		currentPage: 1
	},
	methods: {
		fetchPhotos: function(page) {
			var options = {
				params: {
					client_id: AppId,
					page: page,
					per_page: this.perPage
				}
			}
			this.$http.get('https://api.unsplash.com/photos', options).then(function(response) {
				console.log(response)
				this.photos = response.data
				this.totalPhotos = parseInt(response.headers.get('x-total'))

				this.currentPage = page
			}, console.log)
		}
	},
	created: function() {
		this.fetchPhotos(this.currentPage)
	}
})