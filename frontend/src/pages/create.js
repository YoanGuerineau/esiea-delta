import React, { useCallback } from 'react';
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
} from "@chakra-ui/react";
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons'

function Create() {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/', { replace: true }), [navigate]);

    return (
        <Box>
            <VStack spacing={8}>
                <HStack
                    w="100%"
                >
                    <IconButton
                        isRound={true}
                        icon={<ArrowBackIcon />}
                        variant="ghost"
                        onClick={handleOnClick}
                    />
                    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleOnClick}>Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </HStack>
                <Heading m={2}>Écrire un article</Heading>
                <FormControl isRequired m="2" w="100%">
                    <FormLabel htmlFor='text'>Titre</FormLabel>
                    <Input id='email' type='text' />
                    <Box p="2" />
                    <FormLabel htmlFor='text'>Contenu</FormLabel>
                    <Textarea
                      placeholder='Écrire un article au format Markdown'
                      size='sm'
                    />
                </FormControl>
                <Button>Envoyer</Button>
            </VStack>
        </Box>
    );
}

export default Create;