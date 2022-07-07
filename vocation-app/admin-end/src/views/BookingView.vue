<template>
  <TopBar title="Manage Bookings"/>
  <div class="p0-col-12">
    <h1>Manage Bookings</h1>    
  </div>
  <div class="p-col-12">
    <Card v-for="b of bookings" :key="b.id">
      <template #title>{{b.name}}</template>
      <template #content>
        <p>Address: {{b.address}}</p>
        <p>Description: {{b.description}}</p>
        <p>Start Date: {{b.start_date}}</p>
        <p>End Date: {{b.end_date}}</p>
      </template>
      <template #footer>
        <Button icon = "pi pi-times"
          label = "Cancel"
          class="p-button-secondary"
          @click="deleteBooking(b.id)"/>
      </template>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
import {APIURL} from "@/constants";
import TopBar from "@/components/TopBar.vue"

export default{
  name: "BookingView",
  components: {
    TopBar,
  },
  data() {
    return {
      bookings: [],
    }
  },
  methods: {
    getBookings(){
      axios.get(`${APIURL}/bookings`)
    },
    deleteBooking(id)
    {
      axios.delete(`${APIURL}/bookings/${id}`);
    }
  },
  beforeMount() {
    this.getBookings(); 
  },
}
</script>
