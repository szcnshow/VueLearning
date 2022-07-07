<template>
  <Menubar :model="items">
    <template #start>
      <b>Admin Frontend</b>
    </template>
  </Menubar>
</template>

<script>

export default{
  name: "TopBar",
  props: {
    title: String,
  },
  data() {
    return {
      items: [
        {
          label: "Manage Bookings",
          command: ()=> { this.$router.push("/bookings"); },
        },
      ]
    }
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
  beforeMount() {
    document.title = this.title;
  },
}

</script>
