import React, { useState, useEffect } from 'react';
import {
	Box,
	Heading,
	VStack,
	InputGroup,
	InputLeftElement,
	Input
} from "@chakra-ui/react";
import ArticleCard from '../components/article-card';
import { SearchIcon } from '@chakra-ui/icons'

function Home() {
	// States
	const [articles, setArticles] = useState([])

	// Change effects
	useEffect(() => {
		if (articles.length <= 0) {
			fetch('http://localhost:8080/api/private/article')
				.then(res => res.json())
				.then(data => {
					setArticles(data);
				})
				.catch(e => console.log(e.toString()));
		}
	}, [articles]);


	// Get new articles in page
	const articleElements = articles.map((el) =>
		<ArticleCard data={el} key={el.id} />
	)

	return (
		<Box>
			<VStack spacing={4}>
				<Heading
					m={2}
					fontSize="7xl"
				>
					Delta Blog
				</Heading>
				<InputGroup>
					<InputLeftElement
						pointerEvents='none'
						children={<SearchIcon color='gray.300' />}
					/>
					<Input type='search' placeholder='Recherche...' />
				</InputGroup>
				/* articles, static */
				{articleElements}
			</VStack>
		</Box>
	);
}

export default Home;