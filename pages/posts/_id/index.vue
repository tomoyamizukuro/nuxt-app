<template>
    <div class="single-post-page">
        <section>
            <h1 class="post-title">{{ loadedPost.title }}</h1>
            <div class="post-details">
                <div class="post-detail">Last updated on{{ loadedPost.updatedDate }}</div>
                <div class="post-detail">Written by {{ loadedPost.author }}</div>
            </div>
            <p class="post-content">{{ loadedPost.content }}</p>
        </section>
        <section class="post-feedback">
            <p>Let me know what you think about the post, send a mail to <a href="feedback@my-content-page">feedback@my-content-page</a></p>
        </section>
    </div>
</template>
<script>
export default {
    asyncData(context, callback) {
        setTimeout(() => {
            callback(null, {
                loadedPost:
                    {
                    id: 1,
                    title: "first post (ID: " + context.route.params.id + ")",
                    previewText: "this is my first post",
                    author: 'Tomoya',
                    updatedDate: new Date(),
                    content: 'Some dummy text hiwch is definitely not the preview ',
                    thumbnail: ""
                }
            });
        },500)
    }
}
</script>
 w w
<style scoped>

</style>