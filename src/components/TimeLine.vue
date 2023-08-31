<template>
    <Container>
        <div v-if="user" class="timeline-container">
            <Card 
             v-for="post in data"
             :post="post"
             :key="post.id"
             />
        </div>
        <div v-else class="timeline-container">
            <h3>Log in to see posts</h3>
        </div>
        
    </Container>
</template>

<script setup>
import Card from "./Card.vue";
import Container from "./Container.vue";
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia";

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const data = [
    {id: 1,
    name: 'something',
    url: 'https://static.photocdn.pt/images/articles/2018/12/05/articles/2017_8/beginner_photography_mistakes-1.webp',
    caption: ""},
    {id: 2,
    name: 'something2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhtmBqlJilp6X2q2XsYxJ9DVYb_F8x17DjIOJcHtT&s',
    caption: "to jest caption"
},

]

</script>

<style scoped>
.timeline-container{
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 100px;
    align-items: center;
}
</style>