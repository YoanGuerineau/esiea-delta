import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  VStack,
  IconButton,
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Divider,
  useToast
} from "@chakra-ui/react";
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'


function Create() {
  const toast = useToast()
  const colors = ['orange', 'blue', 'cyan', 'facebook', 'gray', 'green', 'linkedin', 'messenger', 'blackAlpha', 'pink', 'purple', 'red', 'teal', 'telegram', 'twitter', 'whatsapp', 'whiteAlpha', 'yellow']
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [markedContent, setMarkedContent] = useState('');
  const [allCategories, setAllCategories] = useState([])
  const [addedCategories, setAddedCategories] = useState([])
  const [newCategories, setNewCategories] = useState([])

  // Effects
  useEffect(() => {
    fetch('http://localhost:8080/api/private/category')
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data)
      })
      .catch((e) => {
        toast({
          title: e.toString(),
          description: "Impossible de récupérer les catrégories depuis le serveur",
          status: 'error',
          isClosable: true,
        })
      })
  }, [])

  // Add category to the article
  function addCategory(id) {
    if (!addedCategories.some(el => el.id === Number(id))) {  // Check if not already added
      let theCategory = allCategories.find(el => el.id === Number(id))  // Get the category from his 'id'
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

  function createNewCategory(event) {
    if (event.key === "Enter") {
      const newCategory = { "name": event.target.value }

      // Check if the category already exist and had not already been added in newCategories
      if (!allCategories.some(el => el.name === newCategory.name) && !newCategories.some(el => el.name === newCategory.name)) {
        setNewCategories([...newCategories, newCategory])
      }
      // Clear the input
      event.target.value = ''
    }
  }

  function sendArticle() {
    // Firstly send new categories
    newCategories.forEach((category, index) => {
      fetch('http://localhost:8080/api/private/category', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: category.name
        })
      })
        .then((res) => res.json())
        .then((data) => {
          // Add id to category list
          newCategories[index]['id'] = data.id
        })
        .catch((e) => {
          toast({
            title: e.toString(),
            description: "Impossible de créer le(s) nouvelle(s) catégorie(s)",
            status: 'error',
            isClosable: true,
          })
        })
    })

    // Secondly send article data
    const today = new Date()
    fetch('http://localhost:8080/api/private/article', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        author,
        date: today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDay()).slice(-2),
        content: markedContent
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // Push categories to the article
        const mixCategories = addedCategories.concat(newCategories)
        if (mixCategories.length === 0) {
          toast({
            title: 'Erreur : catégorie manquante',
            description: "Impossible de créer le nouvel article",
            status: 'error',
            isClosable: true,
          })
        }

        mixCategories.forEach((category) => {
          fetch('http://localhost:8080/api/private/category/' + String(category.id) + '/' + String(data.id), {
            method: 'POST'
          })
            .then(() => {
              toast({
                title: "Succès",
                description: "Article créé avec succès !",
                status: 'success',
                isClosable: true,
                onCloseComplete: goBack()
              })
            })
        })
      })
      .catch((e) => {
        toast({
          title: e.toString(),
          description: "Impossible de créer le nouvel article",
          status: 'error',
          isClosable: true,
        })
      })
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
            onClick={goBack}
          />
          <Divider orientation='vertical' height={4} px="2" />
          <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={goBack}>Accueil</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Heading m={2}>Écrire un article</Heading>
        <FormControl isRequired m="2" w="100%">
          <VStack spacing={2} align="flex-start">
            <FormLabel htmlFor='text'>Ajouter une catégorie</FormLabel>
            <Select placeholder='Catégories existantes' variant='filled' onChange={(event) => { addCategory(event.target.value) }}>
              {
                allCategories.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)
              }
            </Select>
            <Input
              type='text'
              placeholder='Créer une catégorie et appuyer sur Entrer'
              boxShadow="inner"
              onKeyPress={(event) => { createNewCategory(event) }}
            />
            <Flex
              p={2}
              w="100%"
              gap="16px"
              flexWrap="wrap"
            >
              {
                addedCategories.map((el, index) =>
                  <Tag
                    key={el.id}
                    size="md"
                    borderRadius='full'
                    variant="outline"
                    colorScheme={colors[index % 18]}
                    fontWeight="bold"
                    flexGrow="0"
                    flexShrink="0"
                    flexBasis="auto"
                  >
                    <TagLabel>{el.name}</TagLabel>
                  </Tag>
                )
              }
              {
                newCategories.map((el, index) =>
                  <Tag
                    key={index}
                    size="md"
                    borderRadius='full'
                    variant="outline"
                    colorScheme={colors[index % 18]}
                    fontWeight="bold"
                  >
                    <TagLabel>{el.name}</TagLabel>
                  </Tag>
                )
              }
            </Flex>
            <Box h={2} />
            <FormLabel htmlFor='text'>Titre</FormLabel>
            <Input
              isRequired
              type='text'
              boxShadow="inner"
              onChange={(event) => { setTitle(event.target.value) }}
            />
            <Box h={2} />
            <FormLabel htmlFor='text'>Contenu</FormLabel>
            <Textarea
              isRequired
              placeholder='Écrire un article au format Markdown'
              size='sm'
              borderRadius={6}
              boxShadow="inner"
              onChange={(event) => { setMarkedContent(event.target.value) }}
            />
            <Box h={2} />
            <FormLabel htmlFor='text'>Auteur</FormLabel>
            <Input
              isRequired
              type='text'
              boxShadow="inner"
              onChange={(event) => { setAuthor(event.target.value) }}
            />
          </VStack>
        </FormControl>
        <Button onClick={sendArticle}>Envoyer</Button>
        <Box h={4} />
        <Accordion w="100%" allowToggle border="1px" borderColor="gray.100" borderRadius={6}>
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