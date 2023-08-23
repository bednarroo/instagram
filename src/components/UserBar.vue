<template>
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <ATypographyTitle :level="2">{{props.username}}</ATypographyTitle>
            <UploadPhotoModal 
                v-if="users && profileUsername === users.username"
                :addNewPost="addNew"
                >
            </UploadPhotoModal>
        </div>
        <div class="bottom-content">
            <ATypographyTitle :level="5">{{props.userInfo.posts}} posts</ATypographyTitle>
            <ATypographyTitle :level="5">{{props.userInfo.followers}} followers</ATypographyTitle>
            <ATypographyTitle :level="5">{{props.userInfo.following}} following</ATypographyTitle>
        </div>
    </div>
    <div class="userbar-container" v-else>
        <div class="top-content">
            <ATypographyTitle :level="2">User not found</ATypographyTitle>
        </div>
    </div>
</template>

<script setup>
import {defineProps, onMounted} from 'vue'
import UploadPhotoModal from './UploadPhotoModal.vue'
import { useRoute } from 'vue-router'
import {useUserStore} from '../stores/users'
import { storeToRefs } from 'pinia'

const props = defineProps(['user','username', 'userInfo'])
const route = useRoute()
const userStore = useUserStore()
const {user: users} = storeToRefs(userStore)

const {username: profileUsername} = route.params

onMounted(()=>{
    console.log(users)
})

</script>

<style scoped>

.top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.userbar-container{
    display: flex;
    padding-bottom: 75px;
    flex-direction: row-reverse;
}

.bottom-content{
    display: flex;
    align-items: center;
    
}
.bottom-content h5{
    margin: 0;
    padding: 0;
    margin-right: 30px;
}
</style>