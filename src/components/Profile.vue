<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar
                :key="$route.params.username"
                :user = "user"
                :userInfo="{
                    posts: 4,
                    followers: 100,
                    following: 342
                }"
                :addNewPost="addNewPost"
                :isFollowing="isFollowing"
            />
            <ImageGallery
                :posts="posts"
            />
        </div>
        <div class="spinner" v-else>
            <ASpinn></ASpinn>
        </div>
        
    </Container>
</template>

<script setup>

import Container from './Container.vue'
import ImageGallery from './ImageGallery.vue'
import UserBar from './UserBar.vue'
import { ref, onMounted, watch } from 'vue'
import {supabase} from '../supabase'
import {useRoute} from 'vue-router'
import {useUserStore} from '../stores/users'
import { storeToRefs } from 'pinia'

const route = useRoute()
const user = ref(null)
const userStore = useUserStore()
const {user: loggedInUser} = storeToRefs(userStore)

const {username} = route.params

const posts = ref([])
const isFollowing = ref(false)
const loading = ref(false)

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async () => {
    loading.value = true
    const {data: userData} = await supabase
        .from('users')
        .select()
        .eq('username', username)
        .single()
        if(!userData){
           loading.value = false
           return user.value = null
        }

        user.value=userData
        fetchIsFollowing()

        const {data: postsData} = await supabase
        .from('posts')
        .select()
        .eq('owner_id', user.value.id)

        posts.value = postsData
        loading.value = false

}

const fetchIsFollowing = async () => {
    if(loggedInUser.value && loggedInUser.value.id !== user.value.id){
    const { data } = await supabase
        .from('followers_following')
        .select()
        .eq('follower_id', loggedInUser.value)
        .eq('following_id', username)
        .single()
        if (data){
            return (isFollowing.value = true)
        } 
    }
}

watch(username, () => {
    console.log(isFollowing.value)
    fetchIsFollowing()
})

onMounted(()=>{
    fetchData()
})

</script>

<style scoped>
.profile-container{
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 100px;
    align-items: center;
}

.spinner{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;

}
</style>