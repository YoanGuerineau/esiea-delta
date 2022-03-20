import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heading,
    VStack,
    Text,
	HStack,
	Tag,
	Spacer,
	SlideFade
} from "@chakra-ui/react";


function ArticleCard(props) {
	const colors = ['orange','blue','cyan','facebook','gray','green','linkedin','messenger','blackAlpha','pink','purple','red','teal','telegram','twitter','whatsapp','whiteAlpha','yellow']
    const navigate = useNavigate();
	const goToReadArticle = useCallback(() => navigate('/read', { state: props.data.id, replace: true }), [navigate]);

	function preciseDate(rawDate) {
        const date = new Date(rawDate)
        return (date.getDate() < 10 ? "0" + date.getDate(): date.getDate()) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + ' à ' + date.getHours() + ':' + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes())
    }

    return (
		<SlideFade style={{width: '100%'}} in={true} offsetY={-10}>
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
			onClick={goToReadArticle}
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
			<Text w="100%" textAlign="end" fontStyle="italic">{props.data.author + ", " + preciseDate(props.data.date)}</Text>
		</VStack>
		</SlideFade>
    )
}

export default ArticleCard;