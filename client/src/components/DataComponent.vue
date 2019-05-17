<template>
<!-- <v-app> -->
  <div id="container">
    <h1>SpeedTest</h1>
    <p class="error" v-if="error">{{ error }}</p>
      <!-- <table class="opportunity-results">
        <thead>
          <tr>
            <th>Opportunity</th>
            <th @click="sort()">Estimated savings</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item"
            v-for="(item, index) in sortedItems" :key="index">
            <td style="text-align: left;">{{ parseInt(index) + 1 + '. ' + item.title }}</td>
            <td>{{ (parseFloat(item.savings).toFixed(2) / 1000) + ' s : ' + item.displayValue}}</td>
          </tr>
        </tbody>
      </table> -->
    <!-- debug: sort={{currentSort}}, {{ sortedItems }} -->
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              {{ props.header.text }}
            </span>
          </template>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
       <template v-slot:items="props">
        <td>{{ props.index }}</td>
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-right">
          {{ (parseFloat(props.item.savings)  / 1000).toFixed(2) + ` s (${props.item.displayValue})` }}
          <v-progress-linear  color="red" height="5" :width="2" :value="props.item.score"></v-progress-linear>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here yet :( Please wait a moment.
        </v-alert>
      </template>
    </v-data-table>
    <br>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ `inazarin ` + new Date().getFullYear() }}</div>
    </v-footer>
  </div>
<!-- </v-app> -->
</template>

<script>

import axios from 'axios';
import '../../node_modules/vuetify/dist/vuetify.min.css';

const dataUrl = 'http://localhost:5000/get_data';

export default {
  name: 'SpeedTest',
  data() {
    return {
      items: [],
      error: '',
      text: '',
      currentSort: 'desc',
      custom: true,
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'index',
          font: 'bold'
        },
        {
          text: 'Opportunity',
          align: 'left',
          sortable: false,
          value: 'index'
        },
        {
          text: 'Estimated savings',
          align: 'right',
          value: 'savings'
        }]
    }
  },
  async created() {
    try {
      await this.getData();
    } catch(error) {
      this.error = error.message;
    }
  },
  methods:{
   getData() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.get(dataUrl);
                const data = result.data;
                resolve(
                  this.items = data
                );
            } catch(error) {
                reject(error);
            }
        })
    },
    sort:function(){
      this.currentSort = this.currentSort === 'asc' ? 'desc' : 'asc';
    }
  },
  computed: {
    sortedItems: function() {
      return [].slice.call(this.items).sort((a,b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a['savings'] < b['savings']) return 1 * modifier;
        if (a['savings'] > b['savings']) return -1 * modifier;
        return 0;
      });
    }
  }
}

</script>

<style>

@media screen and (max-width: 600px) {
  #index {
    display: none;
  }

  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}

/* original layout */
#container {
  text-align: center;
  padding: 10px;
	margin: auto;
}

table.opportunity-results{
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table thead tr {
  background-color: lightseagreen;
  border-right: 1px solid #ccc; 
}

tbody tr:nth-of-type(odd) { 
  background: #eee; 
}

th {
  cursor:pointer;
  font-weight: bold; 
  border: #fff;
}

td{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-collapse: collapse;
}

#index {
  text-align: left;
  width: 2px;
}
</style>
