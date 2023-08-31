<template>
    <Container>
        <div v-if="!loadingUser" style="width: 100%;" >
            <Cards v-if="user"/>
            <LogInMessage v-else/>
        </div>
        <div v-else >
            <ASpin  class="spinner"/>
        </div>
    </Container>
</template>

<script setup>
import Cards from "./Cards.vue"
import LogInMessage from "./LogInMessage.vue"
import Container from "./Container.vue";
import {useUserStore} from "../stores/users"
import { storeToRefs } from "pinia";

const userStore = useUserStore()

const { user, loadingUser } = storeToRefs(userStore)

</script>

<style>

.spinner{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40vh;
}
</style>