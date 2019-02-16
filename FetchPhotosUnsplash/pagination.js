Vue.component('pagination', {
	template: '#pagination-template',
	props: {
		current: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 0
		},
		perPage: {
			type: Number,
			default: 8
		},
		pageRange: {
			type: Number,
			default: 2
		}
	},
	computed: {
		pages: function() {
			var pages = []

			for(var i = this.rangeStart; i <= this.rangeEnd; i++) {
				pages.push(i)
			}
			return pages
		},
		rangeStart: function() {
			var start = this.current - this.pageRange
			return (start > 0) ? start: 1
		},
		rangeEnd: function() {
			var end = this.current + this.pageRange
			return (end < this.totalPages) ? end : this.totalPages
		},
		totalPages: function() {
			return Math.ceil(this.total/this.perPage)

		},
		nextPage: function() {
			return this.current + 1
		},
		prevPage: function() {
			return this.current - 1
		}
	},
	methods: {
		hasPrev: function() {
			
			if (this.current > 1) {
				return false
			}
			else {
				return true
			}
		
		},
		hasNext: function() {
			if (this.current < this.totalPages) {
				return false
			}
			else {
				return true
			}
			return this.current < this.totalPages
		},
		changePage: function(page) {
			this.$emit('page-change', page)
		}
	}
})