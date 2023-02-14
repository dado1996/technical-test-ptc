import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { FiCircle } from "react-icons/fi";

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

const SliderComponent = ({ i, control }) => {
  return (
    <Controller
      name={`value-${i}`}
      control={control}
      rules={{
        required: true,
      }}
      render={({ field }) => (
        <Slider
          {...field}
          defaultValue={50}
          mt={10}
          mb={10}
          color="black"
          colorScheme="whatsapp"
          minHeight="36px"
        >
          <SliderMark value={0} {...labelStyles}>
            Disagree
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Agree
          </SliderMark>
          <SliderTrack bg="red.500" border="1px solid #ccc">
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb>
            <Box color="tomato" as={FiCircle} />
          </SliderThumb>
        </Slider>
      )}
    />
  );
};

export default SliderComponent;
