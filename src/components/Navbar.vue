<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="col-sm-6">
        <a class="navbar-brand">Just In Time - Kanban</a>
      </div>
      <div class="col-sm-6" style="text-align:right">
        <ul>
          <li v-if="this.stLogout == false">
            <button class="btn btn-danger navbar-btn" @click="login()">Login via Gmail</button>
          </li>
          <li v-if="this.stLogout == true">
            <button class="btn btn-danger navbar-btn" data-toggle="modal" data-target="#CreateTodo">Create Todo</button>
          </li>
          <li v-if="this.stLogout == true">
            <button class="btn btn-danger navbar-btn" @click="Logout()">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import swal from 'sweetalert2'
  
  export default {
    name: "Navbar",
    data () {
      return {
        stLogout: false
      }
    },
    methods: {
      Logout() {
        firebase.auth().signOut().then(function() {
          localStorage.removeItem('token')
          // console.log('Sign-out successful.')
          swal(
            'Good job!',
            'log out seccess!',
            'success'
          )
          // this.stLogout = false
        }).catch(function(error) {
          console.log('An error happened.')
        });
      },
      login: function(){
        var provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          localStorage.setItem('token', token)
          swal(
            'Good job!',
            'log in Success!',
            'success'
          )
          // this.stLogout = true
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log('gagal login dengan gamil', error)
        });
      }
    },
    mounted () {
      let token = localStorage.getItem('token')
      if (token) {
        this.stLogout = true
      } 
    }
  }
</script>

<style>
li {
    display: inline;
}
</style>
