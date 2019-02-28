Vue.component('register',{
    template: '#register-template',
    data: function() {
        return {
            message: '123',
            checkAuth: false,
            user: {
                login: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        registerUser() {
            if(this.user.password !== this.user.password || this.user.password.length < 6) {
                this.checkAuth = true
            }
            // this.$emit('is-auth', 'login');
            else {
                firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then((user)=>{
                    this.$emit('is-auth', 'login');
                })
                .catch(function(error) {
                    console.log(error)
                });
            }
        },
        test(){
            console.log('ege')
            this.$emit('is-auth', 'login')
        }
    }
});

Vue.component('login', {
    template: '#login-template',
    data: function() {
        return {
            checkAuth: false,
            user: {
                login: '',
                password: '',
            }
        }
    },
    methods: {
        loginUser() {
            firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
            .then((response) => {
                console.log(response);
                const settings = {

                }
                this.$emit('is-auth', 'movies')
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });
        }
    }
})
Vue.component('movies',{
    template: '#movies-template',
    data: function() {
        return {
            msg: 'Ready'
        }
    }
})

new Vue({
    el: '#app',
    data: {
       currentView: 'login',
       viewSet: 'false',
       isAuthorized: false,
       user: {}
    },
    methods: {
        changeView(view) {
            this.currentView = view;
        },
        logOut() {
            firebase.auth().signOut().then(function() {
                this.changeView('login');
                this.isAuthorized = true;
                console.log('Succesfull')
              }).catch(function(error) {
                // An error happened.
              });
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.isAuthorized = true;

                this.user = {
                    email: user.email,
                    uid: user.uid
                }
              this.changeView('movies');
              console.log(this.currentView)
            } else {
              this.changeView('login');
            }
          });
    }
  

});