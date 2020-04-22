<template>
    <div class="admin-post-page">
    <section class="update-form">
    <AdminPostForm :post="loadedPost"/>
    </section>
    </div>
</template>
<script>
export default {
    layout: 'admin',
    components: {
        AdminPostForm
    },
    data() {
        return {
            loadedPost: {
                author: 'Maximilian',
                title: 'My awesome Post',
                content: 'Super amazing, htanks for that!'
            }
        }
    }
}
</script>