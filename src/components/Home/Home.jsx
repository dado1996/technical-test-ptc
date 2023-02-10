import { BiSad } from "react-icons/bi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { CgSmileNone } from "react-icons/cg";
import { FiSmile } from "react-icons/fi";
import { GoSmiley } from "react-icons/go";
import { Flex, Stack, Icon, Text, Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home = () => {

	const router = useRouter();

	return (
		<Flex
			m={0}
			width="100%"
			minHeight="100vh"
			bg="#2ce6ce"
			justify="center"
			align="center"
			fontFamily="Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif"
			direction="column"
			gap={10}
		>
			<Flex direction="row" justify="space-between" width="30%">
				<Image src="/Butterfly.svg" width="50px" />
				<Text fontWeight={700}>Your Team's Happiness Manager</Text>
			</Flex>
			<Flex direction="column" gap="10px" justify="center" align="center" width="50%" bg="white">
				<Text fontSize="16pt" fontWeight={700}>How is your week going?</Text>
				<Stack direction="row">
					<Image src="/VeryUnhappy.svg" width="100px" cursor="pointer" onClick={() => router.push('/questions/1')} />
					<Image src="/Unhappy.svg" cursor="pointer" onClick={() => router.push('/questions/2')} />
					<Image src="/Neutral.svg" cursor="pointer" onClick={() => router.push('/questions/3')} />
					<Image src="/Happy.svg" cursor="pointer" onClick={() => router.push('/questions/4')} />
					<Image src="/VeryHappy.svg" cursor="pointer" onClick={() => router.push('/questions/5')} />
				</Stack>
				<p>Your answer will always remain anonymous</p>
			</Flex>
		</Flex>
	);
};

export default Home;