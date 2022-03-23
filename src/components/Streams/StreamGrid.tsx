import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import {
  Box,
  Select,
  Image,
  Text,
  HStack,
  Divider,
  Avatar,
  Link,
  Badge,
  useColorMode,
  IconButton,
} from '@chakra-ui/react'

import { GrRefresh } from 'react-icons/gr'

import StreamTypeHeading from './StreamTypeHeading'
import Stream from './Stream'
import useStreams from './useStreams'
import { mutate } from 'swr'

export default function StreamGrid(props) {
  const type = props.type
  let { streams, isLoading, isError } = useStreams()
  if (isError) return <div>failed to load</div>
  if (!streams) return <div>loading...</div>
  streams = streams[type]
  const sortType = props.sortType

  const sortStreamsByViewers = (streams) => {
    return streams.sort((a, b) => {
      return b.live_viewers - a.live_viewers
    })
  }

  const sortStreamsByTimeProximity = (streams) => {
    return streams.sort((a, b) => {
      return Date.parse(a.live_schedule) - Date.parse(b.live_schedule)
    })
  }

  const sortStreamsByTimeElapsed = (streams) => {
    return streams.sort((a, b) => {
      return Date.parse(a.live_start) - Date.parse(b.live_start)
    })
  }

  let sortedStreams
  if (type == 'live' && sortType == 'viewers') {
    sortedStreams = sortStreamsByViewers(streams)
  } else if (sortType == 'timeElapsed') {
    sortedStreams = sortStreamsByTimeElapsed(streams)
  } else {
    // upcoming
    sortedStreams = sortStreamsByTimeProximity(streams)
  }

  const filterFreeTalks = (streams) => {
    // Free talks only occur in live streams
    if (type != 'live') return streams

    // Free talks don't have a live_start property
    return streams.filter((stream) => {
      return stream.live_start != null
    })
  }

  const filteredStreams = filterFreeTalks(sortedStreams)

  return (
    <Box marginY={2}>
      <HStack>
        <Box width="full">
          <StreamTypeHeading streams={streams} type={type} width="full"></StreamTypeHeading>
        </Box>
        {type == 'live' ? (
          <HStack>
            <Text whiteSpace="nowrap">Sort by</Text>
            <Select width="120px" onChange={props.onSortTypeChange}>
              <option value="viewers">Viewers</option>
              <option value="timeElapsed">Time Elapsed</option>
            </Select>
            {/* <Text whiteSpace="nowrap">Reload Videos</Text>
            <IconButton
              aria-label="reload"
              onClick={() => {
                mutate(
                  'https://api.holotools.app/v1/live?max_upcoming_hours=48&hide_channel_desc=1'
                )
              }}
            >
              <GrRefresh />
            </IconButton> */}
          </HStack>
        ) : null}
      </HStack>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} marginY={2}>
        {filteredStreams.map((stream) => {
          return <Stream stream={stream} type={type} key={stream.id}></Stream>
        })}
      </SimpleGrid>
    </Box>
  )
}
