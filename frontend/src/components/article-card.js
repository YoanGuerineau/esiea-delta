import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heading,
    VStack,
    Text,
	HStack,
	Tag,
	Spacer
} from "@chakra-ui/react";


function ArticleCard() {
    const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/read', { replace: true }), [navigate]);

    return (
        <VStack
			p={2}
			w="100%"
			borderRadius={8}
			_hover={{
				background: "gray.50",
				color: "teal.500",
				cursor: "pointer"
			}}
			onClick={handleOnClick}
		>
			<HStack w="100%">
				<Heading size="md">Mon Titre d'Article</Heading>
				<Spacer></Spacer>
				<Tag
					size="sm"
					borderRadius='full'
					variant="solid"
				>
					#MaCatégorie
				</Tag>
			</HStack>
			<Text>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
			</Text>
		</VStack>
    )
}

export default ArticleCard;