import {
  Box,
  Stack,
  Text,
  Icon,
  Flex,
  Button,
  Image,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import QuestionItem from "./QuestionItem";
import FooterQuestions from "../Layout/FooterQuestions";
import { Controller, useForm } from "react-hook-form";

const icons = [
  "/VeryUnhappy.svg",
  "/Unhappy.svg",
  "/Neutral.svg",
  "/Happy.svg",
  "/VeryHappy.svg",
];

const QuestionsComponent = ({ score }) => {
  const [actualScore, setActualScore] = useState(0);
  const [satisfaction, setSatisfaction] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [values, setValues] = useState([]);
  const [comments, setComments] = useState([]);
  const [sent, setSent] = useState(false);
  const [button, setButton] = useState(true);
  const router = useRouter();
  const [slidersValue, setSlidersValue] = useState([]);
  const [showMoods, setShowMoods] = useState(false);
  const toast = useToast();
  const [company, setCompany] = useState("");

  useEffect(() => {
    setActualScore(score);
  }, [score]);

  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const getQuestions = async () => {
    try {
      const response = await fetch("/questions.json");
      if (!response.ok) throw new Error("Couldn't fetch questions");
      const result = await response.json();
      setSatisfaction(result.satisfaction);
      setQuestions(result.statements);
      setCompany(result.company_name);
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

  const handleChange = (event, i) => {
    let tmp = [...comments];
    tmp[i] = event.target.value;

    setComments(tmp);
  };

  const handleChangeValue = (event, i) => {
    let tmp = [...slidersValue];

    tmp[i] = event;

    setSlidersValue(tmp);
  };

  const handleChangeMood = (value) => {
    setActualScore(value);
    setShowMoods(false);
  };

  const onSubmit = async (values) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        body: {
          ...values,
          mood: actualScore,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
    } catch (error) {
      console.log("error submit data", error);
    } finally {
      setSent(true);
      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  };

  // const saveAnswers = async () => {
  //   try {
  //     const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
  //       method: "POST",
  //       body: {
  //         user: "Mr Smiley",
  //         mood: actualScore,
  //         question1: {
  //           value: values[0],
  //           comment: comments[0],
  //         },
  //         question2: {
  //           value: values[1],
  //           comment: comments[1],
  //         },
  //         question3: {
  //           value: values[2],
  //           comment: comments[2],
  //         },
  //         question4: {
  //           value: values[3],
  //           comment: comments[3],
  //         },
  //         question5: {
  //           value: values[4],
  //           comment: comments[4],
  //         },
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const result = await response.json();
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       status: "error",
  //       description: "Ha ocurrido un error :(",
  //     });
  //   } finally {
  //   }
  // };

  return (
    <Box
      bg="#166e78"
      width="100%"
      minHeight="100vh"
      color="white"
      fontWeight={600}
      fontFamily="Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif"
    >
      <Stack direction="column" gap={10} mt={10} ml={20} width="90%">
        {sent ? (
          <Box
            bg="white"
            width="40%"
            p="15px 10px"
            border="1px solid #ccc"
            pr="35px"
            pl={10}
            mb={10}
          >
            <Text fontSize="16pt" fontWeight={600} color="black" mb={20}>
              Thanks for your feedback
            </Text>
            <Text color="#ccc" fontSize="10pt">
              Your feedback has been sent. Have a lovely day.
            </Text>
          </Box>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                {showMoods && (
                  <Box bg="#0d4d54" p="10px" width="40%">
                    <Text>
                      Did you make a mistake? Please select your correct mood:
                    </Text>
                    <Flex direction="row" gap={4} justify="center">
                      <Image
                        src="/VeryUnhappy.svg"
                        boxSize="60px"
                        cursor="pointer"
                        bg={actualScore === 1 ? "white" : "unset"}
                        border={actualScore === 1 ? "3px solid white" : "unset"}
                        _hover={{
                          bg: "white",
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                        borderRadius="50%"
                        onClick={() => handleChangeMood(1)}
                      />
                      <Image
                        src="/Unhappy.svg"
                        boxSize="60px"
                        cursor="pointer"
                        bg={actualScore === 2 ? "white" : "unset"}
                        border={actualScore === 2 ? "3px solid white" : "unset"}
                        _hover={{
                          bg: "white",
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                        borderRadius="50%"
                        onClick={() => handleChangeMood(2)}
                      />
                      <Image
                        src="/Neutral.svg"
                        boxSize="60px"
                        cursor="pointer"
                        bg={actualScore === 3 ? "white" : "unset"}
                        border={actualScore === 3 ? "3px solid white" : "unset"}
                        _hover={{
                          bg: "white",
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                        borderRadius="50%"
                        onClick={() => handleChangeMood(4)}
                      />
                      <Image
                        src="/Happy.svg"
                        boxSize="60px"
                        cursor="pointer"
                        bg={actualScore === 4 ? "white" : "unset"}
                        border={actualScore === 4 ? "3px solid white" : "unset"}
                        _hover={{
                          bg: "white",
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                        borderRadius="50%"
                        onClick={() => handleChangeMood(4)}
                      />
                      <Image
                        src="/VeryHappy.svg"
                        boxSize="60px"
                        cursor="pointer"
                        bg={actualScore === 5 ? "white" : "unset"}
                        border={actualScore === 5 ? "3px solid white" : "unset"}
                        _hover={{
                          bg: "white",
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                        borderRadius="50%"
                        onClick={() => handleChangeMood(5)}
                      />
                    </Flex>
                  </Box>
                )}
                {satisfaction[actualScore - 1] && !showMoods ? (
                  <Flex direction="row" justify="space-between">
                    <Flex
                      direction="row"
                      justify="flex-start"
                      align="center"
                      gap={5}
                      width="360px"
                    >
                      <Icon
                        as={BsPencilSquare}
                        bg="#0d4d54"
                        bgSize="revert"
                        onClick={() => setShowMoods(true)}
                      />
                      <Image
                        src={icons[actualScore - 1]}
                        width="120px"
                        bg="white"
                        border="5px solid white"
                        borderRadius="50%"
                      />
                      <Flex direction="column" fontSize="8pt">
                        <Text variant="outline" fontSize="12pt">
                          {satisfaction[actualScore - 1]}
                        </Text>
                        <Text fontSize="8pt">
                          Your answers will{" "}
                          <span style={{ color: "#2ce6ce" }}>
                            always remain anonymous
                          </span>
                        </Text>
                      </Flex>
                    </Flex>
                    <Text fontSize="16pt" mr={0}>
                      {company}
                    </Text>
                  </Flex>
                ) : (
                  <>
                    <Text fontWeight={600}>Thank you for your feedback</Text>
                    <Text>{company}</Text>
                  </>
                )}
              </Box>
              <Text>Do you agree with the following statements:</Text>
              <Flex direction="column" gap={10} width="40%">
                {questions.length &&
                  questions.map((q, i) => (
                    <QuestionItem
                      key={i}
                      q={q}
                      i={i}
                      length={questions.length}
                      control={control}
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
                  <Flex direction="row" justify="space-between">
                    <Text color="white" mb={20} fontSize="15pt">
                      Anything else to add? (Optional)
                    </Text>
                    <Flex
                      borderRadius="50%"
                      m={0}
                      boxSizing="border-box"
                      bg="#0d4d54"
                      textAlign="center"
                      align="center"
                      maxWidth="70px"
                    >
                      <Text wordBreak="break-all" ml={5} mr={5} fontSize="6pt">
                        Extra feedback helps
                      </Text>
                    </Flex>
                  </Flex>
                  <Controller
                    name="additional_comment"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        width="100%"
                        minHeight="60px"
                        border="1px solid #ccc"
                        borderRadius={4}
                        p={10}
                        mt={15}
                        placeholder="Express yourself freely and safely. This will always remain anonymous."
                      />
                    )}
                  />
                </Box>
              </Flex>
              <Button
                type="submit"
                width="50%"
                bg="#2ce6ce"
                color="black"
                fontSize="12pt"
                padding="15px 10px"
                rightIcon={<Icon as={AiOutlineArrowRight} color="black" />}
                // onClick={saveAnswers}
                isDisabled={!isValid}
                _disabled={{
                  bg: "white",
                  color: "#ccc",
                }}
              >
                Send
              </Button>
            </form>
          </>
        )}
      </Stack>
      <FooterQuestions />
    </Box>
  );
};

export default QuestionsComponent;
