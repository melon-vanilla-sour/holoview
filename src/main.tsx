import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import theme from './theme'

import Body from './components/Body'
import Header from './components/Header'

class App extends React.Component {
  render() {
    return (
      <ChakraProvider>
        <Container maxW="container.xl">
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Header />
          <Body />
        </Container>
      </ChakraProvider>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
