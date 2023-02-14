import { Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const FooterQuestions = () => {
  return (
    <Stack ml={10} gap={0} fontSize="8pt">
      <Text>Butterfly</Text>
      <Flex direction="row" gap={2}>
        <Text color="#2ce6ce">
          <Link href="https://help.butterfly.ai/">Support</Link> |
        </Text>
        <Text>
          <Link href="https://www.butterfly.ai/legal">Terms of Service</Link> |
        </Text>
        <Text>
          <Link href="https://www.butterfly.ai/legal">Privacy Policy</Link>
        </Text>
      </Flex>
      <Text mb={5}> ©2023 Appynest, Inc.</Text>
    </Stack>
  );
};

export default FooterQuestions;
