# Test Table

This is a test of the table in Forestry's read only docs.

<div class="container">
  <div id="vue-table">
    <input type="text" v-model="search" class="form-control" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-repeat="column: columns">
            <a href="#" 
               v-on="click: sortBy(column)"
               v-class="active: sortKey == column"
               >
              {{ column | capitalize }}
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-repeat="people
                      | filterBy search
                      | orderBy sortKey reverse">
          <td>{{ name }}</td>
          <td>{{ age }}</td>
        </tr>
      </tbody>
    </table>  
  </div>
</div>

<style>
  #vue-table {
  margin: 2em 0;
  
  a {
    font-weight: bold;
    text-decoration: none;  
    
    &.active {
      font-weight: bold;
      color: black;
      text-decoration: underline;
    }
  }
}</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/0.11.10/vue.min.js"></script>

<script>
console.log('hello Jacque!')
new Vue({
  el: '#vue-table',
  
  data: {
    sortKey: '',
    
    search: '',
    
    reverse: false,
    
    columns: ['name', 'age'],
    
    people: [
      {name: 'John', age: 50},
      {name: 'Jack', age: 35},
      {name: 'Keith', age: 28},
      {name: 'Alain', age: 17},
      {name: 'Neil', age: 1},
      {name: 'Mark', age: 72},
      {name: 'Don', age: 47},
      {name: 'Walter', age: 41},
      {name: 'Jessy', age: 33},
      {name: 'Henck', age: 22},
      {name: 'Sal', age: 9},
      {name: 'Skyler', age: 42},
      {name: 'Holly', age: 55},
    ]
  },
  
  methods: {
    sortBy: function(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
      this.sortKey = sortKey;
    }
  }
})</script>
