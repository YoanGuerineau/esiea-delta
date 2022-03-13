import React from 'react';
import {
    Box,
    Heading,
    VStack,
	InputGroup,
	InputLeftElement,
	Input,
	Spacer
} from "@chakra-ui/react";
import ArticleCard from '../components/article-card';
import { SearchIcon } from '@chakra-ui/icons'

function Home() {
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
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
				<ArticleCard />
			</VStack>
		</Box>
	);
}

export default Home;