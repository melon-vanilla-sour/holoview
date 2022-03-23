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

import StreamGrid from './Streams/StreamGrid'

export default function Streams() {
  const [sortType, setSortType] = React.useState('viewers')

  return (
    <Box>
      <StreamGrid
        onSortTypeChange={(e) => {
          if (e.target.value == 'viewers') {
            setSortType('viewers')
          } else {
            setSortType('timeElapsed')
          }
        }}
        type="live"
        sortType={sortType}
      />
      <Divider />
      <StreamGrid type="upcoming" />
    </Box>
  )
}
