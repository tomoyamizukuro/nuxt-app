<template>
    <section class="post-list">
        <PostPreview
            id="1"
            :is-admin="isAdmin"
            thumbnail=""
            title="Hello there!"
            previewText="this is my first post!"/>
        <PostPreview
            id="2"
            :is-admin="isAdmin"
            thumbnail=""
            title="Hello there 2 !"
            previewText="this is my first post!"/>
        <PostPreview
            id="3"
            :is-admin="isAdmin"
            thumbnail=""
            title="Hello there 3!"
            previewText="this is my first post!"/>
        <PostPreview
            id="4"
            :is-admin="isAdmin"
            thumbnail=""
            title="Hello there 4!"
            previewText="this is my first post!"/>
        <PostPreview
            id="5"
            :is-admin="isAdmin"
            thumbnail=""
            title="Hello there!"
            previewText="this is my first post!"/>
        <PostPreview
            id="6"
            :is-admin="isAdmin"
            thumbnail=""
            title="Hello there!"
            previewText="this is my first post!"/>
    </section>
</template>
<script>
import PostPreview from '@/components/Posts/PostPreview'
export default {
    components: {
        PostPreview
    },
    props: {
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>
