import {
  Box,
  Stack,
  Text,
  Icon,
  Flex,
  Button,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import QuestionItem from "./QuestionItem";

const icons = [
  "/VeryUnhappy.svg",
  "/Unhappy.svg",
  "/Neutral.svg",
  "/Happy.svg",
  "/VeryHappy.svg",
];

const QuestionsComponent = ({ score }) => {
  const [satisfaction, setSatisfaction] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [values, setValues] = useState([]);
  const [comments, setComments] = useState([]);
  const [sent, setSent] = useState(false);
  const [button, setButton] = useState(true);
  const router = useRouter();
  const [slidersValue, setSlidersValue] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await fetch("/questions.json");
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
  }, [slidersValue]);

  const handleSent = () => {
    setSent(true);
    setTimeout(() => {
      router.push("/");
    }, 4000);
  };

  const handleChange = (event, i) => {
    let tmp = [...comments];
    tmp[i] = event.target.value;

    setComments(tmp);
  };

  const handleChangeValue = (event, i) => {
    let tmp = [...slidersValue];
    tmp[i] = event.target.value;

    setSlidersValue(tmp);
  };

  const saveAnswers = async () => {
    setSent(true);
  };

  return (
    <Box
      bg="#166e78"
      width="100%"
      minHeight="100vh"
      color="white"
      fontWeight={600}
      fontFamily="Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif"
    >
      <Stack direction="column" gap={10} mt={10} ml={20} width="30%">
        {sent ? (
          <Box
            bg="#ccc"
            width="100%"
            height="80px"
            p="15px 10px"
            border="1px solid #ccc"
            borderRadius={15}
          >
            <Text fontSize="16pt" fontWeight={600} color="black" mb={20}>
              Thanks for your feedback
            </Text>
            <Text color="black" fontSize="10pt">
              Your feedback has been sent. Have a lovely day.
            </Text>
          </Box>
        ) : (
          <>
            <Box>
              {satisfaction[score - 1] ? (
                <Flex
                  direction="row"
                  justify="flex-start"
                  align="center"
                  gap={5}
                >
                  <Image
                    src={icons[score - 1]}
                    width="120px"
                    bg="white"
                    border="5px solid white"
                    borderRadius="50%"
                  />
                  <Text variant="outline" fontSize="12pt">
                    {satisfaction[score - 1]}
                  </Text>
                </Flex>
              ) : (
                <Text fontWeight={600}>Thank you for your feedback</Text>
              )}
            </Box>
            <Text>Do you agree with the following statements:</Text>
            <Flex direction="column" gap={10}>
              {questions.length &&
                questions.map((q, i) => (
                  <QuestionItem
                    q={q}
                    i={i}
                    length={questions.length}
                    comment={comments?.[i]}
                    handleChangeComment={handleChange}
                    value={values[i]}
                    handleChangeValue={handleChangeValue}
                  />
                ))}
              <Box
                bg="#1b828e"
                width="100%"
                p="15px 10px"
                border="1p solid #ccc"
                pr="35px"
                pl={10}
                mb={10}
              >
                <Text color="white" mb={20} fontSize="15pt">
                  Anything else to add? (Optional)
                </Text>
                <Textarea
                  width="100%"
                  border="1px solid #ccc"
                  borderRadius={4}
                  p={10}
                  placeholder="Express yourself freely and safely. This will always remain anonymous."
                />
              </Box>
            </Flex>
            <Button
              width="50%"
              bg="lightgreen"
              color="black"
              fontSize="12pt"
              padding="15px 10px"
              rightIcon={<Icon as={AiOutlineArrowRight} color="black" />}
              onClick={saveAnswers}
              _disabled={{
                bg: "white",
                color: "#ccc",
              }}
            >
              Send
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default QuestionsComponent;
