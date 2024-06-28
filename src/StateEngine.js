import React, { useState, useMemo } from "react";
import { euro2024knockout } from "./Groups";
import { SelectionView } from "./SelectionView";
import { FinalView } from "./FinalView";
import { BracketView } from "./BracketView";
// teams code for quarterfinal, must add level codes
/*if (stateLevel < 8) {
      const group = groups.at(stateLevel);

      return group.teams;
    } else if (stateLevel < 16) {
            const ro16index = stateLevel - 8;

//old matchcode for third place
//"TP", third place match

*/

const teamsByName = euro2024knockout;

const levelToMatchCode = [
  "1B v 3F",
  "1A v 2C",
  "1F v 3C",
  "2D v 2E",
  "1E v 3D",
  "1D v 2F",
  "1C v 3E",
  "2A v 2B",
  "1",
  "2",
  "3",
  "4",
  "S1",
  "S2",
  "Final",
];

//state level
//runs the app through pages
// for wc, ran from 0 to 24?

// selection
//temporarily tracks user selection by a list of vehicles?
// must be some way of determining place bc of world cup

//selection history
// keeping track of the user choices for a given level

// teamsHistory
// keeping track of teams at each level of the tournament

export const StateEngine = props => {
  const { setView } = props;
  const [stateLevel, setStateLevel] = useState(0);
  const [selection, setSelection] = useState([]);
  const [selectionHistory, setSelectionHistory] = useState([]);
  const [teamsHistory, setTeamsHistory] = useState([]);
  const [bracketView, setBracketView] = useState(false);
  const teams = useMemo(() => {
    if (stateLevel < 8) {
      /* old logic ro16
      const ro16index = stateLevel - 8;
      const first = selectionHistory[ro16index].selection.at(0);
      const secondIndex = ro16index % 2 === 0 ? ro16index + 1 : ro16index - 1;
      const second = selectionHistory[secondIndex].selection.at(1);
      */
      const matchCode = levelToMatchCode.at(stateLevel);
      const firstTeamPo = matchCode.slice(0, 2);
      const secondTeamPo = matchCode.slice(5, 7);
      const first = teamsByName.find(x => x.koPosition === firstTeamPo);
      const second = teamsByName.find(x => x.koPosition === secondTeamPo);
      return [first, second];
    } else if (stateLevel < 12) {
      // quarter
      const quarterIndex = parseInt(levelToMatchCode.at(stateLevel)) - 1;
      const quarterKey = [
        ["1B v 3F", "1A v 2C"],
        ["1F v 3C", "2D v 2E"],
        ["1E v 3D", "1D v 2F"],
        ["1C v 3E", "2A v 2B"],
      ];
      const firstKey = quarterKey.at(quarterIndex).at(0);
      const secondKey = quarterKey.at(quarterIndex).at(1);
      const firstTeam = selectionHistory
        .find(x => x.matchCode === firstKey)
        .selection.at(0);
      const secondTeam = selectionHistory
        .find(x => x.matchCode === secondKey)
        .selection.at(0);
      return [firstTeam, secondTeam];
    } else if (stateLevel < 14) {
      // semi
      const quarterFinalWinners = [1, 2, 3, 4].map(x =>
        selectionHistory
          .find(selec => selec.matchCode === x.toString())
          .selection.at(0)
      );
      /*
      if (stateLevel === 20) {
        return [quarterFinalWinners.at(0), quarterFinalWinners.at(1)];
      }*/
      return stateLevel === 12
        ? [quarterFinalWinners.at(0), quarterFinalWinners.at(1)]
        : [quarterFinalWinners.at(2), quarterFinalWinners.at(3)];
    } else if (stateLevel < 23) {
      /*else if (stateLevel < 23) {
      // third
      const quarterFinalWinners = [1, 2, 3, 4].map(x =>
        selectionHistory
          .find(selec => selec.matchCode === x.toString())
          .selection.at(0)
      );
      const s1Winner = selectionHistory
        .find(x => x.matchCode === "S1")
        .selection.at(0);
      const s2Winner = selectionHistory
        .find(x => x.matchCode === "S2")
        .selection.at(0);
      const thirdTeams = quarterFinalWinners.filter(
        x => x !== s1Winner && x !== s2Winner
      );
      return thirdTeams;
    }*/
      //final
      const s1Winner = selectionHistory
        .find(x => x.matchCode === "S1")
        .selection.at(0);
      const s2Winner = selectionHistory
        .find(x => x.matchCode === "S2")
        .selection.at(0);

      return [s1Winner, s2Winner];
    } else {
      const s1Winner = selectionHistory
        .find(x => x.matchCode === "S1")
        .selection.at(0);
      const s2Winner = selectionHistory
        .find(x => x.matchCode === "S2")
        .selection.at(0);
      const champion = selectionHistory
        .find(x => x.matchCode === "Final")
        .selection.at(0);
      const runnerUp = s1Winner === champion ? s2Winner : s1Winner;
      const third = selectionHistory
        .find(x => x.matchCode === "TP")
        .selection.at(0);

      return [champion, runnerUp, third];
    }
  }, [stateLevel, selectionHistory]);

  const maxTeams = teams.length / 2;

  // code for advancing the state, ends by setting state level to plus one and clearing selection
  const advanceState = () => {
    //"1B v 2A"
    const levelKey = levelToMatchCode.at(stateLevel);
    const groupFormatTeam = selection.map(x =>
      teamsByName.find(team => x === team.name)
    );
    // assigns {matchCode: "1B v 2A", selection: {name: , short: ...}}
    const levelSelection = { matchCode: levelKey, selection: groupFormatTeam };

    //copy selection history push levelSelection onto it and set that as the new seleciton history
    let currSelectHistory = selectionHistory.slice();
    currSelectHistory.push(levelSelection);
    setSelectionHistory(currSelectHistory);

    // if state level is equal to or over 8, add teams (memoized above) to the teamsHistory
    if (stateLevel >= 8) {
      let currTeamsHistory = teamsHistory.slice();
      currTeamsHistory.push(teams);
      setTeamsHistory(currTeamsHistory);
    }
    setStateLevel(stateLevel + 1);
    setSelection([]);
  };

  //selection logic, kicks a team off of the selection list if there are too many selected for the round
  const onSelect = name => {
    const currentSelection = selection.slice();
    if (!(currentSelection.includes(name) && currentSelection.length === 1)) {
      if (currentSelection.length === maxTeams) {
        currentSelection.shift();
      }
      currentSelection.push(name);
    }
    setSelection(currentSelection);
  };

  /*
  old header text from wc
         stateLevel < 8
        ? `Select 2 teams from Group ${levelKey}`
        */
  // header text per level
  const headerText = useMemo(() => {
    const levelKey = levelToMatchCode.at(stateLevel);
    const text =
      stateLevel < 8
        ? `Round of 16:  ${levelKey}`
        : stateLevel < 12
        ? `Quarterfinal Match ${levelKey}`
        : stateLevel < 14
        ? "Semifinal"
        : "Final";
    return text;
  }, [stateLevel]);

  // checks if the user has selected enough teams for the round, enables next button
  const nextEnabled = selection.length === maxTeams;

  // return logic of the state engine, return bracketView if the boolean is flipped,
  // else display final view (podium finishers) if level is equal to length of levels list
  // else display selection view
  return bracketView ? (
    <BracketView teamsHistory={teamsHistory} topThree={teams} />
  ) : stateLevel === levelToMatchCode.length ? (
    <FinalView
      teams={teams}
      titleText="Final Results"
      onNext={setBracketView}
      setView={setView}
    />
  ) : (
    <SelectionView
      level={stateLevel}
      teams={teams}
      titleText={headerText}
      onNext={advanceState}
      onSelect={onSelect}
      selected={selection}
      nextEnabled={nextEnabled}
    />
  );
};
