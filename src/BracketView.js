import React, { useMemo } from "react";
import Flags from "country-flag-icons/react/3x2";
import { faTrophy, faMedal } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Icon,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const koLabels = [
  ["1A", "2B"],
  ["1C", "2D"],
  ["1E", "2F"],
  ["1G", "2H"],
  ["1B", "2A"],
  ["1D", "2C"],
  ["1F", "2E"],
  ["1H", "2G"],
];

const switchTeamsAtIndices = (array, indexOne, indexTwo) => {
  const switchedArr = array.slice();
  const itemOne = switchedArr.at(indexOne);
  const itemTwo = switchedArr.at(indexTwo);
  switchedArr[indexTwo] = itemOne;
  switchedArr[indexOne] = itemTwo;
  return switchedArr;
};

const LateralLine = props => {
  const { teamName, flagIcon, champion } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex teamName={teamName} flagIcon={flagIcon} champion={champion} />
      <Box w="70px" h="2px" bg="white"></Box>
    </VStack>
  );
};

const LateralLineL = props => {
  const { teamName, flagIcon, champion } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex teamName={teamName} flagIcon={flagIcon} champion={champion} />
      <Box w="71px" h="2px" bg="white" mr="10"></Box>
    </VStack>
  );
};

const TeamFlex = props => {
  const { flagIcon, teamName, champion, third } = props;
  const Flag = Flags[flagIcon];
  return (
    <Flex flexDir="row" alignItems="center" px="3px">
      <Icon as={Flag} mr="3px" />
      <Text fontSize="12px" fontWeight="bold">
        {teamName}
      </Text>
      {champion && <FontAwesomeIcon icon={faTrophy} color="#FFD700" />}
      {third && <FontAwesomeIcon icon={faMedal} color="#CD7F32" size='xs'/>}
    </Flex>
  );
};

const SmallBracketBoxLeft = props => {
  const {
    firstLabel,
    secondLabel,
    firstTeam,
    secondTeam,
    firstFlag,
    secondFlag,
  } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex teamName={firstTeam} flagIcon={firstFlag} />
      <Box
        w="60px"
        h="70px"
        bg="none"
        borderRight="1px solid white"
        borderTop="1px solid white"
        borderBottom="1px solid white"
        textAlign="start"
      >
        <Text fontSize="10px" mb="39px">
          {firstLabel}
        </Text>
        <Text fontSize="10px">{secondLabel}</Text>
      </Box>
      <TeamFlex teamName={secondTeam} flagIcon={secondFlag} />
    </VStack>
  );
};
const MediumBracketBoxLeft = props => {
  const { firstTeam, secondTeam, firstFlag, secondFlag } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex teamName={firstTeam} flagIcon={firstFlag} />
      <Box
        w="60px"
        h="147px"
        bg="none"
        borderRight="1px solid white"
        borderTop="1px solid white"
        borderBottom="1px solid white"
      ></Box>
      <TeamFlex teamName={secondTeam} flagIcon={secondFlag} />
    </VStack>
  );
};

const BigBracketBoxLeft = props => {
  const {
    firstTeam,
    secondTeam,
    firstFlag,
    secondFlag,
    finalTeam,
    finalTeamFlag,
    champion,
    third,
    firstIsThird
  } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex
        teamName={firstTeam}
        flagIcon={firstFlag}
        third={third && firstIsThird}
      />
      <Box
        w="72px"
        h="300px"
        bg={"none"}
        borderRight="1px solid white"
        borderTop="1px solid white"
        borderBottom="1px solid white"
        pt="150"
      >
        <LateralLineL
          teamName={finalTeam}
          flagIcon={finalTeamFlag}
          champion={champion}
        />
      </Box>
      <TeamFlex
        teamName={secondTeam}
        flagIcon={secondFlag}
        third={third && !firstIsThird}
      />
    </VStack>
  );
};

const SmallBracketBoxRight = props => {
  const {
    firstLabel,
    secondLabel,
    firstTeam,
    secondTeam,
    firstFlag,
    secondFlag,
  } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex teamName={firstTeam} flagIcon={firstFlag} />
      <Box
        w="60px"
        h="70px"
        bg="none"
        borderLeft="1px solid white"
        borderTop="1px solid white"
        borderBottom="1px solid white"
        textAlign="start"
      >
        <Text fontSize="10px" mb="39px">
          {firstLabel}
        </Text>
        <Text fontSize="10px">{secondLabel}</Text>
      </Box>
      <TeamFlex teamName={secondTeam} flagIcon={secondFlag} />
    </VStack>
  );
};

const MediumBracketBoxRight = props => {
  const { firstTeam, secondTeam, firstFlag, secondFlag } = props;
  return (
    <VStack spacing="0.5">
      <TeamFlex teamName={firstTeam} flagIcon={firstFlag} />
      <Box
        w="60px"
        h="147px"
        bg="none"
        borderLeft="1px solid white"
        borderTop="1px solid white"
        borderBottom="1px solid white"
      ></Box>
      <TeamFlex teamName={secondTeam} flagIcon={secondFlag} />
    </VStack>
  );
};

const BigBracketBoxRight = props => {
  const {
    firstTeam,
    secondTeam,
    firstFlag,
    secondFlag,
    finalTeam,
    finalTeamFlag,
    champion,
    third,
    firstIsThird,
  } = props;
  return (
    <VStack spacing="0.5">
      <TeamFlex
        teamName={firstTeam}
        flagIcon={firstFlag}
        third={third && firstIsThird}
      />
      <Box
        w="72px"
        h="300px"
        bg={"none"}
        borderLeft="1px solid white"
        borderTop="1px solid white"
        borderBottom="1px solid white"
        pt="150"
      >
        <LateralLine
          teamName={finalTeam}
          flagIcon={finalTeamFlag}
          champion={champion}
        />
      </Box>
      <TeamFlex
        teamName={secondTeam}
        flagIcon={secondFlag}
        third={third && !firstIsThird}
      />
    </VStack>
  );
};

export const BracketView = props => {
  const { teamsHistory, topThree } = props;
  const editedTeamsHist = useMemo(() => {
    let editedTeams = teamsHistory.slice();
    editedTeams = switchTeamsAtIndices(editedTeams, 1, 2);
    editedTeams = switchTeamsAtIndices(editedTeams, 4, 2);
    editedTeams = switchTeamsAtIndices(editedTeams, 5, 6);
    editedTeams = switchTeamsAtIndices(editedTeams, 3, 5);
    return editedTeams;
  }, [teamsHistory]);

  const championLeft = topThree.at(0) === editedTeamsHist.at(15).at(0);
  let arrayThird = [...Array(4).fill(false)];
  let arraySemis = editedTeamsHist.at(12).concat(editedTeamsHist.at(13));
  let arrayPlaces = arrayThird.map((x, index) =>
    topThree.at(2) === arraySemis.at(index) ? true : x
  );
  const leftSideThird = arrayPlaces.at(0) || arrayPlaces.at(1);
  const topThird = arrayPlaces.at(0) || arrayPlaces.at(2);

  return (
    <Box w="100vw" h="100vh" textAlign='center'>
      <Text fontWeight="bold" mt="15px" fontSize="20px">
        World Cup 2022
      </Text>
      <Box w="100vw" h="100%" px="5px">
        <HStack spacing="0">
          <VStack spacing="6vh">
            {editedTeamsHist &&
              editedTeamsHist.map(
                (x, index) =>
                  index < 4 && (
                    <SmallBracketBoxLeft
                      firstLabel={koLabels.at(index).at(0)}
                      secondLabel={koLabels.at(index).at(1)}
                      firstTeam={x.at(0).short}
                      secondTeam={x.at(1).short}
                      firstFlag={x.at(0).flagName}
                      secondFlag={x.at(1).flagName}
                    />
                  )
              )}
          </VStack>
          <VStack spacing="13vh">
            {editedTeamsHist &&
              editedTeamsHist.map(
                (x, index) =>
                  index > 7 &&
                  index < 10 && (
                    <MediumBracketBoxLeft
                      firstTeam={x.at(0).short}
                      secondTeam={x.at(1).short}
                      firstFlag={x.at(0).flagName}
                      secondFlag={x.at(1).flagName}
                    />
                  )
              )}
          </VStack>
          <BigBracketBoxLeft
            firstTeam={editedTeamsHist.at(12).at(0).short}
            secondTeam={editedTeamsHist.at(12).at(1).short}
            firstFlag={editedTeamsHist.at(12).at(0).flagName}
            secondFlag={editedTeamsHist.at(12).at(1).flagName}
            finalTeam={editedTeamsHist.at(15).at(0).short}
            finalTeamFlag={editedTeamsHist.at(15).at(0).flagName}
            champion={championLeft}
            third={leftSideThird}
            firstIsThird={topThird}
          />
          <Flex w="30px" />
          <BigBracketBoxRight
            firstTeam={editedTeamsHist.at(13).at(0).short}
            secondTeam={editedTeamsHist.at(13).at(1).short}
            firstFlag={editedTeamsHist.at(13).at(0).flagName}
            secondFlag={editedTeamsHist.at(13).at(1).flagName}
            finalTeam={editedTeamsHist.at(15).at(1).short}
            finalTeamFlag={editedTeamsHist.at(15).at(1).flagName}
            champion={!championLeft}
            third={!leftSideThird}
            firstIsThird={topThird}
          />
          <VStack spacing="13vh">
            {editedTeamsHist &&
              editedTeamsHist.map(
                (x, index) =>
                  index > 9 &&
                  index < 12 && (
                    <MediumBracketBoxRight
                      firstTeam={x.at(0).short}
                      secondTeam={x.at(1).short}
                      firstFlag={x.at(0).flagName}
                      secondFlag={x.at(1).flagName}
                    />
                  )
              )}
          </VStack>
          <VStack spacing="6vh">
            {editedTeamsHist &&
              editedTeamsHist.map(
                (x, index) =>
                  index > 3 &&
                  index < 8 && (
                    <SmallBracketBoxRight
                      firstLabel={koLabels.at(index).at(0)}
                      secondLabel={koLabels.at(index).at(1)}
                      firstTeam={x.at(0).short}
                      secondTeam={x.at(1).short}
                      firstFlag={x.at(0).flagName}
                      secondFlag={x.at(1).flagName}
                    />
                  )
              )}
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};
