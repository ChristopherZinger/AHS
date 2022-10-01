import { FS_TOKEN_BEARER_KEY } from '$lib/constants'
import { redis } from '$lib/redis'
import { firestoreAdminAuth } from '$lib/server/firebase-admin'
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit'
import type { MaybePromise } from '@sveltejs/kit/types/private'
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle ({ event, resolve }: {
  event: RequestEvent & { locals: Record<string, unknown> },
  resolve (event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>
}) {
  const token = event.request.headers.get(FS_TOKEN_BEARER_KEY)
  if (token) {
    const cachedUser = await getCachedUserSession(token)
    if (cachedUser) {
      event.locals.user = cachedUser
    } else {
      let user: undefined | DecodedIdToken
      try {
        user = await firestoreAdminAuth.verifyIdToken(token)
        await saveUserSessionInCache(token, user)
        event.locals.user = user
      } catch (err) {
        const msg = typeof err === 'object' && (err as any).code === 'auth/id-token-revoked'
          ? 'token revoked'
          : 'invalid token'
        return new Response(msg, { status: 403 })
      }
    }
  }

  return await resolve(event)
}

const getRedisUserSessionTokenKey = (token: string): string => 'user-session-token_' + token

const getCachedUserSession = async (token: string): Promise<string | null> => {
  const cachedUser = await redis.GET(getRedisUserSessionTokenKey(token))
  return cachedUser ? JSON.parse(cachedUser) : null
}

const saveUserSessionInCache = async (token: string, decodedToken: DecodedIdToken): Promise<void> => {
  await redis.SET(getRedisUserSessionTokenKey(token), JSON.stringify(decodedToken), {
    EXAT: decodedToken.exp
  })
}

