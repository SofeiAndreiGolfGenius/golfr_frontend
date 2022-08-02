import useSWR from 'swr'
import { getToken } from './userAuth'
export const FEED_URL = `${process.env.NEXT_PUBLIC_API_URL}/feed`
const useUserInfo = golferId => {
  const USER_NAME_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${golferId}`
  const USER_SCORES_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${golferId}/scores`
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(url === USER_NAME_URL ? data => data.name : data => data.scores)
  }

  const { data: name, error: nameError } = useSWR(golferId ? USER_NAME_URL : null, fetcher)
  const { data: scores, error: scoreError } = useSWR(golferId ? USER_SCORES_URL : null, fetcher)
  return {
    name: name,
    scores: scores,
    error1: nameError && nameError.message,
    error2: scoreError && scoreError.message,
  }
}

export default useUserInfo
