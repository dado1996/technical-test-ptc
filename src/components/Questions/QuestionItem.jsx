import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import SliderComponent from "./Slider";
import { Controller } from "react-hook-form";

const QuestionItem = ({ q, i, length, control }) => {
  const [showComment, setShowComment] = useState(false);

  const handleShowComment = () => {
    setShowComment(true);
  };

  return (
    <Box
      bg="white"
      width="100%"
      p="15px 10px"
      border="1px solid #ccc"
      mb={10}
      pl="30px"
      pr="50px"
    >
      <Text color="#999" top={0} fontSize="8pt">{`${i + 1} of ${length}`}</Text>
      <Text color="#2ce6ce">{q.topic}</Text>
      <Text color="#666" mb={20} fontSize="15pt" onClick={handleShowComment}>
        {q.text}
      </Text>

      <SliderComponent control={control} i={i + 1} />

      <Text
        hidden={showComment}
        mt={10}
        color="#2ce6ce"
        cursor="pointer"
        textDecoration="underline"
        textAlign="center"
        onClick={() => setShowComment(true)}
      >
        Add comment
      </Text>
      <Controller
        name={`comment-${i + 1}`}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            width="100%"
            border="1px solid #ccc"
            p={10}
            borderRadius={4}
            hidden={!showComment}
            type="text"
            placeholder={`Anything to add for ${q.topic}?`}
          />
        )}
      />
    </Box>
  );
};

export default QuestionItem;
