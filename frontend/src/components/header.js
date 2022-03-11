import React from "react";
import {
  Heading,
  Flex,
  Spacer,
  Button
} from "@chakra-ui/react";
import { BrowserRouter as NavLink } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons"


const Header = (props) => {
  return (
    <Flex
      as="nav"
      position="sticky"
      top="0"
      padding={6}
      justifyContent="center"
      w="100%"
      align="center"
      {...props}
      background="linear-gradient(#fff, rgba(255,255,255,0));"
    >
      <Flex
        w="1024px"
        maxW="1024px"
      >
        <Button
        marginRight="2"
          size="md"
          w="12"
          bg="black"
          color="white"
          fontSize="7xl"
        >
          Δ
        </Button>
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
        >
          <NavLink
            to="/"
          >
            Delta
          </NavLink>
        </Heading>
        <Spacer />
        <Button
          colorScheme={"gray"}
          leftIcon={<EditIcon />}
          variant="outline"
          borderRadius='full'
        >
          Écrire un article
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
