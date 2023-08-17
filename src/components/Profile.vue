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
            />
            <ImageGallery
                :posts="[{
                    id: 1,
                    image: 'https://static.photocdn.pt/images/articles/2018/12/05/articles/2017_8/beginner_photography_mistakes-1.webp',
                },
                {
                    id: 1,
                    image: 'https://static.photocdn.pt/images/articles/2018/12/05/articles/2017_8/beginner_photography_mistakes-1.webp',
                }
                
                ]"
            />
        </div>
        
    </Container>
</template>

<script setup>
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue'
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