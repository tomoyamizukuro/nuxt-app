<template>
    <div class="admin-page">
       <section class="new-post">
            <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
       </section>
       <section class="existing-posts">
            <h1>Existing Posts</h1>
            <PostList
                :isAdmin="true"
                :posts="loadedPosts" />
       </section>
    </div>
</template>
<script>
import PostList from '@/components/Posts/PostList'
import AppButton from '@/components/UI/AppButton'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    layouts: 'admin',
    middleware: ['auth'],
    components: {
        PostList,
        AppButton
    },
    computed: {
    ...mapState(['loadedPosts'])
    }
}
</script>
<style scoped>
h1 {
    text-align: center;
}
.admin-page{
    padding: 20px
}
.new-post{
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
}
.existing-post h1{
    text-align: center;
}
</style>
