<template>
      <Container>
        
                <div class="nav-container">
                    <div class=" left-content">
                        <RouterLink to="/" key="Instagram"> Instagram</RouterLink>
                        <AInputSearch
                        v-model:value="userSearch"
                        placeholder="Search user"
                        style="width: 200px"
                        @search="onSearch"
                         />
                    </div>
                   
                    <div v-if="!loadingUser">
                        <div class="right-content" v-if="!user">
                        <AuthModal :isLogin="false"></AuthModal>
                        <AuthModal :isLogin="true"></AuthModal>
                    </div>
                    <div class="right-content" v-else>
                        <AButton @click="goToUserProfile" type="primary">Profile</AButton>
                        <AButton @click="handleLogout" type="primary">Logout</AButton>
                    </div>
                    </div>
            </div>
        </Container>
</template>

<script  setup>
import {RouterLink, useRouter} from 'vue-router'
import Container from './Container.vue'
import {ref} from "vue"
import AuthModal from './AuthModal.vue';
import {useUserStore} from '../stores/users'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const userSearch = ref("")


const {user} = storeToRefs(userStore)
const router = useRouter()
// const isAuthenticated = ref(false)
const onSearch = () => {
    if(userSearch.value){
        router.push(`/profile/${userSearch.value}`)
        userSearch.value=""
    }
}

const handleLogout = async () => {
    await userStore.handleLogout()
}

const goToUserProfile = () => {
    router.push(`/profile/${user.value.username}`)
}



</script>
<style scoped>

.nav-container{
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    width: 1000px;
}
.left-content, .right-content{
    display: flex;
    align-items: center;
}

.left-content a {
    margin-right: 10px;
    font-size: 30px;
    text-decoration: none;
    color: #4096ff;
}

.right-content button{
    margin: 0 10px;
}

</style>