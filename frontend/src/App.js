import React from 'react';
import {
  ChakraProvider,
  Flex,
  Box,
  theme
} from '@chakra-ui/react';
import Header from './components/header';
import Home from './pages/home';
import Read from './pages/read'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/style.css'
import Create from './pages/create';
import { extendTheme } from '@chakra-ui/react'

function App() {
  const extendedTheme = extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
          color: '#2d3748',
        }
      }
    }
  })

  return (
    <ChakraProvider
      theme={extendedTheme}
    >
      <BrowserRouter>
        <Box>
          <Header />
          <Flex
            w="100%"
            justifyContent="center"
          >
            <Box
              p={6}
              w="620px"
              maxW="100%"
              boxShadow="lg"
              borderRadius={'2xl'}
            >
              <Routes>
                <Route path="/esiea-delta" element={<Home />} />
                <Route path="/esiea-delta/read" element={<Read />} />
                <Route path="/esiea-delta/create" element={<Create />} />
              </Routes>
            </Box>
          </Flex>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
