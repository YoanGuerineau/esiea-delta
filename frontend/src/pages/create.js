import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from "@chakra-ui/react"
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'


function Create() {
  const toast = useToast()
  const colors = ['orange', 'blue', 'cyan', 'facebook', 'gray', 'green', 'linkedin', 'messenger', 'blackAlpha', 'pink', 'purple', 'red', 'teal', 'telegram', 'twitter', 'whatsapp', 'whiteAlpha', 'yellow']
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate('/', { replace: true }), [navigate])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [markedContent, setMarkedContent] = useState('')
  const [allCategories, setAllCategories] = useState([])
  const [addedCategories, setAddedCategories] = useState([])
  const [refreshAllCategories, setRefreshAllCategories] = useState(false)
  const articleId = useLocation().state
  const refs = {
    titlePageRef: useRef(null),
    titleRef: useRef(null),
    contentRef: useRef(null),
    authorRef: useRef(null)
  }

  // Set page for write or edit article
  useEffect(() => {
    if (articleId === null) {
      document.title = 'Nouvel article - Delta Blog'
      refs.titlePageRef.current.innerText = "Écrire un article"
    } else {
      fetch(`http://localhost:8080/api/private/article/${articleId}`)
        .then((res) => res.json())
        .then((data) => {
          document.title = 'Édition - Delta Blog'
          refs.titlePageRef.current.innerText = "Éditer l'article"
          setAddedCategories(data.categories)
          setTitle(data.title)
          setMarkedContent(data.content)
          setAuthor(data.author)
          refs.titleRef.current.value = data.title
          refs.contentRef.current.value = data.content
          refs.authorRef.current.value = data.author
        })
        .catch((e) => {
          toast({
            title: e.toString(),
            description: "Impossible de récupérer l'article",
            status: 'error',
            isClosable: true
          })
        })
    }
  }, [articleId])

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
          isClosable: true
        })
      })
  }, [refreshAllCategories])

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
    } else {
      toast({
        title: 'Erreur',
        description: "Catégorie déjà ajouté à l'article",
        status: 'warning',
        isClosable: true,
      })
    }
  }

  // Create the new category
  function createNewCategory(event) {
    if (event.key === "Enter") {
      const newCategory = { "name": event.target.value }
      event.target.value = ''

      // Check if the category already exist
      if (!allCategories.some(el => el.name === newCategory.name)) {
        fetch('http://localhost:8080/api/private/category', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newCategory.name
          })
        })
          .then((res) => res.json())
          .then((data) => {
            setRefreshAllCategories(!refreshAllCategories)
            setAddedCategories((prevState) => {
              return [
                ...prevState,
                data
              ]
            })
            toast({
              title: 'Succès',
              description: "Catégorie créé",
              status: 'success',
              isClosable: true,
            })
          })
          .catch((e) => {
            toast({
              title: e.toString(),
              description: "Serveur injoignable ou catégorie existante",
              status: 'error',
              isClosable: true,
            })
          })
      } else {
        toast({
          title: 'Erreur',
          description: "La catégorie existe déjà",
          status: 'warning',
          isClosable: true,
        })
      }
    }
  }

  // Send article to the server
  function sendArticle() {
    fetch('http://localhost:8080/api/private/article', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        author,
        date: new Date().toISOString(),
        content: markedContent
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // Push categories to the article
        if (addedCategories.length === 0) {
          toast({
            title: 'Erreur',
            description: "L'article ne contient aucune catégorie",
            status: 'warning',
            isClosable: true,
          })
        } else {
          addedCategories.forEach((category) => {
            fetch(`http://localhost:8080/api/private/category/${category.id}/${data.id}`, {
              method: 'POST'
            })
              .catch((e) => {
                toast({
                  title: e.toString(),
                  description: `Impossible d'ajouter la catégorie : ${category}`,
                  status: 'error',
                  isClosable: true,
                })
              })
          })
          toast({
            title: "Succès",
            description: "Article créé avec succès !",
            status: 'success',
            isClosable: true,
            onCloseComplete: goBack()
          })
        }
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

  // Send edited article
  function sendEditedArticle() {
    fetch('http://localhost:8080/api/private/article', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: articleId,
        title,
        author,
        content: markedContent
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // Push categories to the article
        if (addedCategories.length === 0) {
          toast({
            title: 'Erreur',
            description: "L'article ne contient aucune catégorie",
            status: 'warning',
            isClosable: true,
          })
        } else {
          addedCategories.forEach((category) => {
            fetch(`http://localhost:8080/api/private/category/${category.id}/${data.id}`, {
              method: 'POST'
            })
              .catch((e) => {
                toast({
                  title: e.toString(),
                  description: `Impossible d'ajouter la catégorie : ${category}`,
                  status: 'error',
                  isClosable: true,
                })
              })
          })
          toast({
            title: "Succès",
            description: "Article modifié avec succès !",
            status: 'success',
            isClosable: true,
            onCloseComplete: goBack()
          })
        }
      })
      .catch((e) => {
        toast({
          title: e.toString(),
          description: "Impossible de modifier le nouvel article",
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
        <Heading m={2} ref={refs.titlePageRef}></Heading>
        <FormControl isRequired m="2" w="100%">
          <VStack spacing={2} align="flex-start">
            <FormLabel htmlFor='text'>Ajouter une catégorie</FormLabel>
            <Select placeholder='Catégories existantes' onChange={(event) => { addCategory(event.target.value) }}>
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
            </Flex>
            <Box h={2} />
            <FormLabel htmlFor='title'>Titre</FormLabel>
            <Input
              ref={refs.titleRef}
              isRequired
              name='title'
              type='text'
              boxShadow="inner"
              onChange={(event) => { setTitle(event.target.value) }}
            />
            <Box h={2} />
            <FormLabel htmlFor='content'>Contenu</FormLabel>
            <Textarea
              ref={refs.contentRef}
              isRequired
              name='content'
              placeholder='Écrire un article au format Markdown'
              size='sm'
              borderRadius={6}
              boxShadow="inner"
              onChange={(event) => { setMarkedContent(event.target.value) }}
            />
            <Box h={2} />
            <FormLabel htmlFor='author'>Auteur</FormLabel>
            <Input
              ref={refs.authorRef}
              isRequired
              name='author'
              type='text'
              boxShadow="inner"
              onChange={(event) => { setAuthor(event.target.value) }}
            />
          </VStack>
        </FormControl>
        <Button onClick={articleId === null ? sendArticle : sendEditedArticle}>Envoyer</Button>
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