<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <PostList :posts="loadedPosts"/>
  </div>
</template>
<script>
import PostList from '@/components/Posts/PostList'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  components: {
      PostList
  },
  computed: {
    ...mapState(['loadedPosts'])
  }
};
</script>

<style scoped>
h1 {
    text-align: center;
}
.intro{
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
}
.intro h1{
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

</style>