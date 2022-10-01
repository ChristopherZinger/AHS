/** @type {import('./$types').RequestHandler} */
import { redis } from '$lib/redis'


export async function GET () {

  return new Response(String('test response'))
}