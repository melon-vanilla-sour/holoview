import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useStreams() {
  const { data, error } = useSWR(
    'https://api.holotools.app/v1/live?max_upcoming_hours=48&hide_channel_desc=1',
    fetcher
  )

  return {
    streams: data,
    isLoading: !error && !data,
    isError: error,
  }
}
