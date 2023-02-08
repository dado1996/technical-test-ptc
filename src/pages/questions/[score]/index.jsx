import QuestionsComponent from "@/components/Questions/Questions";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Questions = () => {
	const router = useRouter();
	const { score } = router.query;

	return (
		<Flex>
			<QuestionsComponent score={score} />
		</Flex>
	);
};

export default Questions;