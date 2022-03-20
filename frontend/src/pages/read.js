import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Heading,
    VStack,
    Text,
    IconButton,
    Divider,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Spacer,
    useToast,
    Textarea,
    Input,
    Button,
    Avatar
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon, DeleteIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'

function Read() {
    const toast = useToast()
    const navigate = useNavigate()
    const goBack = useCallback(() => navigate('/', { replace: true }), [navigate])
    const articleId = useLocation().state
    const [data, setData] = useState({comments: []})
    const [refresh, setRefresh] = useState(false)
    const [commentAuthor, setCommentAuthor] = useState('')
    const [commentContent, setCommentContent] = useState('')
    const refs = {
        inputRef: useRef(null),
        textareaRef: useRef(null)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/private/article/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
            .catch((e) => {
                toast({
                    title: e.toString(),
                    description: "Impossible de récupérer l'article",
                    status: 'error',
                    isClosable: true
                })
            })
    }, [refresh])

    function deleteArticle() {
        fetch(`http://localhost:8080/api/private/article/${articleId}`, {
            method: 'DELETE'
        })
            .then(() => {
                toast({
                    title: "Succès",
                    description: "Article supprimé !",
                    status: 'success',
                    isClosable: true,
                    onCloseComplete: goBack()
                })
            })
            .catch((e) => {
                toast({
                    title: e.toString(),
                    description: "Impossible de supprimer l'article",
                    status: 'error',
                    isClosable: true
                })
            })
    }

    function editArticle() {

    }

    function parseDate(rawDate) {
        let date
        if (rawDate === '') {
            date = new Date()
        } else {
            date = new Date(rawDate)
        }
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDay()).slice(-2)
    }

    function sendComment() {
        if (commentAuthor === '' || commentContent === '') {
            toast({
                title: "Erreur",
                description: "Auteur ou commentaire invalide !",
                status: 'error',
                isClosable: true
            })
            return
        }

        const newComment = {
            author: commentAuthor,
            content: commentContent,
            date: parseDate(''),
            article: {
                id: data.id
            }
        }
        fetch('http://localhost:8080/api/private/comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then((res) => res.json())
            .then((data) => {
                setRefresh(!refresh)
                refs.inputRef.current.value = ''
                refs.textareaRef.current.value = ''
                toast({
                    title: "Succès",
                    description: "Commentaire ajouté !",
                    status: 'success',
                    isClosable: true
                })
            })
            .catch((e) => {
                toast({
                    title: e.toString(),
                    description: "Impossible d'ajouter le commentaire",
                    status: 'error',
                    isClosable: true,
                })
            })
    }

    function deleteComment(id) {
        fetch('http://localhost:8080/api/private/comment/' + String(id), {
            method: 'DELETE'
        })
            .then(() => {
                setRefresh(!refresh)
                toast({
                    title: "Succès",
                    description: "Commentaire supprimé !",
                    status: 'success',
                    isClosable: true
                })
            })
            .catch((e) => {
                toast({
                    title: e.toString(),
                    description: "Impossible de supprimer le commentaire",
                    status: 'error',
                    isClosable: true
                })
            })
    }

    return (
        <Box>
            <VStack>
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
                    <Spacer />
                    <IconButton
                        isRound={true}
                        icon={<EditIcon />}
                        variant="ghost"
                        onClick={editArticle}
                    />
                    <Divider orientation='vertical' height={4} />
                    <IconButton
                        isRound={true}
                        icon={<DeleteIcon />}
                        variant="ghost"
                        onClick={deleteArticle}
                    />
                </Flex>
                <Heading p={4}>{data.title}</Heading>
                <Text w="100%" textAlign="end" fontStyle="italic">{parseDate(data.date)}</Text>
                <Box w="100%">
                    <ReactMarkdown w="100%" components={ChakraUIRenderer()} children={data.content} skipHtml />
                </Box>
                <Text w="100%" textAlign="end" fontStyle="italic">NomAuteur</Text>
                <Box h={8} />
                <Heading py={2} alignSelf="flex-start" size="md">Commentaires</Heading>
                <VStack w="100%" align="flex-start">
                    <Input
                        ref={refs.inputRef}
                        name='author'
                        type="text"
                        isRequired
                        boxShadow="inner"
                        placeholder='Auteur'
                        onChange={(event) => { setCommentAuthor(event.target.value) }}
                    />
                    <Textarea
                        ref={refs.textareaRef}
                        name='comment'
                        isRequired
                        placeholder='Écrire un commentaire...'
                        size='sm'
                        borderRadius={6}
                        boxShadow="inner"
                        onChange={(event) => { setCommentContent(event.target.value) }}
                    />
                    <Button onClick={() => { sendComment() }}>Envoyer</Button>
                </VStack>
                <Box h={4} />
                {
                    data.comments.map((el) => (
                        <VStack
                            p={4}
                            w="100%"
                            align="flex-start"
                            key={el.id}
                            boxShadow="md"
                            borderRadius={8}
                        >
                            <Flex w="100%" alignItems="center">
                                <Avatar mr={3} size="sm" name={el.author} />
                                <Heading size="sm">{el.author}</Heading>
                                <Spacer />
                                <Text mx={2} fontStyle="italic">{parseDate(el.date)}</Text>
                                <IconButton
                                    size="xs"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                />
                                <Divider orientation='vertical' height={2} />
                                <IconButton
                                    size="xs"
                                    icon={<DeleteIcon />}
                                    variant="ghost"
                                    onClick={() => {deleteComment(el.id)}}
                                />
                            </Flex>
                            <Text>{el.content}</Text>
                        </VStack>
                    ))
                }
            </VStack>
        </Box>
    );
}

export default Read;