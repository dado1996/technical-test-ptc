import { Flex, Stack, Text } from "@chakra-ui/react";

const FooterComponent = () => {
  return (
    <Stack
      direction="column"
      justify="center"
      align="center"
      fontSize="6pt"
      spacing={0}
    >
      <Text color="#1b828e">Butterfly. Your Team's Happiness Manager.</Text>
      <Text color="white">
        Appynest, Inc. - 604 East Eleven Street, NY 10009
      </Text>
      <Text color="white">©2023 Appynest, Inc. All rights reserved.</Text>
    </Stack>
  );
};

export default FooterComponent;
