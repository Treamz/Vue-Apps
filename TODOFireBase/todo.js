const db = firebase.firestore();
new Vue({
    el: '#app',
    data: {
        message: 'your todo',
        editMsg: '',
        todos: [],
        isEditing: false,
        editedItem: {}
    },
    created() {
        db.collection("todos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
              
               this.todos.push({
                   id: doc.id,
                   text: doc.data().text,
                   isComplete: doc.data().isComplete
               })
            });
        }); 
    },
    methods: {
        deleteItem: function(task) {
            db.collection("todos").doc(task.id).delete().then(() => {
                this.todos.splice(this.todos.indexOf(task), 1);
                console.log('Item removed')
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });   
        },
        addItem: function(index) {
            console.log('Event');
            if(this.message == '') return
            db.collection("todos").add({
                text: this.message,
                isComplete: false
            })
            .then((docRef) => {
                this.todos.push({
                    id: docRef.id,
                    text: this.message,
                    isComplete: false
                });
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },
        editItem: function(edit) {
            this.isEditing = true;
            console.log(this.isEditing)
            this.editMsg = edit.text
            console.log(edit);
            this.editedItem = edit;
            this.$nextTick(() => this.$refs.edit.focus())
           // Vue.set(edit, "text", '123');
        },
        confirmEdit() {
            
            db.collection("todos").doc(this.editedItem.id).update({
                text: this.editMsg
             }).then(() => {
                 console.log("Document successfully updated!");
                 Vue.set(this.editedItem, "text", this.editMsg);
                 this.isEditing = false;
             }).catch(function(error) {
                 console.error("Error updating document: ", error);
             });
        },
        isComplete(item) {
            // if(item.isComlete == true) {

            // }
            let iscomp = item.isComplete ? false : true;
            console.log(iscomp);
            db.collection("todos").doc(item.id).update({
                isComplete: iscomp
             }).then(() => {
                 console.log("Document successfully updated!");
                 Vue.set(item, "isComplete", iscomp);
             }).catch(function(error) {
                 console.error("Error updating document: ", error);
             });
        },
        clearAllData() {
            if(this.todos.length != 0) {
                var batch = db.batch();
                this.todos.forEach(elem => {
                    let laRef = db.collection("todos").doc(elem.id);
                    batch.delete(laRef);
                });
                // Commit the batch
            batch.commit().then(() => {
                this.todos = [];
                console.log('well done')
            });

            }
        }
    }
});