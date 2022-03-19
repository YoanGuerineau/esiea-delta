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
	useToast
} from "@chakra-ui/react";
import ArticleCard from '../components/article-card';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

function Home() {
	const toast = useToast()
	const [articles, setArticles] = useState([])
	const [searching, setSearching] = useState(false)
	const [searchingString, setSearchingString] = useState('')
	const [tmpArticles, setTmpArticles] = useState([])
	const [allTag, setAllTag] = useState([true, false, false, false])	// Tags: 'Tout','Titre','Contenu','Auteur'

	useEffect(() => {
		if (articles.length <= 0) {
			fetch('http://localhost:8080/api/private/article')
				.then(res => res.json())
				.then(data => {
					setArticles(data);
				})
				.catch((e) => {
					toast({
						title: e.toString(),
						description: "Impossible de récupérer les articles depuis le serveur",
						status: 'error',
						isClosable: true,
					})
				});
		}
	}, []);

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
	function getSearchArticles() {
		if (searchingString !== '') {
			fetch(`http://localhost:8080/api/private/article/search?title=${allTag[0] || allTag[1] ? searchingString : ''
				}&content=${allTag[0] || allTag[2] ? searchingString : ''
				}&author=${allTag[0] || allTag[3] ? searchingString : ''
				}`)
				.then((res) => res.json())
				.then((data) => {
					setArticles(data)
				})
				.catch((e) => {
					toast({
						title: e.toString(),
						description: "Impossible de récupérer les articles depuis le serveur",
						status: 'error',
						isClosable: true,
					})
				})
		}
	}

	// Enable search tags
	function enableTag(tag) {
		if (tag === 0) {
			setAllTag([true, false, false, false])
		}
		else {
			let tmpAllTags = [...allTag]
			tmpAllTags[0] = false
			tmpAllTags[tag] = true
			if (tmpAllTags[1] === true && tmpAllTags[2] === true && tmpAllTags[3] === true) {
				setAllTag([true, false, false, false])
			} else {
				setAllTag(tmpAllTags)
			}
		}
		getSearchArticles()
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
							onChange={(event) => { setSearchingString(event.target.value) }}
							onKeyUp={(event) => { if (event.key === 'Enter') { getSearchArticles() } }}
						/>
					</InputGroup>
					<IconButton
						display={() => searching ? "block" : "none"}
						aria-label='Search database'
						icon={<CloseIcon color='gray.300' />}
						variant="ghost"
						isRound
						onClick={swithToAllArticles}
					/>
				</Flex>
				<Flex
					display={() => searching ? "block" : "none"}
					flexWrap="wrap"
				>
					<Tag
						m={1}
						size="md"
						variant={allTag[0] ? 'solid' : 'outline'}
						colorScheme='gray'
						fontWeight="bold"
						cursor="pointer"
						onClick={() => { enableTag(0) }}
					>
						<TagLabel>Tout</TagLabel>
					</Tag>
					<Tag
						m={1}
						size="md"
						variant={allTag[1] ? 'solid' : 'outline'}
						colorScheme='gray'
						fontWeight="bold"
						cursor="pointer"
						onClick={() => { enableTag(1) }}
					>
						<TagLabel>Titre</TagLabel>
					</Tag>
					<Tag
						m={1}
						size="md"
						variant={allTag[2] ? 'solid' : 'outline'}
						colorScheme='gray'
						fontWeight="bold"
						cursor="pointer"
						onClick={() => { enableTag(2) }}
					>
						<TagLabel>Contenu</TagLabel>
					</Tag>
					<Tag
						m={1}
						size="md"
						variant={allTag[3] ? 'solid' : 'outline'}
						colorScheme='gray'
						fontWeight="bold"
						cursor="pointer"
						onClick={() => { enableTag(3) }}
					>
						<TagLabel>Auteur</TagLabel>
					</Tag>
				</Flex>
				{
					articles.map((el) =>
						<ArticleCard data={el} key={el.id} />
					)
				}
			</VStack>
		</Box>
	);
}

export default Home;