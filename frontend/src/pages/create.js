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
    Select,
    Tag,
    TagLabel,
    TagCloseButton
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
                    <VStack spacing={2} align="flex-start">
                        <FormLabel htmlFor='text'>Ajouter une catégorie</FormLabel>
                        <Select placeholder='Catégories existantes'>
                          <option value='option1'>Catégorie 1</option>
                          <option value='option2'>Catégorie 2</option>
                          <option value='option3'>Catégorie 3</option>
                        </Select>
                        <Input type='text' placeholder='Créer une catégorie'/>
                        <HStack spacing={4}>
                            <Tag
                                size="md"
                              borderRadius='full'
                              colorScheme="green"
                            >
                              <TagLabel>#Catégorie 1</TagLabel>
                              <TagCloseButton />
                            </Tag>
                        </HStack>
                        <Box h={4} />
                        <FormLabel htmlFor='text'>Titre</FormLabel>
                        <Input type='text' />
                        <Box h={4} />
                        <FormLabel htmlFor='text'>Contenu</FormLabel>
                        <Textarea
                          placeholder='Écrire un article au format Markdown'
                          size='sm'
                        />
                        <Box h={4} />
                        <FormLabel htmlFor='text'>Auteur</FormLabel>
                        <Input type='text' />
                    </VStack>
                </FormControl>
                <Button>Envoyer</Button>
            </VStack>
        </Box>
    );
}

export default Create;