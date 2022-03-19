import React, { useCallback } from 'react';
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
    useToast
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon, DeleteIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'

function Read() {
    // Toast
    const toast = useToast()

    const navigate = useNavigate();
    const goBack = useCallback(() => navigate('/', { replace: true }), [navigate]);
    const data = useLocation().state

    function deleteArticle() {
        fetch('http://localhost:8080/api/private/article/' + String(data.id), {
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
                isClosable: true,
            })
        });
    }

    function editArticle() {

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
                    <Divider orientation='vertical' height={4}/>
                    <IconButton
                        isRound={true}
                        icon={<DeleteIcon />}
                        variant="ghost"
                        onClick={deleteArticle}
                    />
                </Flex>
                <Heading>{data.title}</Heading>
                <Box w="100%">
                    <ReactMarkdown w="100%" components={ChakraUIRenderer()} children={data.content} skipHtml />
                </Box>
                <Text w="100%" textAlign="end" fontStyle="italic">NomAuteur</Text>
            </VStack>
        </Box>
    );
}

export default Read;