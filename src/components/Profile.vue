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
import { ref, onMounted } from 'vue'
import {supabase} from '../supabase'
import {useRoute} from 'vue-router'

const route = useRoute()
const user = ref(null)

const {username} = route.params

const posts = ref([])
const loading = ref(false)

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async () => {
    loading.value = true
    console.log(username)
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
        loading.value = false

}

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