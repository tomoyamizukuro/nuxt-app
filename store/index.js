import axios from "axios"
import firebase from "@/plugins/firebase"
import Cookie from "js-cookie"

export const state = () => ({
  loadedPosts: [],
  token: "",
})
export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts
  },
  addPost(state, post) {
    state.loadedPosts.push(post)
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      (post) => post.id === editedPost.id
    )
    state.loadedPosts[postIndex] = editedPost
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
}
export const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get("https://nuxt-app-779f8.firebaseio.com/post.json")
      .then((res) => {
        const postsArray = []
        for (const key in res.data) {
          postsArray.push({ ...res.data[key], id: key })
        }
        vuexContext.commit("setPosts", postsArray)
      })
      .catch((e) => context.error(e))
  },
  addPost(vuexContext, postData) {
    const createdPost = {
      ...postData,
      updatedDate: new Date(),
    }
    return axios
      .post("https://nuxt-app-779f8.firebaseio.com/post.json", createdPost)
      .then((result) =>
        vuexContext.commit("addPost", { ...createdPost, id: result.data.name })
      )
      .catch((e) => console.log(e))
  },
  editPost(vuexContext, editedPost) {
    console.log("TOKEN")
    console.log(vuexContext.state.token)

    return axios
      .put(
        "https://nuxt-app-779f8.firebaseio.com/post/" +
          editedPost.id +
          ".json?auth=" +
          vuexContext.state.token,
        editedPost
      )
      .then((res) => vuexContext.commit("editPost", editedPost))
      .catch((e) => console.log(e))
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit("setPosts", posts)
  },
  async authenticateUser(vuexContext, authData) {
    try {
      const firebaseUser = authData.isLogin
        ? await firebase
            .auth()
            .signInWithEmailAndPassword(authData.email, authData.password)
        : await firebase
            .auth()
            .createUserWithEmailAndPassword(authData.email, authData.password)
      console.log("SUCCESS")
      console.log(firebaseUser)
      try {
        const token = await firebase.auth().currentUser.getIdToken(true)
        // 認証情報として利用するログイン済のユーザーのトークンをstoreに保存する
        vuexContext.commit("setToken", token)
        localStorage.setItem("token", token)
        // ローカルストレージにトークンの有効期限を保存する
        // localStorage.setItem('tokenExpiration',tokenExpiratin)
        Cookie.set("jwt", token)
        // Cookie.set('expirationDate', new Date().getTime() + )
        // return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated'})
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  },
  setLogoutTimer(vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit("clearToken")
    }, duration)
  },
  initAuth(vuexContext, req) {
    if (process.server) {
      if (!req.headers.cookie) {
        return
      }
      console.log("cookie")
      console.log(req.headers.cookie)
      try {
        const jwtCookie = req.headers.cookie
          .split(";")
          .find((c) => c.trim().startsWith("jwt="))
        if (!jwtCookie) {
          return
        }
        const token = jwtCookie.split("=")[1]
        const expirationDate = req.headers.cookie
          .split(";")
          .find((c) => c.trim().startsWith("expirationDate="))
          .split("=")[1]
        if (!expirationDate) {
          console.log("No token or invalid token")
          vuexContext.commit("logout")
          return
        }
      } catch (error) {
        console.log("Error")
        console.log(error)
      }
    } else {
      const token = localStorage.getItem("token")
      const expirationDate = localStorage.getItem("tokenExpiration")
      if (new Date() > expirationDate || !token) {
        return
      }
    }
    // vuexContext.dispatch{"setLogoutTimer",}
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken")
    Cookie.remove("jwt")
    // Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiration")
    }
  },
}
export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  token(state) {
    return state.token
  },
  isAuthenticated(state) {
    return state.token !== null
  },
}
