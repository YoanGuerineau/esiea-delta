import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Spacer
} from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon, ChevronRightIcon } from '@chakra-ui/icons'

function Read() {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/', { replace: true }), [navigate]);

    function deleteArticle() {

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
                        onClick={handleOnClick}
                    />
                    <Divider orientation='vertical' height={4} px="2" />
                    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleOnClick}>Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Spacer />
                    <IconButton
                        isRound={true}
                        icon={<DeleteIcon />}
                        variant="ghost"
                        onClick={deleteArticle}
                    />
                </Flex>
                <Heading>Lorem Ipsum</Heading>
                <Text w="100%" align="start">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <Text w="100%" textAlign="end" fontStyle="italic">NomAuteur</Text>
            </VStack>
        </Box>
    );
}

export default Read;