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


function ArticleCard(props) {
	const colors = ['orange','blue','cyan','facebook','gray','green','linkedin','messenger','blackAlpha','pink','purple','red','teal','telegram','twitter','whatsapp','whiteAlpha','yellow']
    const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/read', { state: props.data, replace: true }), [navigate]);

    return (
        <VStack
			p={2}
			w="100%"
			borderRadius={8}
			border="1px solid white"
			transition="box-shadow 150ms ease-out"
			_hover={{
				background: "gray.50",
				color: "gray.600",
				cursor: "pointer",
				boxShadow: "md"
			}}
			onClick={handleOnClick}
		>
			<HStack w="100%">
				<Heading size="md">{props.data.title}</Heading>
				<Spacer />
				{
					props.data.categories.map((el, index) => 
					<Tag
						key={el.id}
						size="sm"
						borderRadius='full'
						variant="outline"
						colorScheme={colors[index % 18]}
						fontWeight="bold"
					>
						{el.name}
					</Tag>)
				}
			</HStack>
			<Text w="100%" noOfLines={4}>
				{props.data.content}
			</Text>
			<Text w="100%" textAlign="end" fontStyle="italic">{props.data.author}</Text>
		</VStack>
    )
}

export default ArticleCard;