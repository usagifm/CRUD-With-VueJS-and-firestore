<template>
  <b-row>
    <b-col cols="12">
        <br>
        <br>
      <h4>
        Book List <br>
        <b-link  style="margin-left:580px;" href="#/add-book">Add Book</b-link>
      </h4>

    
      <ul >



<div class="col-lg-12">

<div class="row">
   

  <div style="margin-left:30px; margin-right:30px; width:24%" v-for="item in books" :key="item.title">
   

        <b-card style=" margin-bottom:30px;">
       <img v-bind:src="item.imgurl" style="width:150px; height:190px; left:100%; margin-bottom:20px;"/>
       <p style="max-width:180px; font-size:14px"> {{ item.title }}  </p>
       <p style="max-width:180px; font-size:12px" > By {{ item.author }}  </p>
       <p style="  font-weight: bold;
    color: #549b77;"> Rp.{{item.price | currency }}  </p>
        </b-card>
           
       

  </div>
 
</div>
</div>
</ul>


      <b-table striped hover :items="books" :fields="fields">
        <template v-slot:cell(actions)="data">
          <b-button @click.stop="details(data.item)" variant="primary">Detail</b-button>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'BookList',
  data () {
    return {
      fields: [
        { key: 'title', label: 'Title', sortable: true, 'class': 'text-left' },
        { key: 'author', label: 'Author', sortable: true, 'class': 'text-left' },
        { key: 'actions', label: 'Action', 'class': 'text-center' }
      ],
      books: [],
      errors: [],
      ref: firebase.firestore().collection('books'),
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.books = [];
      querySnapshot.forEach((doc) => {
        this.books.push({
          key: doc.id,
          title: doc.data().title,
          author: doc.data().author,
          price: doc.data().price,
          imgurl: doc.data().imgurl
        });
      });
    });
  },
  methods: {
    details (book) {
      router.push({ name: 'ShowBook', params: { id: book.key }})
    }
  },




  
}


</script>

<style>
  .table {
    width: 96%;
    margin: 0 auto;
  }
</style>
