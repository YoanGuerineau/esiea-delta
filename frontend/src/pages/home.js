import React, { useState, useEffect } from 'react';
import {
	Box,
	Heading,
	VStack,
	InputGroup,
	InputLeftElement,
	Input,
	IconButton,
	Flex,
	Tag,
	TagLabel,
	HStack
} from "@chakra-ui/react";
import ArticleCard from '../components/article-card';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

function Home() {
	// States
	const [articles, setArticles] = useState([])
	const [searching, setSearching] = useState(false)
	const [tmpArticles, setTmpArticles] = useState([])

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
	}, []);


	// Get new articles in page
	const articleElements = articles.map((el) =>
		<ArticleCard data={el} key={el.id} />
	)

	// Switch to search
	function swithToSearch() {
		if (!searching) {
			setTmpArticles(articles)
			setArticles([])
			setSearching(true)
		}
	}
	function swithToAllArticles() {
		setArticles(tmpArticles)
		setTmpArticles([])
		setSearching(false)
	}

	// Get search articles
	function getSearchArticles(event) {
		if (event.key === 'Enter' && event.target.value !== '') {
			fetch('http://localhost:8080/api/private/article/search?query=' + event.target.value)
				.then((res) => res.json())
				.then((data) => {
					setArticles(data)
				})
		}
	}

	return (
		<Box>
			<VStack spacing={4}>
				<Heading
					m={2}
					fontSize="7xl"
				>
					Delta Blog
				</Heading>
				<Flex
				    w="100%"
				    gap="8px"
					onClick={swithToSearch}
				>
					<InputGroup>
						<InputLeftElement
							pointerEvents='none'
							children={<SearchIcon color='gray.300' />}
						/>
						<Input
						    type='search'
						    placeholder='Recherche...'
							onKeyUp={(event) => {getSearchArticles(event)}}
						/>
					</InputGroup>
					<IconButton
					    display={() => searching ? "block":"none"}
					    aria-label='Search database'
						icon={<CloseIcon color='gray.300' />}
						variant="ghost"
						isRound
						onClick={swithToAllArticles}
					/>
				</Flex>
				<HStack
					display={() => searching ? "block":"none"}
					spacing={4}
				>
				    <Tag
				      size="md"
				      variant='solid'
				      colorScheme='gray'
					  fontWeight="bold"
					  cursor="pointer"
				    >
				      <TagLabel>Tout</TagLabel>
				    </Tag>
					<Tag
				      size="md"
				      variant='outline'
				      colorScheme='gray'
					  fontWeight="bold"
					  cursor="pointer"
				    >
				      <TagLabel>Article</TagLabel>
				    </Tag>
					<Tag
				      size="md"
				      variant='outline'
				      colorScheme='gray'
					  fontWeight="bold"
					  cursor="pointer"
				    >
				      <TagLabel>Auteur</TagLabel>
				    </Tag>
					<Tag
				      size="md"
				      variant='outline'
				      colorScheme='gray'
					  fontWeight="bold"
					  cursor="pointer"
				    >
				      <TagLabel>Catégorie</TagLabel>
				    </Tag>
				</HStack>
				/* articles, static */
				{articleElements}
			</VStack>
		</Box>
	);
}

export default Home;