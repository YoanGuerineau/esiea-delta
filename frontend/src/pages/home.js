import React from 'react';
import {
    Box,
    Heading,
    VStack
} from "@chakra-ui/react";
import ArticleCard from '../components/article-card';

function Home() {
	return (
		<Box>
			<VStack>
				<Heading
					m={2}
					fontSize="7xl"
				>
					Delta Blog
				</Heading>
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