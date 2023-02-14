import { Flex, Stack, Icon, Text, Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import FooterComponent from "../Layout/Footer";

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
        <Image src="/bf-banner.png" width="100%" mb={0} />
      </Flex>
      <Flex
        direction="column"
        gap="10px"
        justify="center"
        align="center"
        width="38%"
        bg="white"
      >
        <Text fontSize="8pt" mt={10}>
          <strong>DEMO INC.</strong> would like to know:
        </Text>
        <Text fontSize="16pt" mt={0} fontWeight={700}>
          How is your week going?
        </Text>
        <Stack direction="row" m={0}>
          <Image
            src="/VeryUnhappy.svg"
            boxSize="60px"
            cursor="pointer"
            onClick={() => router.push("/questions/1")}
          />
          <Image
            src="/Unhappy.svg"
            boxSize="60px"
            cursor="pointer"
            onClick={() => router.push("/questions/2")}
          />
          <Image
            src="/Neutral.svg"
            boxSize="60px"
            cursor="pointer"
            onClick={() => router.push("/questions/3")}
          />
          <Image
            src="/Happy.svg"
            boxSize="60px"
            cursor="pointer"
            onClick={() => router.push("/questions/4")}
          />
          <Image
            src="/VeryHappy.svg"
            boxSize="60px"
            cursor="pointer"
            onClick={() => router.push("/questions/5")}
          />
        </Stack>
        <Text bg="#2ce6ce" color="white" fontSize="8pt">
          Your answer will always remain anonymous
        </Text>
      </Flex>

      <FooterComponent />
    </Flex>
  );
};

export default Home;
