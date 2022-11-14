import React from "react";
import { Text, Button, Box, VStack, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Flags from "country-flag-icons/react/3x2";
import { England } from './England'
import { Wales } from './Wales'


export const FinalView = props => {
  const { teams, titleText, onNext, setView } = props;
  const colorCodes = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const labelTexts = ["Champions", "Runners-up", "Third Place"];

  const clickBracket = () => {
      onNext(true)
      setView(true)
  }

  const isBigWindow = window.innerWidth > 650
  return (
    <Box ml={isBigWindow && '18vw'}>
      <VStack spacing={isBigWindow ? "25px" : "15px"} mb={isBigWindow ? '50px' : '30px'}>
        <Text fontSize='22px' fontWeight='bold'>{titleText}</Text>
        {teams &&
          teams.map((x, index) => {
            const Flag = x.name === 'England' ? England : x.name === 'Wales' ? Wales : x.flagName && Flags[x.flagName];
            const placeColor = colorCodes.at(index);
            const label = labelTexts.at(index);
            return (
              <VStack spacing={'5px'} key={`${x.name}_stack`}>
                <Text>{label}</Text>
                <Button
                  pointerEvents='none'
                  w={isBigWindow ? '40vw' : "80vw"}
                  h={isBigWindow ? '6vh' : undefined}
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
      <Button rightIcon={<FontAwesomeIcon icon={faArrowRight} />} w={isBigWindow ? '40vw' : '80vw'} bg='blue.600' color='white' onClick={() => clickBracket()}>View Bracket</Button>
    </Box>
  );
};
