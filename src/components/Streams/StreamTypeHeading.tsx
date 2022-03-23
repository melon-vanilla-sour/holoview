import * as React from 'react'

import { Text } from '@chakra-ui/react'
import useStreams from './useStreams'

export default function StreamTypeHeading(props) {
  const { streams, isLoading, isError } = useStreams()
  const type = props.type

  if (streams && streams[type].length > 0) {
    return (
      <Text backgroundColor="#2580FF" bgClip="text" fontSize="lg" fontWeight="bold">
        {/* capitalize */}
        {type[0].toUpperCase() + type.slice(1)}
      </Text>
    )
  }
}
