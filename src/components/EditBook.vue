<template>
  <b-row>
    <b-col cols="12">
        <br>
        <br>
      <h4>
        Edit Book <br>
        <router-link style="margin-left:580px;" :to="{ name: 'ShowBook', params: { id: key } }">(Show Book)</router-link>
      </h4>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group id="titleGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Title">
            <b-form-input id="title" v-model.trim="book.title"></b-form-input>
          </b-form-group>
          <b-form-group id="descGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Description">
              <b-form-textarea id="description"
                         v-model="book.description"
                         placeholder="Enter something"
                         :rows="2"
                         :max-rows="6">{{book.description}}</b-form-textarea>
          </b-form-group>
          <b-form-group id="authorGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Author">
            <b-form-input id="author" v-model.trim="book.author"></b-form-input>
          </b-form-group>
           <b-form-group id="priceGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter price">
            <b-form-input id="price" v-model.trim="book.price"></b-form-input>
          </b-form-group>
          <b-form-group id="imgurlGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Image URL">
            <b-form-input id="imgurl" v-model.trim="book.imgurl"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'EditBook',
  data () {
    return {
      key: this.$route.params.id,
      book: {}
    }
  },
  created () {
    const ref = firebase.firestore().collection('books').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.book = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const updateRef = firebase.firestore().collection('books').doc(this.$route.params.id);
      updateRef.set(this.book).then((docRef) => {
        this.key = ''
        this.book.title = ''
        this.book.description = ''
        this.book.author = ''
        this.book.price = ''
        this.book.imgurl = ''
        router.push({ name: 'ShowBook', params: { id: this.$route.params.id }})
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
