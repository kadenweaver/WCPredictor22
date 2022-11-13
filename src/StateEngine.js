import React, { useState, useMemo } from "react";
import { groups, teamsByName } from "./Groups";
import { SelectionView } from "./SelectionView";
import { FinalView } from "./FinalView";
import { BracketView } from "./BracketView";

const levelToMatchCode = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "1A v 2B",
  "1B v 2A",
  "1C v 2D",
  "1D v 2C",
  "1E v 2F",
  "1F v 2E",
  "1G v 2H",
  "1H v 2G",
  "1",
  "2",
  "3",
  "4",
  "S1",
  "S2",
  "TP",
  "Final",
];

export const StateEngine = () => {
  const [stateLevel, setStateLevel] = useState(0);
  const [selection, setSelection] = useState([]);
  const [selectionHistory, setSelectionHistory] = useState([]);
  const [teamsHistory, setTeamsHistory] = useState([])
  const [bracketView, setBracketView] = useState(false);
  const teams = useMemo(() => {
    if (stateLevel < 8) {
      const group = groups.at(stateLevel);

      return group.teams;
    } else if (stateLevel < 16) {
      //ro16
      const ro16index = stateLevel - 8;
      const first = selectionHistory[ro16index].selection.at(0);
      const secondIndex = ro16index % 2 === 0 ? ro16index + 1 : ro16index - 1;
      const second = selectionHistory[secondIndex].selection.at(1);
      return [first, second];
    } else if (stateLevel < 20) {
      // quarter
      const quarterIndex = parseInt(levelToMatchCode.at(stateLevel)) - 1;
      const quarterKey = [
        ["1A v 2B", "1C v 2D"],
        ["1E v 2F", "1G v 2H"],
        ["1B v 2A", "1D v 2C"],
        ["1F v 2E", "1H v 2G"],
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
    } else if (stateLevel < 22) {
      // semi
      const quarterFinalWinners = [1, 2, 3, 4].map(x =>
        selectionHistory
          .find(selec => selec.matchCode === x.toString())
          .selection.at(0)
      );
      if (stateLevel === 20) {
        return [quarterFinalWinners.at(0), quarterFinalWinners.at(1)];
      }
      return [quarterFinalWinners.at(2), quarterFinalWinners.at(3)];
    } else if (stateLevel < 23) {
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
    } else if (stateLevel < 24) {
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

  const advanceState = () => {
    const levelKey = levelToMatchCode.at(stateLevel);
    const groupFormatTeam = selection.map(x =>
      teamsByName.find(team => x === team.name)
    );
    const levelSelection = { matchCode: levelKey, selection: groupFormatTeam };

    let currSelectHistory = selectionHistory.slice();
    currSelectHistory.push(levelSelection);
    setSelectionHistory(currSelectHistory);

    if(stateLevel >= 8){
      console.log(teams)
      console.log(`adding ${teams} to teams`)
      let currTeamsHistory = teamsHistory.slice()
      currTeamsHistory.push(teams)
      setTeamsHistory(currTeamsHistory)
    }
    setStateLevel(stateLevel + 1);
    setSelection([]);
  };

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

  const headerText = useMemo(() => {
    const levelKey = levelToMatchCode.at(stateLevel);
    const text =
      stateLevel < 8
        ? `Select 2 teams from Group ${levelKey}`
        : stateLevel < 16
        ? `Round of 16:  ${levelKey}`
        : stateLevel < 20
        ? `Quartefinal Match ${levelKey}`
        : stateLevel < 22
        ? "Semifinal"
        : stateLevel < 23
        ? "Third Place Match"
        : "Final";
    return text;
  }, [stateLevel]);

  const nextEnabled = selection.length === maxTeams;

  return bracketView ? (
    <BracketView teamsHistory={teamsHistory} topThree={teams}/>
  ) : stateLevel === levelToMatchCode.length ? (
    <FinalView teams={teams} titleText="Final Results" onNext={setBracketView}/>
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
