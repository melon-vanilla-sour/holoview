import * as React from 'react'

import {
  Avatar,
  Badge,
  Box,
  HStack,
  Icon,
  Link,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { GrView } from 'react-icons/gr'

export default function Stream(props) {
  const HOURS_POSITION = 11
  const MINUTES_POSITION = -8
  const SECONDS_POSITION = -5

  const getTimeElapsed = (liveStart) => {
    if (liveStart == null) return
    return new Date(Date.now() - Date.parse(liveStart))
      .toISOString()
      .slice(HOURS_POSITION, SECONDS_POSITION)
  }

  const getTimeToStart = (liveSchedule) => {
    if (liveSchedule == null) return
    return new Date(Date.parse(liveSchedule) - Date.now())
      .toISOString()
      .slice(HOURS_POSITION, MINUTES_POSITION)
  }
  const [timeToStart, setTimeToStart] = React.useState(getTimeToStart(props.stream.live_schedule))
  const [timeElapsed, setTimeElapsed] = React.useState(getTimeElapsed(props.stream.live_start))

  // Update time elapsed each second
  React.useEffect(() => {
    setTimeout(function () {
      setTimeElapsed(getTimeElapsed(props.stream.live_start))
    }, 1000)
  }, [timeElapsed])

  // Update time to start each minute
  React.useEffect(() => {
    setTimeout(function () {
      setTimeToStart(getTimeToStart(props.stream.live_schedule))
    }, 60000)
  }, [timeToStart])

  // slice stream channel name until 'Ch'
  const formatStreamName = (channel_name) => {
    return channel_name.slice(0, Math.max(channel_name.indexOf('Ch'), channel_name.indexOf(' ')))
  }

  // Count live viewers by k
  const formatLiveViewers = (liveViewers) => {
    if (liveViewers.toString().length > 3) {
      return liveViewers / 1000 + 'k'
    } else {
      return liveViewers
    }
  }

  // Format time to start to 'XXH XXM'
  const formatTimeToStart = (timeToStart) => {
    return timeToStart.replace(':', 'h ') + 'm'
  }

  const borderColor = useColorModeValue('grey.600', 'grey.300')

  return (
    <Box>
      <Link isExternal={true} href={'https://www.youtube.com/watch?v=' + props.stream.yt_video_key}>
        <Box
          overflow="hidden"
          border="2px"
          borderRadius="md"
          borderColor={borderColor}
          boxShadow="2xl"
        >
          <Image
            src={'https://i.ytimg.com/vi_webp/' + props.stream.yt_video_key + '/mqdefault.webp'}
            className="stream-thumbnail"
            _hover={{ transform: 'scale(1.1)' }}
            transition="all 0.1s ease-out"
            boxSize="100%"
          />
        </Box>
      </Link>

      <HStack marginY={2}>
        <Link
          isExternal={true}
          href={'https://www.youtube.com/channel/' + props.stream.channel.yt_channel_id}
        >
          <Avatar
            src={props.stream.channel.photo}
            size="sm"
            border="1px"
            box-shadow="1 1 1px transparent"
          />
        </Link>
        <Text noOfLines={2} fontWeight="bold" fontSize="sm" height="3em">
          {props.stream.title}
        </Text>
      </HStack>

      {props.type == 'live' ? (
        // Live Streams
        <HStack justifyContent="space-evenly" marginY={2}>
          <Badge variant="solid" colorScheme="red">
            {timeElapsed}
          </Badge>
          <Badge variant="solid" colorScheme="gray" width="full">
            <Text fontSize="xs" textAlign="center">
              {formatStreamName(props.stream.channel.name)}
            </Text>
          </Badge>
          <Badge variant="solid" colorScheme="blue">
            <HStack spacing={0}>
              <Text whiteSpace="nowrap" fontSize="xs">
                {props.stream.live_viewers == null
                  ? 'Members Only'
                  : formatLiveViewers(props.stream.live_viewers)}
                &ensp;
              </Text>
              <Icon as={GrView} margin={0} />
            </HStack>
          </Badge>
        </HStack>
      ) : (
        // Upcoming Streams
        <HStack justifyContent="space-evenly" marginY={2}>
          <Badge variant="solid" colorScheme="pink">
            <Text whiteSpace="nowrap" fontSize="xs" alignItems="center">
              Starts in {formatTimeToStart(timeToStart)}
            </Text>
          </Badge>
          <Badge variant="solid" colorScheme="gray" width="full">
            <Text fontSize="xs" textAlign="center">
              {formatStreamName(props.stream.channel.name)}
            </Text>
          </Badge>
        </HStack>
      )}
    </Box>
  )
}
