const apiKey = 'AIzaSyDffZKH3A-C_5imt2fMM6urF3hML5jU99Y';

new Vue ({
    el: '#app',
    data: {
        dataComments: 'test',
        downloadLink: '',
        comms: [],
        strComms: ''
       
    },
    methods: {
        saveToFile() {
            
        }
    },
    created(){
        axios.get('https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet', {
            params: {
              key: apiKey,
              videoId: 'cuKCusm-iOs',
              maxResults: 100
            }
          })
          .then((response) => {
            console.log(response.data);
            this.dataComments = response.data.items;
            this.dataComments.forEach(element => {
                // this.comms.push({
                //     comm: element.snippet.topLevelComment.snippet.textOriginal,
                //     data: element.snippet.topLevelComment.snippet.publishedAt
                // })
                this.strComms += `${element.snippet.topLevelComment.snippet.textOriginal}
                ${element.snippet.topLevelComment.snippet.publishedAt}
                `
            });
            console.log(this.strComms)
            var file = new Blob([this.strComms], {type: 'text/plain'});
            this.downloadLink = URL.createObjectURL(file);

          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
    }
});