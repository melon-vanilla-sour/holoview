import * as React from 'react'

import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'

import { MdOutlineDarkMode } from 'react-icons/md'
import { MdOutlineLightMode } from 'react-icons/md'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack>
      <Text
        bgGradient="linear(to-l, #36F3FF, #2580FF)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        w="full"
      >
        HoloView
      </Text>
      <IconButton
        aria-label="toggle-dark-mode"
        icon={
          colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />
        }
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </IconButton>
    </HStack>
  )
}
