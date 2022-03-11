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
      color="black"
      backgroundColor="white"
      borderBottomWidth={1}
      borderBottomColor={"blackAlpha.200"}
      {...props}
    >
      <Flex
        w="1024px"
        maxW="1024px"
      >
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
        >
          <NavLink
            to="/"
          >
            Δ Delta
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
