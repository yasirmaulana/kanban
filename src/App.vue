<template>
<div>

  <Navbar/>
  <div class="container-fluid">

    <div class="row">

      <div class="col-sm-2">
        <div class="panel  panel-default">
          <div class="panel-heading">
            <!-- <div>
              <button class="close" data-toggle="modal" data-target="#CreateTodo">&plus;</button>
            </div> -->
            <CreateTodo/>
            Story Queue
          </div>
          <div class="panel-body">
            <div v-for="kanban of kanbans" v-bind:key="kanban['.key']">
              <div v-if="kanban.status === 'sq'" class="panel  panel-default" >
                <div class="panel-heading">
                  <button class="close" @click="removekanban(kanban['.key'])">&times;</button>
                  {{kanban.title}}
                </div>
                <div class="panel-body text-left" style="overflow: auto;">
                  {{kanban.detail}}
                </div>
                <div class="panel-footer">
                  <div class="btn-group btn-group-justified">
                    <button @click="toEA(kanban['.key'])">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-2">
        <div class="panel panel-success">
          <div class="panel-heading">
            Elaboration & Acceptance
          </div>
          <div class="panel-body">
            <div v-for="kanban of kanbans" v-bind:key="kanban['.key']">
              <div v-if="kanban.status === 'ea'" class="panel panel-success" >
                <div class="panel-heading">
                  <button class="close" @click="removekanban(kanban['.key'])">&times;</button>
                  {{kanban.title}}
                </div>
                <div class="panel-body text-left" style="overflow: auto;">
                  {{kanban.detail}}
                </div>
                <div class="panel-footer">
                  <div class="btn-group btn-group-justified">
                    <button @click="toSQ(kanban['.key'])">&lt;</button>
                    <button @click="toDP(kanban['.key'])">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-2">
        <div class="panel panel-info">
          <div class="panel-heading">
            Development
          </div>
          <div class="panel-body">
            <div v-for="kanban of kanbans" v-bind:key="kanban['.key']">
              <div v-if="kanban.status === 'dp'" class="panel panel-info" >
                <div class="panel-heading">
                  <button class="close" @click="removekanban(kanban['.key'])">&times;</button>
                  {{kanban.title}}
                </div>
                <div class="panel-body text-left" style="overflow: auto;">
                  {{kanban.detail}}
                </div>
                <div class="panel-footer">
                  <div class="btn-group btn-group-justified">
                    <button @click="toEA(kanban['.key'])">&lt;</button>
                    <button @click="toTS(kanban['.key'])">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  class="col-sm-2">
        <div class="panel panel-warning">
          <div class="panel-heading">
            Test
          </div>
          <div class="panel-body">
            <div v-for="kanban of kanbans" v-bind:key="kanban['.key']">
              <div v-if="kanban.status === 'ts'" class="panel panel-warning" >
                <div class="panel-heading">
                  <button class="close" @click="removekanban(kanban['.key'])">&times;</button>
                  {{kanban.title}}
                </div>
                <div class="panel-body text-left" style="overflow: auto;">
                  {{kanban.detail}}
                </div>
                <div class="panel-footer">
                  <div class="btn-group btn-group-justified">
                    <button @click="toDP(kanban['.key'])">&lt;</button>
                    <button @click="toDY(kanban['.key'])">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  class="col-sm-2">
        <div class="panel panel-danger">
          <div class="panel-heading">
            Deployment
          </div>
          <div class="panel-body">
            <div v-for="kanban of kanbans" v-bind:key="kanban['.key']">
              <div v-if="kanban.status === 'dy'" class="panel panel-danger" >
                <div class="panel-heading">
                  <button class="close" @click="removekanban(kanban['.key'])">&times;</button>
                  {{kanban.title}}
                </div>
                <div class="panel-body text-left" style="overflow: auto;">
                  {{kanban.detail}}
                </div>
                <div class="panel-footer">
                  <div class="btn-group btn-group-justified">
                    <button @click="toTS(kanban['.key'])">&lt;</button>
                    <button @click="toDN(kanban['.key'])">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  class="col-sm-2">
        <div class="panel panel-primary">
          <div class="panel-heading">
            Done
          </div>
          <div class="panel-body">
            <div v-for="kanban of kanbans" v-bind:key="kanban['.key']">
              <div v-if="kanban.status === 'dn'" class="panel panel-primary" >
                <div class="panel-heading">
                  <button class="close" @click="removekanban(kanban['.key'])">&times;</button>
                  {{kanban.title}}
                </div>
                <div class="panel-body text-left" style="overflow: auto;">
                  {{kanban.detail}}
                </div>
                <div class="panel-footer">
                  <div class="btn-group btn-group-justified">
                    <button @click="toDY(kanban['.key'])">&lt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</div>

</template>

<script>
import { kanbansRef } from '@/firebase'
import Navbar from '@/components/Navbar.vue'
import CreateTodo from '@/components/CreateTodo.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Navbar,
    CreateTodo
  },
  data () {
    return {
      title: '',
      detail: ''
    }
  },
  firebase: {
    kanbans: kanbansRef
  },
  methods: {
    removekanban(key){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          Swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this todo!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
              kanbansRef.child(key).remove()
              Swal(
                'Deleted!',
                'Your todo has been deleted.',
                'success'
              )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal(
                'Cancelled',
                'Your todo is safe :)',
                'error'
              )
            }
          })
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
        }
      });
    },
    toSQ(key) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          kanbansRef.child(key).update({
            status: 'sq'
          })
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
        }
      });
    },
    toEA(key) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          kanbansRef.child(key).update({
            status: 'ea'
          })
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
        }
      });
    },
    toDP(key) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          kanbansRef.child(key).update({
            status: 'dp'
          })
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
        }
      });
    },
    toTS(key) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          kanbansRef.child(key).update({
            status: 'ts'
          })
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
        }
      });
    },
    toDY(key) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          kanbansRef.child(key).update({
            status: 'dy'
          })
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
        }
      });
    },
    toDN(key) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          kanbansRef.child(key).update({
            status: 'dn'
          })
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
        }
      });
    },
  },
}

</script>


<style scoped>
.panel {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
