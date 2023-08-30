<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar
                :key="username"
                :user = "user"
                :userInfo="userInfo"
                :addNewPost="addNewPost"
                :isFollowing="isFollowing"
                @changeOption="changeOption"
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
const userInfo = ref({})
const userStore = useUserStore()
const {user: loggedInUser} = storeToRefs(userStore)
const changeOption = () => {
    isFollowing.value  = !isFollowing.value
}

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
        
        const {data: postsData} = await supabase
        .from('posts')
        .select()
        .eq('owner_id', user.value.id)

        posts.value = postsData
        await fetchIsFollowing()
        userInfo.value.posts = posts.value.length
        userInfo.value.followers = await followerNumber()
        userInfo.value.following = await followersNumber()
        loading.value = false

}

const fetchIsFollowing = async () => {
    if(loggedInUser.value && (loggedInUser.value.id !== user.value.id)){
    const { data} = await supabase
        .from('followers_following')
        .select()
        .eq('follower_id', loggedInUser.value.id)
        .eq('following_id', user.value.id)
        .single()
        if (data){
            return (isFollowing.value = true)
        } 
    }
}

const followersNumber = async () => {
    const response = await supabase
    .from('followers_following')
    .select('*', { count: 'exact' })
    .eq('following_id', user.value.id)
    return response.data.length
}
const followerNumber = async () => {
    const response = await supabase
    .from('followers_following')
    .select('*', { count: 'exact' })
    .eq('follower_id', user.value.id)
    return response.data.length
}

watch(username, () => {
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