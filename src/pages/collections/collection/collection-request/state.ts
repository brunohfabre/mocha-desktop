import type { AxiosResponse } from 'axios'
import { atom } from 'jotai'

export const controller = new AbortController()

export const loadingAtom = atom(false)

export const responsesAtom = atom<
  Record<
    string,
    {
      response: AxiosResponse | null
      time: number
    }
  >
>({})
