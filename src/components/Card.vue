<template>
    <ACard hoverable style="width: 240px" class="card">
      <template #cover>
        <img alt="example" :src="`https://vfxbeefgfhemwvzdsabt.supabase.co/storage/v1/object/public/images/${post.url}`" />
      </template>
      <ACardMeta  :title="post.name">
        <template #description>{{post.caption}}</template>
      </ACardMeta>
    </ACard>
  </template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps(['post'])
</script>

<style>
.card{
    margin-bottom: 20px;
}
</style>
  
  
  