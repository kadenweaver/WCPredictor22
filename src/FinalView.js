import React from "react";
import { Text, Button, Box, VStack, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Flags from "country-flag-icons/react/3x2";

export const FinalView = props => {
  const { teams, titleText, onNext } = props;
  const colorCodes = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const labelTexts = ["Champions", "Runners-up", "Third Place"];
  return (
    <Box>
      <VStack spacing="15px" mb='30px'>
        <Text fontSize='22px' fontWeight='bold'>{titleText}</Text>
        {teams &&
          teams.map((x, index) => {
            const Flag = x.flagName && Flags[x.flagName];
            const placeColor = colorCodes.at(index);
            const label = labelTexts.at(index);
            return (
              <VStack spacing={'5px'} key={`${x.name}_stack`}>
                <Text>{label}</Text>
                <Button
                  pointerEvents='none'
                  w="60vw"
                  bg={placeColor}
                  color="black"
                  leftIcon={<Icon as={Flag} />}
                >
                  {x.name}
                </Button>
              </VStack>
            );
          })}
      </VStack>
      <Button rightIcon={<FontAwesomeIcon icon={faArrowRight} />} w='60vw' bg='blue.600' color='white' onClick={() => onNext(true)}>View Bracket</Button>
    </Box>
  );
};
