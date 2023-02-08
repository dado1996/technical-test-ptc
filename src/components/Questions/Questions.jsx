import { Box, Stack, Text, Icon, Flex, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSad } from "react-icons/bi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { CgSmileNone } from "react-icons/cg";
import { FiSmile } from "react-icons/fi";
import { GoSmiley } from "react-icons/go";
import { MdGraphicEq } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";

const icons = [
	BiSad,
	HiOutlineEmojiSad,
	CgSmileNone,
	FiSmile,
	GoSmiley,
];

const labelStyles = {
	mt: '2',
	ml: '-2.5',
	left: "-5",
	fontSize: 'sm',
}

const QuestionsComponent = ({ score }) => {
	const [satisfaction, setSatisfaction] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [sent, setSent] = useState(false);
	const [button, setButton] = useState(true);
	const router = useRouter("/");
	const [slidersValue, setSlidersValue] = useState([]);

	const getQuestions = async () => {
		try {
			const response = await fetch('/questions.json');
			if (!response.ok) throw new Error("Couldn't fetch questions");
			const result = await response.json();
			setSatisfaction(result.satisfaction);
			setQuestions(result.statements);
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	};

	useEffect(() => {
		getQuestions();
	}, []);

	useEffect(() => {
		setButton(false);
	}, [slidersValue])

	const handleSent = () => {
		setSent(true);
		setTimeout(() => {
			router.push('/');
		}, 4000);
	}

	return (
		<Stack direction="column" gap={10} mt={10} ml={20}>
			{sent ? (
				<Box bg="#ccc" width="100%" height="80px" p="15px 10px" border="1px solid #ccc" borderRadius={15}>
					<Text fontSize="16pt" fontWeight={600} color="black" mb={20}>Thanks for your feedback</Text>
					<Text color="black">Your feedback has been sent. Have a lovely day.</Text>
				</Box>
			) : (
			<>
				<Box>
					{satisfaction[score] ? (
						<Flex direction="row" justify="center" align="center" gap={5}>
							<Icon as={icons[score - 1]} fontSize={64} />
							<Text variant="outline">{satisfaction[score - 1]}</Text>
						</Flex>
					) : (
						<Text fontWeight={600}>Thank you for your feedback</Text>
						
					)}
				</Box>
				<Text>Do you agree with the following statements:</Text>
				{questions.length && questions.map((q, i) => (
					<Box key={i} bg="#ccc" width="100%" height="80px" p="15px 10px" border="1px solid #ccc" borderRadius={15} pr="35px">
						<Text color="black" mb={20}>{q}</Text>
						<Slider
							min={0}
							max={100}
							p={10}
							defaultValue={50}
							bg="white"
							color="black"
							name={`slider-${i}`}
							value={slidersValue[`slider-${i}`]}
							onChange={(v) => setSlidersValue(prev => ({
								...prev,
								[`slider-${i}`]: v
							}))}
							ju
						>
							<SliderMark value={0} {...labelStyles}>
								Disagree
							</SliderMark>
							<SliderMark value={100} {...labelStyles}>
								Agree
							</SliderMark>
							<SliderTrack bg='red.100'>
								<SliderFilledTrack bg='tomato' />
							</SliderTrack>
							<SliderThumb boxSize={6}>
								<Box color='tomato' as={MdGraphicEq} />
							</SliderThumb>
						</Slider>
					</Box>
				))}
				<Button
					width="50%"
					bg="lightgreen"
					color="black"
					fontSize="12pt"
					padding="15px 10px"
					rightIcon={<Icon as={AiOutlineArrowRight} color="black" />}
					onClick={handleSent}
					isDisabled={button}
				>Send</Button>
			</>
			)}
		</Stack>
	);
};

export default QuestionsComponent;
