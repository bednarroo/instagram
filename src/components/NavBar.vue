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
                    <div class="right-content" v-if="isAuthenticated">
                        <AuthModal :isLogin="false"></AuthModal>
                        <AuthModal :isLogin="true"></AuthModal>
                    </div>
                    <div class="right-content" v-else>
                        <AButton type="primary">Profile</AButton>
                        <AButton type="primary">Logout</AButton>
                    </div>
             
            
            </div>
        </Container>


</template>

<script  setup>
import {RouterLink, useRouter} from 'vue-router'
import Container from './Container.vue'
import {ref} from "vue"
import AuthModal from './AuthModal.vue';

const userSearch = ref("")
const router = useRouter()
const isAuthenticated = ref(false)
const onSearch = () => {
    if(userSearch.value){
        router.push(`/profile/${userSearch.value}`)
        userSearch.value=""
    }
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