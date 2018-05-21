<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="col-sm-6">
        <a class="navbar-brand">Just In Time - Kanban</a>
      </div>
      <div class="col-sm-6" style="text-align:right">
        <ul>
          <li v-if="stLogin == false">
            <button class="btn btn-danger navbar-btn" @click="login()">Login via Gmail</button>
          </li>
          <li v-if="stLogin == true">
            <button class="btn btn-danger navbar-btn" data-toggle="modal" data-target="#CreateTodo">Create Todo</button>
          </li>
          <li v-if="stLogin == true">
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
        stLogin: true,
      }
    },
    methods: {
      login: function(){
        const self = this
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(function(result) {
          const token = result.credential.accessToken;
          const user = result.user;
          // localStorage.setItem('token', token)
          swal(
            'Good job!',
            'log in Success!',
            'success'
          )
          self.stLogin = true
        }).catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log('gagal login dengan gamil', error)
        });
      },
      Logout() {
        const self = this
        firebase.auth().signOut().then(function() {
          localStorage.removeItem('token')
          // console.log('Sign-out successful.')
          swal(
            'Good job!',
            'log out seccess!',
            'success'
          )
          self.stLogin = false
        }).catch(function(error) {
          console.log(error)
        });
      },
    },
  }
</script>

<style>
li {
    display: inline;
}
</style>
