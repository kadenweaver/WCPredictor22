import React, { useMemo } from "react";
import Flags from "country-flag-icons/react/3x2";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Box, Icon, Text, VStack, HStack, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { euro2024knockout } from "./Groups";
import { England } from "./England";
import { Wales } from "./Wales";

//{third && <FontAwesomeIcon icon={faMedal} color="#CD7F32" size="xs" />}

const koLabels = [
  ["1B", "3F"],
  ["1A", "2C"],
  ["1F", "3C"],
  ["2D", "2E"],
  ["1E", "3D"],
  ["1D", "2F"],
  ["1C", "3E"],
  ["2A", "2B"],
];

const LINE_WIDTH = "68px";
const BOX_WIDTH = "55px";
const BIG_BOX_WIDTH = "68px";

/*
const switchTeamsAtIndices = (array, indexOne, indexTwo) => {
  const switchedArr = array.slice();
  const itemOne = switchedArr.at(indexOne);
  const itemTwo = switchedArr.at(indexTwo);
  switchedArr[indexTwo] = itemOne;
  switchedArr[indexOne] = itemTwo;
  return switchedArr;
};
*/

const LateralLine = props => {
  const { teamName, flagIcon, champion } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex teamName={teamName} flagIcon={flagIcon} champion={champion} />
      <Box w={LINE_WIDTH} h="2px" bg="white"></Box>
    </VStack>
  );
};

const LateralLineL = props => {
  const { teamName, flagIcon, champion } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex teamName={teamName} flagIcon={flagIcon} champion={champion} />
      <Box w={LINE_WIDTH} h="2px" bg="white"></Box>
    </VStack>
  );
};

const TeamFlex = props => {
  const { flagIcon, teamName, champion } = props;
  const Flag =
    teamName === "ENG" ? England : teamName === "WAL" ? Wales : Flags[flagIcon];
  return (
    <Flex flexDir="row" alignItems="center" px="3px">
      <Icon as={Flag} mr="3px" />
      <Text fontSize="12px" fontWeight="bold">
        {teamName}
      </Text>
      {champion && <FontAwesomeIcon icon={faTrophy} color="#FFD700" />}
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
        w={BOX_WIDTH}
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
        w={BOX_WIDTH}
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
    firstIsThird,
  } = props;
  return (
    <VStack spacing="0.5" alignItems="baseline">
      <TeamFlex
        teamName={firstTeam}
        flagIcon={firstFlag}
        third={third && firstIsThird}
      />
      <Box
        w={BIG_BOX_WIDTH}
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
    <VStack spacing="0.5">
      <TeamFlex teamName={firstTeam} flagIcon={firstFlag} />
      <Box
        w={BOX_WIDTH}
        h="70px"
        bg="none"
        borderLeft="1px solid white"
        borderTop="1px solid white"
        borderBottom="1px solid white"
        textAlign="end"
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
        w={BOX_WIDTH}
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
        w={BIG_BOX_WIDTH}
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

    koLabels?.reverse()?.forEach(element => {
      const key1 = element.at(0);
      const key2 = element.at(1);
      const teams = euro2024knockout.filter(
        x => x.koPosition === key1 || x.koPosition === key2
      );
      editedTeams.unshift(teams);
    });
    /*
    editedTeams = switchTeamsAtIndices(editedTeams, 0, 7);
    editedTeams = switchTeamsAtIndices(editedTeams, 1, 6);
    editedTeams = switchTeamsAtIndices(editedTeams, 2, 5);
    editedTeams = switchTeamsAtIndices(editedTeams, 3, 4);
    */

    return editedTeams;
  }, [teamsHistory]);
  const championLeft =
    topThree.at(0) === editedTeamsHist.at(editedTeamsHist.length - 1).at(0);
  let arrayThird = [...Array(4).fill(false)];
  let arraySemis = editedTeamsHist.at(4).concat(editedTeamsHist.at(5));
  let arrayPlaces = arrayThird.map((x, index) =>
    topThree.at(2) === arraySemis.at(index) ? true : x
  );
  const leftSideThird = arrayPlaces.at(0) || arrayPlaces.at(1);
  const topThird = arrayPlaces.at(0) || arrayPlaces.at(2);
  const isBigWindow = window.innerWidth > 650;
  return (
    <Flex flexDir="column" w="100%" alignItems="center">
      <Text
        fontWeight="bold"
        mt={isBigWindow ? "6vh" : "15px"}
        fontSize={isBigWindow ? "30px" : "20px"}
        mb={isBigWindow && "20px"}
      >
        Euro 2024
      </Text>
      <Flex flexDir="column" alignItems="center">
        <HStack spacing="0">
          <VStack spacing="6vh">
            {editedTeamsHist &&
              editedTeamsHist.map(
                (x, index) =>
                  index < 4 && (
                    <SmallBracketBoxLeft
                      firstLabel={x.at(0).koPosition}
                      secondLabel={x.at(1).koPosition}
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
            finalTeam={editedTeamsHist.at(14).at(0).short}
            finalTeamFlag={editedTeamsHist.at(14).at(0).flagName}
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
            finalTeam={editedTeamsHist.at(14).at(1).short}
            finalTeamFlag={editedTeamsHist.at(14).at(1).flagName}
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
                      firstLabel={x.at(0).koPosition}
                      secondLabel={x.at(1).koPosition}
                      firstTeam={x.at(0).short}
                      secondTeam={x.at(1).short}
                      firstFlag={x.at(0).flagName}
                      secondFlag={x.at(1).flagName}
                    />
                  )
              )}
          </VStack>
        </HStack>
      </Flex>
    </Flex>
  );
};
