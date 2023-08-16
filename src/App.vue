<script setup>
import NavBar from './components/NavBar.vue'
import {RouterView} from 'vue-router'
import {onMounted} from 'vue'
import {useUserStore} from './stores/users'

const userStore = useUserStore()

onMounted(()=>{
  userStore.getUser()
})

</script>

<template>
<NavBar></NavBar>
<RouterView></RouterView>
</template>

<style scoped>



</style>