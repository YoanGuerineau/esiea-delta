import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heading,
  Flex,
  Spacer,
  Button
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons"


function Header() {
  const navigate = useNavigate();
	const goToCreateArticle = useCallback(() => navigate('/esiea-delta/create', { state: false, replace: true }), [navigate])
  const goToHomePage = useCallback(() => navigate('/esiea-delta', { replace: true }), [navigate]);


  return (
    <Flex
      as="nav"
      position="sticky"
      top="0"
      padding={6}
      justifyContent="center"
      w="100%"
      align="center"
      background="linear-gradient(#fff, rgba(255,255,255,0));"
    >
      <Flex
        w="1024px"
        maxW="1024px"
      >
        <Button
          marginRight="2"
          w="10"
          bg="#2D3748"
          color="white"
          fontSize="7xl"
          onClick={goToHomePage}
          _focus={{
            outline: "none"
          }}
        >
          Δ
        </Button>
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
        >
          <Link to="/esiea-delta">Delta</Link>
        </Heading>
        <Spacer />
        <Button
          colorScheme={"gray"}
          leftIcon={<EditIcon />}
          variant="outline"
          borderRadius='full'
          onClick={goToCreateArticle}
        >
          Écrire un article
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
