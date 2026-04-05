import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  const isOAuthRoute =
    context.url.pathname.includes('/github/oauth/') ||
    context.url.pathname.includes('/github/login')

  if (isOAuthRoute) {
    const forwardedHost = context.request.headers.get('x-forwarded-host')
    const forwardedProto = context.request.headers.get('x-forwarded-proto')

    if (forwardedHost && forwardedProto) {
      const correctedUrl = new URL(context.request.url)
      correctedUrl.protocol = forwardedProto
      correctedUrl.host = forwardedHost
      correctedUrl.port = ''

      context.request = new Request(correctedUrl.toString(), context.request)
    }
  }

  return next()
})
