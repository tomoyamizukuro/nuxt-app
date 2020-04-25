<template>
    <div class="posts-page">
    <PostList :posts="loadedPosts"/>
    </div>
</template>
<script>
import PostList from '@/components/Posts/PostList'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    middleware: 'log',
    components: {
        PostList
    },
    computed: {
        ...mapState(['loadedPosts'])
    }
}
</script>
<style scoped>
.posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>