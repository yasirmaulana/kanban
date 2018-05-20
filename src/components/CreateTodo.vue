<template>
  <div class="modal fade" id="CreateTodo" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Create To Do</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label>Title :</label>
          <input type="text" class="form-control" v-model="title">
          <label>Details :</label>
          <textarea class="form-control" v-model="detail" rows="3"></textarea>
          <label>Assign To :</label>
          <input type="text" class="form-control" v-model="assignto">
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-default" data-dismiss="modal" @click="submitkanban">Create</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { kanbansRef } from '@/firebase'
import Swal from 'sweetalert2'

export default {
  name: 'CreateTodo',
  data () {
    return {
      title: '',
      detail: '',
      assignto: null
    }
  },
  firebase: {
    kanbans: kanbansRef
  },
  methods: {
    submitkanban(){
      let self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          kanbansRef.push({
            title: self.title,
            detail: self.detail,
            assignto: self.assignto,
            status: 'sq'
          })
          self.title = ''
          self.detail = ''
          self.assignto = ''
        } else {
          Swal('Oops...', 'You have not signed in yet', 'error')
          
        }
      })
    }
  }
}
</script>

<style scoped>
  label {
    margin-top: 4px;
  }
</style>