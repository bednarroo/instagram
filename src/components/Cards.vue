<template>
    <div  class="timeline-container">
    <Card 
    v-for="post in posts"
    :post="post"
    :key="post.id"
    />
    <Observer v-if="posts.length" @intersect="fetchNextSet"/>
</div>
</template>

<script setup>

import Card from './Card.vue'
import {supabase} from '.././supabase'
import {useUserStore} from '../stores/users'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import Observer from './Observer.vue'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)
const owner_ids = ref([])
const reachEnd = ref(false)

const posts = ref([])
const lastCardIndex = ref(2)

const fetchData = async () => {
    const {data: following} =  await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', user.value.id)

    owner_ids.value = following.map(f =>  f.following_id)

    const {data} =  await supabase
        .from('posts')
        .select()
        .in('owner_id', owner_ids.value)
        .range(0, lastCardIndex.value)
        .order("created_at", {ascending: false})

    posts.value = data
}

const fetchNextSet = async () => {
    if(!reachEnd.value){
    const {data} =  await supabase
        .from('posts')
        .select()
        .in('owner_id', owner_ids.value)
        .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
        .order("created_at", {ascending: false})

        console.log(data)

        posts.value = [
            ...posts.value,
            ...data
        ]

        lastCardIndex.value = lastCardIndex.value+3

        if(!data.length){
            reachEnd.value = true
        }}
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