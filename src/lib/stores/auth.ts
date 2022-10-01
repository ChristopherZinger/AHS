import { readable } from 'svelte/store'
import { auth } from '$lib/firebase'
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import { browser } from '$app/environment'

type appUser = {
  email: string
}

export const appUser = readable<appUser | null | undefined>(undefined, (set) => {
  console.log('appUser store')
  if (browser) {
    onAuthStateChanged(auth, (user) =>
      set(user ? { email: user.email || '' } : null)
    )
  }
})

export const fs_token = readable<string | null | undefined>(undefined, (set) => {
  console.log('fs_token store')
  if (browser) {
    onIdTokenChanged(auth, async (token) =>
      set(token ? await token.getIdToken() : null)
    )
  }
})
