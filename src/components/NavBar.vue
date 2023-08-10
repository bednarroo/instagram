<template>
      <Container>
                <div class="nav-container">
                    <div class="right-content">
                        <RouterLink to="/" key="Instagram"> Instagram</RouterLink>
                        <AInputSearch
                        v-model:value="userSearch"
                        placeholder="Search user"
                        style="width: 200px"
                        @search="onSearch"
                         />
                    </div>
                    <div class="left-content">
                        <AButton type="primary">Signup</AButton>
                        <AButton type="primary">Signin</AButton>
                    </div>
             
            
            </div>
        </Container>


</template>

<script  setup>
import {RouterLink} from 'vue-router'
import Container from './Container.vue'
import {ref} from "vue"

const userSearch = ref("");
const onSearch = () => {

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
.right-content{
    display: flex;
    align-items: center;
}

.right-content a {
    margin-right: 10px;
    font-size: 30px;
    text-decoration: none;
    color: #4096ff;
}
.left-content button {
    margin-left: 10px;
}


</style>