import React from "react";
import { Text, Button, Box, VStack, Icon, HStack, Circle } from "@chakra-ui/react";
import Flags from "country-flag-icons/react/3x2";
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { England } from './England'
import { Wales } from './Wales'



export const SelectionView = props => {
  const { teams, titleText, onNext, onSelect, selected, nextEnabled, level } = props;
  const bigWindow = window.innerWidth > 650 
  return (
    <Box pos='fixed' px={bigWindow && '19vw'}>
      <Text fontSize="22px" mb='20px'>{titleText}</Text>
      <VStack spacing={bigWindow ? teams.length === 2 ? "22px" : "18px" : "10px"} mb="25px" >
        {teams &&
          teams.map(x => {
            const Flag = x.flagName && Flags[x.flagName];
            const isSelected = selected.includes(x.name);
            const groupPlace = isSelected && selected.indexOf(x.name) + 1;
            return (
              <Button
                key={`${x.name}_button`}
                w={bigWindow ? "40vw" : "80vw"}
                h='9vh'
                bg={isSelected ? "blue.300" : "blue.600"}
                _hover={{bg: "blue.100"}}
                _selected={{bg: "blue.300"}}
                _focus={{bg:"blue.300"}}
                leftIcon={
                  x.name === "England" ? (
                    <Icon as={England}/>
                  ) : x.name === "Wales" ? (
                      <Icon as={Wales}/>
                  ) : (
                    <Icon as={Flag} />
                  )
                }
                onClick={() => onSelect(x.name)}
                rightIcon={level >= 8 && groupPlace ? <FontAwesomeIcon icon={faStar} size='xs'/> : groupPlace ? <Text>{groupPlace}</Text> : undefined}
              >
                {x.name}
              </Button>
            );
          })}
      </VStack>
      <Button
        w={bigWindow ? "40vw" : "80vw"}
        h='7vh'
        mb='20px'
        bg={nextEnabled ? "green.300" : "gray.200"}
        color={nextEnabled ? "white" : "gray.400"}
        isDisabled={!nextEnabled}
        onClick={onNext}
      >
        Next
      </Button>
      <HStack spacing='1.5' ml={bigWindow ? '11vw' : '8vw'} >
        {[...Array(24).keys()].map(x => (
            <Circle size={bigWindow ? '8px' : '5px'} bg={x < level ? 'blue.600' : 'gray.300'} />
        ))}
      </HStack>
    </Box>
  );
};
