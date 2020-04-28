<template>
  <div class="single-post-page">
    <section>
      <h1 class="post-title">
        {{ loadedPost.title }}
      </h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on{{ loadedPost.updatedDate }}
        </div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">
        {{ loadedPost.content }}
      </p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know what you think about the post, send a mail to
        <a href="feedback@my-content-page">feedback@my-content-page</a>
      </p>
    </section>
  </div>
</template>
<script>
import axios from "axios"
export default {
  asyncData(context) {
    return axios
      .get(
        "https://nuxt-app-779f8.firebaseio.com/post/" +
          context.params.id +
          ".json"
      )
      .then((res) => {
        return {
          loadedPost: res.data,
        }
      })
      .catch((e) => context.error(e))
  },
}
</script>
w w
<style scoped></style>
