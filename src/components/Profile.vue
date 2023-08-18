<template>
    <Container>
        <div class="profile-container">
            <UserBar
                :key="$route.params.username"
                username= 'sdadas'
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
        
    </Container>
</template>

<script setup>

import Container from './Container.vue'
import ImageGallery from './ImageGallery.vue'
import UserBar from './UserBar.vue'
import { ref } from 'vue'

const posts = ref([])

const addNewPost = (post) => {
    posts.value.unshift(post)
}


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
</style>