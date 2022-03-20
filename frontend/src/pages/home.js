import React, { useState, useEffect, useRef } from 'react';
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
	useToast,
	Spinner,
	Select,
	Spacer,
	InputRightElement
} from "@chakra-ui/react";
import ArticleCard from '../components/article-card';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

function Home() {
	const toast = useToast()
	const [articles, setArticles] = useState([])
	const [searching, setSearching] = useState(false)
	const [searchingString, setSearchingString] = useState('')
	const [tmpArticles, setTmpArticles] = useState([])
	const [allTag, setAllTag] = useState([true, true, true])	// 3 tags: 'Titre','Contenu','Auteur'
	const inputRef = useRef(null)
	const [loader, setLoader] = useState(false)
	const [allCategories, setAllCategories] = useState([])
	const [currentCategory, setCurrentCategory] = useState({})

	// Get all articles
	useEffect(() => {
		if (searching) {
			return
		}

		setLoader(true)
		// Check selected category (all by default)

		fetch('http://localhost:8080/api/private/article')
			.then(res => res.json())
			.then(data => {
				// Get articles from the selected category
				if (Object.keys(currentCategory).length !== 0) {
					setArticles(data.filter((article) => {
						return article.categories.some((category) => category.id === Number(currentCategory))
					}))
				} else {
					setArticles(data)
				}
			})
			.catch((e) => {
				toast({
					title: e.toString(),
					description: "Impossible de récupérer les articles depuis le serveur",
					status: 'error',
					isClosable: true
				})
			})
			.finally(() => {
				setLoader(false)
			})
	}, [currentCategory])

	// Get all categories
	useEffect(() => {
		fetch('http://localhost:8080/api/private/category')
			.then((res) => res.json())
			.then((data) => {
				setAllCategories(data)
			})
			.catch((e) => {
				toast({
					title: e.toString(),
					description: "Impossible de récupérer les catrégories depuis le serveur",
					status: 'error',
					isClosable: true,
				})
			})
	}, [])

	// Switch to search
	function swithToSearch() {
		if (!searching) {
			setTmpArticles(articles)
			setArticles([])
			setSearching(true)
		}
	}
	function swithToAllArticles() {
		inputRef.current.value = ''
		setArticles(tmpArticles)
		setTmpArticles([])
		setSearching(false)
	}

	// Get search articles
	function getSearchArticles() {
		setLoader(true)
		fetch(`http://localhost:8080/api/private/article/search?title=${allTag[0] ? searchingString : ''
			}&content=${allTag[1] ? searchingString : ''
			}&author=${allTag[2] ? searchingString : ''
			}`)
			.then((res) => res.json())
			.then((data) => {
				if (Object.keys(currentCategory).length !== 0) {
					setArticles(data.filter((article) => {
						return article.categories.some((category) => category.id === Number(currentCategory))
					}))
				} else {
					setArticles(data)
				}
			})
			.catch((e) => {
				toast({
					title: e.toString(),
					description: "Impossible de récupérer les articles depuis le serveur",
					status: 'error',
					isClosable: true,
				})
			})
			.finally(() => {
				setLoader(false)
			})
	}

	// Enable search tags
	function enableTag(tag) {
		// Change the wanted tag
		let tmpAllTags = [...allTag]
		tmpAllTags[tag] = !tmpAllTags[tag]
		setAllTag(tmpAllTags)
	}
	useEffect(() => {
		if (searching) {
			getSearchArticles()
		}
	}, [allTag, currentCategory])

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
							ref={inputRef}
							type='search'
							placeholder='Recherche...'
							onChange={(event) => { setSearchingString(event.target.value) }}
							onKeyUp={(event) => { if (event.key === 'Enter') { getSearchArticles() } }}
						/>
						<InputRightElement>
							<IconButton
								display={() => searching ? "block" : "none"}
								aria-label='Search database'
								icon={<CloseIcon color='gray.300' />}
								variant="ghost"
								size="sm"
								onClick={swithToAllArticles}
							/>
						</InputRightElement>
					</InputGroup>
				</Flex>
				<Flex
					w="100%"
					flexWrap="wrap"
					alignItems="center"
					justifyContent="space-between"
				>
					<Select
						placeholder='Toutes les catégories'
						maxW="200px"
						onChange={(event) => { setCurrentCategory(event.target.value) }}
					>
						{
							allCategories.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)
						}
					</Select>
					<Flex
						flexWrap="wrap"
					>
						<Tag
							display={() => searching ? "block" : "none"}
							m={1}
							size="md"
							variant={allTag[0] ? 'solid' : 'outline'}
							colorScheme='gray'
							fontWeight="bold"
							cursor="pointer"
							onClick={() => { enableTag(0) }}
						>
							<TagLabel>Titre</TagLabel>
						</Tag>
						<Tag
							display={() => searching ? "block" : "none"}
							m={1}
							size="md"
							variant={allTag[1] ? 'solid' : 'outline'}
							colorScheme='gray'
							fontWeight="bold"
							cursor="pointer"
							onClick={() => { enableTag(1) }}
						>
							<TagLabel>Contenu</TagLabel>
						</Tag>
						<Tag
							display={() => searching ? "block" : "none"}
							m={1}
							size="md"
							variant={allTag[2] ? 'solid' : 'outline'}
							colorScheme='gray'
							fontWeight="bold"
							cursor="pointer"
							onClick={() => { enableTag(2) }}
						>
							<TagLabel>Auteur</TagLabel>
						</Tag>
					</Flex>
				</Flex>
				{
					loader ? (
						<Spinner m={4} size='xl' />
					) : ''
				}
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