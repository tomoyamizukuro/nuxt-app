import axios from 'axios'
import firebase from '@/plugins/firebase'

export const state = () =>  ({
    loadedPosts: [],
    token:''
});
export const mutations =  {
    setPosts(state, posts){
        state.loadedPosts = posts
    },
    addPost(state, post){
        state.loadedPosts.push(post)
    },
    editPost(state, editedPost){
        const postIndex = state.loadedPosts.findIndex(
            post => post.id === editedPost.id);
            state.loadedPosts[postIndex] = editedPost
    },
    setToken(state, token){
        state.token = token
    },
    clearToken(state){
        state.token = null;
    }
}
export const actions = {
    nuxtServerInit(vuexContext, context){
        return axios.get('https://nuxt-app-779f8.firebaseio.com/post.json')
        .then(res => {
            const postsArray = []
            for ( const key in res.data) {
                postsArray.push({ ...res.data[key], id: key})
            }
            vuexContext.commit('setPosts', postsArray)
        })
        .catch(e => context.error(e))
    },
    addPost(vuexContext, postData){
        const createdPost = {
            ...postData,
            updatedDate: new Date()
        }
        return axios
        .post('https://nuxt-app-779f8.firebaseio.com/post.json',createdPost)
        .then(result =>
            vuexContext.commit('addPost', {...createdPost, id: result.data.name}))
        .catch(e => console.log(e))
    },
    editPost(vuexContext, editedPost){
        console.log('TOKEN');
        console.log(vuexContext.state.token);

        return axios.put('https://nuxt-app-779f8.firebaseio.com/post/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
        .then(res =>
            vuexContext.commit('editPost', editedPost))
        .catch(e => console.log(e))
    },
    setPosts(vuexContext, posts){
        vuexContext.commit('setPosts', posts)
    },
    authenticateUser(vuexContext, authData) {
        const authFunc = authData.isLogin ? firebase.auth().signInWithEmailAndPassword(authData.email, authData.password) : firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password) ;
        authFunc
        .then(result => {
            console.log('SUCCESS')
            console.log(result)
            firebase.auth().currentUser.getIdToken(true)
                .then((result) => {
                    vuexContext.commit('setToken', result)
                })
                .catch((e) => {
                    console.log(e)
                })
            // vuexContext.dispatch('setLogoutTimer', )
        })
        .catch(e => console.log(e))
    },
    setLogoutTimer(vuexContext,duration){
        setTimeout(() => {
            vuexContext.commit('clearToken')
        }, duration)
    }
}
export const getters =  {
    loadedPosts(state) {
        return state.loadedPosts
    },
    isAuthenticated(state){
        return state.token != null
    }
}