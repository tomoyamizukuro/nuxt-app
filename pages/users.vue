<template>
    <div>
        <h1>This is users page</h1>
        <div>
            <input type="text" v-model='userId'>
            <button @click="onLoadUser">Load User</button>
            <nuxt-child/>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userId: ''
        }
    },
    methods: {
        onLoadUser(){
            this.$router.push( '/users/' + this.userId)
        }
    },
    layout: 'default'
}
</script>