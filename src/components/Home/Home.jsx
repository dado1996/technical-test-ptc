import { BiSad } from "react-icons/bi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { CgSmileNone } from "react-icons/cg";
import { FiSmile } from "react-icons/fi";
import { GoSmiley } from "react-icons/go";
import { Flex, Stack, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home = () => {

	const router = useRouter();

	return (
		<Flex direction="column" gap="10px" justify="center" align="center" mt="200px">
			<Text fontSize="16pt" fontWeight={700}>How is your week going?</Text>
			<Stack direction="row">
				<Icon as={BiSad} fontSize={64} cursor="pointer" onClick={() => router.push('/questions/1')} />
				<Icon as={HiOutlineEmojiSad} fontSize={64} cursor="pointer" onClick={() => router.push('/questions/2')} />
				<Icon as={CgSmileNone} fontSize={64} cursor="pointer" onClick={() => router.push('/questions/3')} />
				<Icon as={FiSmile} fontSize={64} cursor="pointer" onClick={() => router.push('/questions/4')} />
				<Icon as={GoSmiley} fontSize={64} cursor="pointer" onClick={() => router.push('/questions/5')} />
			</Stack>
			<p>Your answer will always remain anonymous</p>
		</Flex>
	);
};

export default Home;