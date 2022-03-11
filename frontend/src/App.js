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

function App() {
  return (
    <ChakraProvider
      theme={theme}
    >
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
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/read" element={<Read />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
