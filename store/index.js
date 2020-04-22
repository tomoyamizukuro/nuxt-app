import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts){
                state.loadedPosts = posts
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context){
                return new Promise((resolve, reject) => {
                setTimeout(() => {
                    vuexContext.commit("setPosts", [
                    {
                    id: 1,
                    title: "first post",
                    previewText: "this is my first post",
                    thumbnail: ""
                    },
                    {
                    id: 2,
                    title: "second post",
                    previewText: "this is my first post",
                    thumbnail: ""
                    },
                    {
                    id: 3,
                    title: "third post",
                    previewText: "this is my first post",
                    thumbnail: ""
                    },
                    {
                    id: 4,
                    title: "fourth post",
                    previewText: "this is my first post",
                    thumbnail: ""
                    },
                    {
                    id: 5,
                    title: "fifth post",
                    previewText: "this is my first post",
                    thumbnail: ""
                    }
                ])
                resolve();
                }, 500)
                });
            },
            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore