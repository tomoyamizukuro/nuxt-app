export default function (context) {
  console.log("[Middleware] The Check-auth Middleware is running")
  context.store.dispatch("initAuth", context.req)
}
