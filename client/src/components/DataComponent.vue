<template>
  <div class="container">
    <h1>SpeedTest</h1>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Opportunity</th>
            <th>Estimated savings (ms)</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item"
            v-for="(item, index) in items" :key="index">
            <td>{{ index }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.savings }}</td>
            <td>{{ item.displayValue }}</td>
          </tr>
        </tbody>
      </table>
    </div>
   
     
    <!-- <div class="item-container">
      <div class="item"
        v-for="(item, index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.index"
      >
      <p class="text">{{ item.title }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>

import axios from 'axios';

const dataUrl = 'http://localhost:5000/get_data';

export default {
  name: 'SpeedTest',
  data() {
    return {
      items: {},
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.items = await this.getData();
    } catch(error) {
      this.error = error.message;
    }
  },
  methods: {
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
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}

.table {
  display: block;
}
</style>
