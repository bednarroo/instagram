<template>
    <div  class="timeline-container">
    <Card 
    v-for="post in data"
    :post="post"
    :key="post.id"
    />
</div>
</template>

<script setup>

import Card from './Card.vue'
import {supabase} from '.././supabase'
import {useUserStore} from '../stores/users'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()
const {user} = storeToRefs(userStore)

const posts = ref([])

const fetchData = async () => {
    const {data: following} =  await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', user.value.id)

    const owner_ids = following.map(f =>  f.following_id)

    const data =  await supabase
        .from('posts')
        .select()
        .in('owner_id', owner_ids)

    posts.value = data

    console.log(posts.value)
}

onMounted(()=>{
    fetchData()
})

</script>

<style scoped>
.timeline-container{
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 50px 100px;
    align-items: center;
}
</style>