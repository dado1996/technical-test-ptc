import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import SliderComponent from "./Slider";

const QuestionItem = ({
  q,
  i,
  length,
  comment,
  handleChangeComment,
  value,
  handleChangeValue,
}) => {
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

      <SliderComponent value={value} handleValue={handleChangeValue} />

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
      <Textarea
        width="100%"
        border="1px solid #ccc"
        p={10}
        borderRadius={4}
        hidden={!showComment}
        type="text"
        placeholder={`Anything to add for ${q.topic}?`}
        value={comment}
        onChange={(event) => handleChangeComment(event, i)}
      />
    </Box>
  );
};

export default QuestionItem;
