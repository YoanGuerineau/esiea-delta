import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  VStack,
  IconButton,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Divider
} from "@chakra-ui/react";
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'

function Create() {
  const colors = ['orange', 'blue', 'cyan', 'facebook', 'gray', 'green', 'linkedin', 'messenger', 'blackAlpha', 'pink', 'purple', 'red', 'teal', 'telegram', 'twitter', 'whatsapp', 'whiteAlpha', 'yellow']
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate('/', { replace: true }), [navigate]);

  // States
  const [markedContent, setMarkedContent] = useState('');
  const [categories, setCategories] = useState([])
  const [addedCategories, setAddedCategories] = useState([])

  // Effects
  useEffect(() => {
    fetch('http://localhost:8080/api/private/category')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
      .catch(e => console.log(e.toString()));
  }, [])

  // Add category to the article
  function addCategory(id) {
    if (!addedCategories.some(el => el.id === Number(id))) {
      let theCategory = categories.find(el => el.id === Number(id))
      if (theCategory !== undefined) {
        setAddedCategories((prevState) => {
          return [
            ...prevState,
            theCategory
          ]
        })
      }
    }
  }

  return (
    <Box>
      <VStack spacing={8}>
        <Flex
          w="100%"
          alignItems="center"
        >
          <IconButton
            isRound={true}
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={handleOnClick}
          />
          <Divider orientation='vertical' height={4} px="2" />
          <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleOnClick}>Accueil</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Heading m={2}>Écrire un article</Heading>
        <FormControl isRequired m="2" w="100%">
          <VStack spacing={2} align="flex-start">
            <FormLabel htmlFor='text'>Ajouter une catégorie</FormLabel>
            <Select placeholder='Catégories existantes' onChange={(event) => { addCategory(event.target.value) }}>
              {
                categories.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)
              }
            </Select>
            <Input type='text' placeholder='Créer une catégorie' />
            <HStack spacing={4}>
              {
                addedCategories.map((el, index) =>
                  <Tag
                    key={el.id}
                    size="md"
                    borderRadius='full'
                    variant="outline"
                    colorScheme={colors[index % 18]}
                    fontWeight="bold"
                  >
                    <TagLabel>{el.name}</TagLabel>
                    <TagCloseButton />
                  </Tag>
                )
              }
            </HStack>
            <Box h={4} />
            <FormLabel htmlFor='text'>Titre</FormLabel>
            <Input type='text' />
            <Box h={4} />
            <FormLabel htmlFor='text'>Contenu</FormLabel>
            <Textarea
              placeholder='Écrire un article au format Markdown'
              size='sm'
              onChange={(event) => { setMarkedContent(event.target.value) }}
            />
            <Box h={4} />
            <FormLabel htmlFor='text'>Auteur</FormLabel>
            <Input type='text' />
          </VStack>
        </FormControl>
        <Button>Envoyer</Button>
        <Box h={4} />
        <Accordion w="100%" allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Aperçu
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <ReactMarkdown components={ChakraUIRenderer()} children={markedContent} skipHtml />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
}

export default Create;