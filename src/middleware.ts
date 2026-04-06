// this is a hack due to a bug in Keystatic.
// Keystatic writes the x-forwarded-host headers as localhost,
// instead of any predefine address with env variables.
// this creates a problem since GitHub expects a correct address.
// This middleware thus changes the below headers with context.request.url
// thus correcting the localhost error, so that GitHub login workflow can work.
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
