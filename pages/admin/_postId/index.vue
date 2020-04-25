<template>
    <div class="admin-post-page">
    <section class="update-form">
    <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
    </div>
</template>
<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    layouts: 'admin',
    middleware: ['auth'],
    components: {
        AdminPostForm
    },
    asyncData(context) {
        return axios.get('https://nuxt-app-779f8.firebaseio.com/post/' + context.params.postId + '.json')
        .then(res => {
            return {
                loadedPost: {...res.data, id: context.params.postId }
            }
        })
        .catch(e =>
            context.error(e)
        )
    },
    methods: {
        onSubmitted(editedPost){
            this.$store.dispatch('editPost', editedPost).then(() => {
                this.$router.push('/admin')
            })
        }
    }
}
</script>