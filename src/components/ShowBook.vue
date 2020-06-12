<template>
  <b-row>
    <b-col cols="12">
      <br>
      <br>

      <h4>
        Edit Book <br>
        <b-link style="margin-left:580px;" href="#/">(Book List)</b-link>
      </h4>
      <b-jumbotron>


        <template slot="header">
           <img v-bind:src="book.imgurl" style="width:50%; height:500px; margin:auto; margin-bottom:20px;"/> <br>
         <h2> {{book.title}} </h2>
        </template>
   

        <template slot="lead">

    
          Description: {{book.description}}<br>
          Author: {{book.author}}<br>
          Price: Rp.{{book.price | currency }}<br>

        </template>
        <hr class="my-4">
        <b-btn class="edit-btn" variant="success" @click.stop="editbook(key)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletebook(key)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'ShowBook',
  data () {
    return {
      key: '',
      book: {}
    }
  },
  created () {
    const ref = firebase.firestore().collection('books').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.book = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    editbook (id) {
      router.push({
        name: 'EditBook',
        params: { id: id }
      })
    },
    deletebook (id) {
      firebase.firestore().collection('books').doc(id).delete().then(() => {
        router.push({
          name: 'BookList'
        })
      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .edit-btn {
    margin-right: 20px;
    width: 70px;
  }
</style>
