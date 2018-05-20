<template>
<div>

  <Navbar/>
  
  <div class="container-fluid">

    <div class="row">

      <div class="col-sm-2">
        <div class="panel  panel-default">
          <div class="panel-heading">
            <button class="close" data-toggle="modal" data-target="#CreateTodo">&plus;</button>
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

  <CreateTodo/>

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
      name: '',
      title: '',
      detail: '',
      assignto: ''
    }
  },
  firebase: {
    kanbans: kanbansRef
  },
  methods: {
    removekanban(key){
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
    },
    toSQ(key) {
      kanbansRef.child(key).update({
        status: 'sq'
      })
    },
    toEA(key) {
      kanbansRef.child(key).update({
        status: 'ea'
      })
    },
    toDP(key) {
      kanbansRef.child(key).update({
        status: 'dp'
      })
    },
    toTS(key) {
      kanbansRef.child(key).update({
        status: 'ts'
      })
    },
    toDY(key) {
      kanbansRef.child(key).update({
        status: 'dy'
      })
    },
    toDN(key) {
      kanbansRef.child(key).update({
        status: 'dn'
      })
    },
  }
}

</script>


<style scoped>
.panel {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
