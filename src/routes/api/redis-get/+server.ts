import { json, type RequestEvent } from '@sveltejs/kit'

// export const myKey = 'my-key'

/** @type {import('./$types').RequestHandler} */
export async function GET (obj: RequestEvent) {

  const { locals } = obj

  return json({
    user: locals.user
  })
}