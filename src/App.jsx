import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";

const TOURNAMENTS = [
  {
    id: "world-cup-2026",
    name: "World Cup 2026",
    description: "48 teams. Build your knockout path from group standings to champion.",
  },
  {
    id: "champions-league-25-26",
    name: "Champions League 25/26",
    description: "Round of 16 to Final. Pick every knockout winner in bracket order.",
  },
];

const I18N = {
  en: {
    "brand.name": "Bracket Money",
    "landing.title": "Choose your tournament",
    "landing.subtitle": "Build World Cup 2026 groups and knockout picks, or run a direct UCL knockout bracket.",
    "landing.build": "Build bracket",
    "tournament.world-cup-2026.name": "World Cup 2026",
    "tournament.world-cup-2026.description": "48 teams. Build your knockout path from group standings to champion.",
    "tournament.champions-league-25-26.name": "Champions League 25/26",
    "tournament.champions-league-25-26.description": "Round of 16 to Final. Pick every knockout winner in bracket order.",
    "progress.tournament": "Tournament",
    "progress.groups": "Groups",
    "progress.bestThirds": "Best Thirds",
    "progress.round32": "Round of 32",
    "progress.round16": "Round of 16",
    "progress.quarters": "Quarterfinals",
    "progress.semis": "Semifinals",
    "progress.thirdPlace": "Third Place",
    "progress.final": "Final",
    "progress.champion": "Champion",
    "groups.title": "Group {group}",
    "groups.subtitle": "Drag teams into your final order. Top 2 advance, third is in the wild-card mix.",
    "groups.legendTop2": "Top 2: automatic advance",
    "groups.legendThird": "3rd: best-third consideration",
    "groups.legendFourth": "4th: eliminated",
    "groups.standingsTitle": "Group {group} standings",
    "groups.standingsHint": "Drag and drop, or use arrow buttons for precise ordering.",
    "groups.next": "Save Group {group} and continue",
    "groups.nextThirds": "Choose best third-place teams",
    "thirds.title": "Rank third-place teams",
    "thirds.subtitle": "Rank all third-place teams. The top 8 move into the Round of 32.",
    "thirds.rankingTitle": "Third-place ranking",
    "thirds.rankingHint": "Top 8 qualify. Positions 9-12 are eliminated.",
    "thirds.generate": "Generate Round of 32",
    "r32.subtitle": "Pick one winner from every match to build the Round of 16.",
    "r16.subtitle": "Winners here advance to the quarterfinals.",
    "quarters.subtitle": "Four matches left before the semifinals.",
    "semis.subtitleWc": "Pick finalists. The losing teams will play for third place.",
    "next.r16": "Continue to Round of 16",
    "next.quarters": "Continue to Quarterfinals",
    "next.semis": "Continue to Semifinals",
    "next.thirdPlace": "Set up third-place match",
    "thirdPlace.title": "Third-place match",
    "thirdPlace.subtitle": "Penultimate step: choose who finishes third in your tournament.",
    "thirdPlace.nextFinal": "Continue to final",
    "final.title": "Final",
    "final.subtitleWc": "Pick your world champion.",
    "final.subtitleUcl": "Pick the champion of Europe.",
    "finish.bracket": "Finish bracket",
    "snapshot.wc.title": "Your final bracket snapshot",
    "snapshot.wc.subtitle": "Screenshot this card to share your picks.",
    "snapshot.ucl.title": "Champions League bracket snapshot",
    "snapshot.ucl.subtitle": "Screenshot this card to share your UCL picks.",
    "podium.champion": "Champion",
    "podium.runnerUp": "Runner-up",
    "podium.third": "Third Place",
    "summary.r32": "Round of 32 winners",
    "summary.r16": "Round of 16 winners",
    "summary.qf": "Quarterfinal winners",
    "summary.sf": "Semifinal winners",
    "cta.another": "Build another bracket",
    "ucl.r16.title": "Champions League Round of 16",
    "ucl.r16.subtitle": "Pick one winner in each tie to build the quarterfinals.",
    "ucl.qf.title": "Champions League Quarterfinals",
    "ucl.qf.subtitle": "Quarterfinal winners advance to the semifinals.",
    "ucl.sf.title": "Champions League Semifinals",
    "ucl.sf.subtitle": "Choose the two finalists.",
    "next.final": "Continue to Final",
    "ucl.board.title": "Champions League 25/26",
    "ucl.board.winner": "Winner",
    "ucl.board.footer": "made on bracketmoney.com",
    "ucl.board.loading": "Rendering bracket image...",
    "ucl.board.unavailable": "PNG unavailable",
  },
  es: {
    "brand.name": "Bracket Money",
    "landing.title": "Elige tu torneo",
    "landing.subtitle": "Arma grupos y eliminatorias del Mundial 2026, o juega una llave directa de la UCL.",
    "landing.build": "Crear bracket",
    "tournament.world-cup-2026.name": "Mundial 2026",
    "tournament.world-cup-2026.description": "48 equipos. Lleva tu bracket desde grupos hasta el campeón.",
    "tournament.champions-league-25-26.name": "Champions League 25/26",
    "tournament.champions-league-25-26.description": "De octavos a final. Elige cada ganador del cuadro.",
    "progress.tournament": "Torneo",
    "progress.groups": "Grupos",
    "progress.bestThirds": "Mejores terceros",
    "progress.round32": "Dieciseisavos",
    "progress.round16": "Octavos",
    "progress.quarters": "Cuartos",
    "progress.semis": "Semifinales",
    "progress.thirdPlace": "Tercer puesto",
    "progress.final": "Final",
    "progress.champion": "Campeón",
    "groups.title": "Grupo {group}",
    "groups.subtitle": "Arrastra equipos al orden final. Los 2 primeros avanzan; el 3ro puede clasificar.",
    "groups.legendTop2": "Top 2: clasificación directa",
    "groups.legendThird": "3ro: opción de mejor tercero",
    "groups.legendFourth": "4to: eliminado",
    "groups.standingsTitle": "Posiciones Grupo {group}",
    "groups.standingsHint": "Arrastra y suelta, o usa flechas para ajustar.",
    "groups.next": "Guardar Grupo {group} y continuar",
    "groups.nextThirds": "Elegir mejores terceros",
    "thirds.title": "Ordena los terceros puestos",
    "thirds.subtitle": "Ordena todos los terceros. Los mejores 8 van a dieciseisavos.",
    "thirds.rankingTitle": "Ranking de terceros",
    "thirds.rankingHint": "Top 8 clasifica. Puestos 9-12 eliminados.",
    "thirds.generate": "Generar dieciseisavos",
    "r32.subtitle": "Elige un ganador por partido para formar octavos.",
    "r16.subtitle": "Los ganadores avanzan a cuartos.",
    "quarters.subtitle": "Cuatro partidos antes de semifinales.",
    "semis.subtitleWc": "Elige finalistas. Los perdedores juegan por el tercer puesto.",
    "next.r16": "Ir a octavos",
    "next.quarters": "Ir a cuartos",
    "next.semis": "Ir a semifinales",
    "next.thirdPlace": "Configurar tercer puesto",
    "thirdPlace.title": "Partido por el tercer puesto",
    "thirdPlace.subtitle": "Paso previo: decide quién queda tercero.",
    "thirdPlace.nextFinal": "Ir a la final",
    "final.title": "Final",
    "final.subtitleWc": "Elige al campeón mundial.",
    "final.subtitleUcl": "Elige al campeón de Europa.",
    "finish.bracket": "Finalizar bracket",
    "snapshot.wc.title": "Resumen final de tu bracket",
    "snapshot.wc.subtitle": "Haz captura y comparte tus picks.",
    "snapshot.ucl.title": "Resumen del bracket de Champions",
    "snapshot.ucl.subtitle": "Haz captura y comparte tus picks de UCL.",
    "podium.champion": "Campeón",
    "podium.runnerUp": "Subcampeón",
    "podium.third": "Tercer puesto",
    "summary.r32": "Ganadores de dieciseisavos",
    "summary.r16": "Ganadores de octavos",
    "summary.qf": "Ganadores de cuartos",
    "summary.sf": "Ganadores de semifinales",
    "cta.another": "Crear otro bracket",
    "ucl.r16.title": "Champions League Octavos",
    "ucl.r16.subtitle": "Elige un ganador por cruce para formar cuartos.",
    "ucl.qf.title": "Champions League Cuartos",
    "ucl.qf.subtitle": "Los ganadores avanzan a semifinales.",
    "ucl.sf.title": "Champions League Semifinales",
    "ucl.sf.subtitle": "Elige a los dos finalistas.",
    "next.final": "Ir a la final",
    "ucl.board.title": "Champions League 25/26",
    "ucl.board.winner": "Ganador",
    "ucl.board.footer": "hecho en bracketmoney.com",
    "ucl.board.loading": "Generando imagen del bracket...",
    "ucl.board.unavailable": "PNG no disponible",
  },
};

const WC26_GROUPS = [
  {
    group: "A",
    teams: [
      { id: "mexico", name: "Mexico", flag: "🇲🇽" },
      { id: "south-africa", name: "South Africa", flag: "🇿🇦" },
      { id: "korea-republic", name: "Korea Republic", flag: "🇰🇷" },
      { id: "denmark", name: "Denmark", flag: "🇩🇰" },
    ],
  },
  {
    group: "B",
    teams: [
      { id: "canada", name: "Canada", flag: "🇨🇦" },
      { id: "italy", name: "Italy", flag: "🇮🇹" },
      { id: "qatar", name: "Qatar", flag: "🇶🇦" },
      { id: "switzerland", name: "Switzerland", flag: "🇨🇭" },
    ],
  },
  {
    group: "C",
    teams: [
      { id: "brazil", name: "Brazil", flag: "🇧🇷" },
      { id: "morocco", name: "Morocco", flag: "🇲🇦" },
      { id: "haiti", name: "Haiti", flag: "🇭🇹" },
      { id: "scotland", name: "Scotland", flag: "🏴" },
    ],
  },
  {
    group: "D",
    teams: [
      { id: "united-states", name: "United States", flag: "🇺🇸" },
      { id: "paraguay", name: "Paraguay", flag: "🇵🇾" },
      { id: "australia", name: "Australia", flag: "🇦🇺" },
      { id: "turkiye", name: "Türkiye", flag: "🇹🇷" },
    ],
  },
  {
    group: "E",
    teams: [
      { id: "germany", name: "Germany", flag: "🇩🇪" },
      { id: "curacao", name: "Curaçao", flag: "🇨🇼" },
      { id: "cote-divoire", name: "Côte d'Ivoire", flag: "🇨🇮" },
      { id: "ecuador", name: "Ecuador", flag: "🇪🇨" },
    ],
  },
  {
    group: "F",
    teams: [
      { id: "netherlands", name: "Netherlands", flag: "🇳🇱" },
      { id: "japan", name: "Japan", flag: "🇯🇵" },
      { id: "poland", name: "Poland", flag: "🇵🇱" },
      { id: "tunisia", name: "Tunisia", flag: "🇹🇳" },
    ],
  },
  {
    group: "G",
    teams: [
      { id: "belgium", name: "Belgium", flag: "🇧🇪" },
      { id: "egypt", name: "Egypt", flag: "🇪🇬" },
      { id: "iran", name: "IR Iran", flag: "🇮🇷" },
      { id: "new-zealand", name: "New Zealand", flag: "🇳🇿" },
    ],
  },
  {
    group: "H",
    teams: [
      { id: "spain", name: "Spain", flag: "🇪🇸" },
      { id: "cabo-verde", name: "Cabo Verde", flag: "🇨🇻" },
      { id: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦" },
      { id: "uruguay", name: "Uruguay", flag: "🇺🇾" },
    ],
  },
  {
    group: "I",
    teams: [
      { id: "france", name: "France", flag: "🇫🇷" },
      { id: "senegal", name: "Senegal", flag: "🇸🇳" },
      { id: "bolivia", name: "Bolivia", flag: "🇧🇴" },
      { id: "norway", name: "Norway", flag: "🇳🇴" },
    ],
  },
  {
    group: "J",
    teams: [
      { id: "argentina", name: "Argentina", flag: "🇦🇷" },
      { id: "algeria", name: "Algeria", flag: "🇩🇿" },
      { id: "austria", name: "Austria", flag: "🇦🇹" },
      { id: "jordan", name: "Jordan", flag: "🇯🇴" },
    ],
  },
  {
    group: "K",
    teams: [
      { id: "portugal", name: "Portugal", flag: "🇵🇹" },
      { id: "dr-congo", name: "DR Congo", flag: "🇨🇩" },
      { id: "uzbekistan", name: "Uzbekistan", flag: "🇺🇿" },
      { id: "colombia", name: "Colombia", flag: "🇨🇴" },
    ],
  },
  {
    group: "L",
    teams: [
      { id: "england", name: "England", flag: "🏴" },
      { id: "croatia", name: "Croatia", flag: "🇭🇷" },
      { id: "ghana", name: "Ghana", flag: "🇬🇭" },
      { id: "panama", name: "Panama", flag: "🇵🇦" },
    ],
  },
];

const UCL_TEAMS = [
  { id: "psg", name: "Paris Saint-Germain", icon: "/paris_saint_germain.png" },
  { id: "chelsea", name: "Chelsea", icon: "/chelsea.svg" },
  { id: "galatasaray", name: "Galatasaray", icon: "/galatasaray.png" },
  { id: "liverpool", name: "Liverpool", icon: "/liverpool.png" },
  { id: "real-madrid", name: "Real Madrid", icon: "/real_madrid.svg" },
  { id: "man-city", name: "Manchester City", icon: "/manchester_city.svg" },
  { id: "atalanta", name: "Atalanta", icon: "/atalanta.png" },
  { id: "bayern", name: "Bayern Munich", icon: "/bayern_munich.png" },
  { id: "newcastle", name: "Newcastle United", icon: "/newcastle_united.svg" },
  { id: "barcelona", name: "Barcelona", icon: "/barcelona.png" },
  { id: "atletico", name: "Atlético Madrid", icon: "/atletico_madrid.svg" },
  { id: "tottenham", name: "Tottenham Hotspur", icon: "/tottenham_hotspur.svg" },
  { id: "bodo-glimt", name: "Bodø/Glimt", icon: "/bodo_glimt.png" },
  { id: "sporting", name: "Sporting CP", icon: "/sporting_cp.svg" },
  { id: "bayer-leverkusen", name: "Bayer Leverkusen", icon: "/bayer_leverkusen.png" },
  { id: "arsenal", name: "Arsenal", icon: "/arsenal.svg" },
];

const UCL_ROUND16_MATCHES = [
  { id: "UCL-R16-1", home: "psg", away: "chelsea" },
  { id: "UCL-R16-2", home: "galatasaray", away: "liverpool" },
  { id: "UCL-R16-3", home: "real-madrid", away: "man-city" },
  { id: "UCL-R16-4", home: "atalanta", away: "bayern" },
  { id: "UCL-R16-5", home: "newcastle", away: "barcelona" },
  { id: "UCL-R16-6", home: "atletico", away: "tottenham" },
  { id: "UCL-R16-7", home: "bodo-glimt", away: "sporting" },
  { id: "UCL-R16-8", home: "bayer-leverkusen", away: "arsenal" },
];

const PLACE_CLASSES = ["place-first", "place-second", "place-third", "place-fourth"];

const buildInitialGroupOrders = () =>
  Object.fromEntries(WC26_GROUPS.map((group) => [group.group, group.teams.map((team) => team.id)]));

const isSameTeamSet = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }

  const left = [...a].sort().join("|");
  const right = [...b].sort().join("|");
  return left === right;
};

const reorderList = (list, fromIndex, toIndex) => {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
    return list;
  }

  const updated = [...list];
  const [moved] = updated.splice(fromIndex, 1);
  updated.splice(toIndex, 0, moved);
  return updated;
};

const TeamIcon = ({ team }) => {
  if (!team) {
    return null;
  }

  if (team.icon) {
    return (
      <span className="team-crest-shell" aria-hidden="true">
        <img className="team-crest" src={team.icon} alt="" />
      </span>
    );
  }

  return (
    <span className="team-flag" aria-hidden="true">
      {team.flag}
    </span>
  );
};

const ReorderBoard = ({ title, items, teamById, onReorder, hint, rankClassResolver }) => {
  const [dragIndex, setDragIndex] = useState(null);

  const moveByStep = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) {
      return;
    }

    onReorder(reorderList(items, index, target));
  };

  return (
    <section className="board">
      <h2>{title}</h2>
      {hint && <p className="board-hint">{hint}</p>}
      <ul className="team-list" role="list">
        {items.map((teamId, index) => {
          const team = teamById[teamId];
          return (
            <li
              key={teamId}
              className={`team-row ${(rankClassResolver ? rankClassResolver(index) : PLACE_CLASSES[index]) || ""}`.trim()}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (dragIndex === null) {
                  return;
                }

                onReorder(reorderList(items, dragIndex, index));
                setDragIndex(null);
              }}
              onDragEnd={() => setDragIndex(null)}
            >
              <span className="drag-handle" aria-hidden="true">
                ⋮⋮
              </span>
              <span className="row-rank">{index + 1}</span>
              <TeamIcon team={team} />
              <span className="team-name">{team.name}</span>
              <div className="move-controls">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => moveByStep(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${team.name} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => moveByStep(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label={`Move ${team.name} down`}
                >
                  ↓
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const ProgressStrip = ({ stage, groupIndex, steps }) => {
  const currentIndex = steps.findIndex((item) => item.id === stage);
  return (
    <div className="progress-strip" aria-label="Tournament progress">
      {steps.map((item, index) => {
        const isActive = index === currentIndex;
        const isDone = index < currentIndex;
        const label =
          item.id === "groups" && stage === "groups"
            ? `${item.label} ${groupIndex + 1}/${WC26_GROUPS.length}`
            : item.label;

        return (
          <span
            key={item.id}
            className={`progress-step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`.trim()}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
};

const MatchCard = ({ match, teamById, winnerId, onPick }) => {
  const left = match.home ? teamById[match.home] : null;
  const right = match.away ? teamById[match.away] : null;

  return (
    <article className="match-card">
      <p className="match-id">{match.id}</p>
      <div className="match-teams">
        {[left, right].map((team, slotIndex) => {
          const isSelected = team && winnerId === team.id;
          return (
            <button
              key={team ? team.id : `${match.id}-slot-${slotIndex}`}
              type="button"
              className={`team-pick ${isSelected ? "selected" : ""}`.trim()}
              onClick={() => {
                if (team) {
                  onPick(match.id, team.id);
                }
              }}
              disabled={!team}
            >
              {team ? (
                <>
                  <TeamIcon team={team} />
                  <span className="team-pick-name">{team.name}</span>
                </>
              ) : (
                <span>TBD</span>
              )}
            </button>
          );
        })}
      </div>
    </article>
  );
};

const KnockoutRound = ({ title, subtitle, matches, picks, onPick, onContinue, continueLabel, teamById, brand }) => {
  const canContinue = matches.length > 0 && matches.every((match) => picks[match.id]);

  return (
    <section className="screen-card">
      <p className="eyebrow">{brand}</p>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
      <div className="match-grid">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            teamById={teamById}
            winnerId={picks[match.id]}
            onPick={onPick}
          />
        ))}
      </div>
      <button type="button" className="primary-cta" onClick={onContinue} disabled={!canContinue}>
        {continueLabel}
      </button>
    </section>
  );
};

const TEAM_BY_ID = Object.fromEntries([
  ...WC26_GROUPS.flatMap((group) => group.teams.map((team) => [team.id, { ...team, group: group.group }])),
  ...UCL_TEAMS.map((team) => [team.id, team]),
]);

const getRunnerUp = (winnerId, match) => {
  if (!winnerId || !match.home || !match.away) {
    return null;
  }

  return winnerId === match.home ? match.away : match.home;
};

const UCL_SHORT_NAMES = {
  psg: "PSG",
  chelsea: "Chelsea",
  galatasaray: "Galatasaray",
  liverpool: "Liverpool",
  "real-madrid": "Real Madrid",
  "man-city": "Man City",
  atalanta: "Atalanta",
  bayern: "Bayern",
  newcastle: "Newcastle",
  barcelona: "Barcelona",
  atletico: "Atletico",
  tottenham: "Tottenham",
  "bodo-glimt": "Bodo/Glimt",
  sporting: "Sporting",
  "bayer-leverkusen": "Leverkusen",
  arsenal: "Arsenal",
};

const UclBracketBoard = ({
  teamById,
  round16Matches,
  round16Picks,
  quarterPicks,
  semiPicks,
  champion,
  titleText,
  winnerText,
  footerText,
  loadingText,
  unavailableText,
}) => {
  const svgRef = useRef(null);
  const [pngSrc, setPngSrc] = useState("");
  const [isPngLoading, setIsPngLoading] = useState(true);
  const [pngFailed, setPngFailed] = useState(false);
  const boxW = 170;
  const boxH = 34;
  const leftR16X = 20;
  const leftQFX = 230;
  const leftSFX = 440;
  const leftFinalistX = 600;
  const championX = 695;
  const rightFinalistX = 790;
  const rightSFX = 950;
  const rightQFX = 1160;
  const rightR16X = 1370;

  const leftR16Join = 210;
  const leftQFJoin = 420;
  const leftSFJoin = 580;
  const rightR16Join = 1360;
  const rightQFJoin = 1150;
  const rightSFJoin = 940;

  const r16Y = [130, 188, 246, 304, 362, 420, 478, 536];
  const qfY = [159, 275, 391, 507];
  const sfY = [217, 449];
  const finalistY = 333;
  const championY = 250;

  const leftR16 = round16Matches.slice(0, 4).flatMap((match) => [
    { teamId: match.home, matchId: match.id },
    { teamId: match.away, matchId: match.id },
  ]);
  const rightR16 = round16Matches.slice(4).flatMap((match) => [
    { teamId: match.home, matchId: match.id },
    { teamId: match.away, matchId: match.id },
  ]);

  const leftQF = [
    { teamId: round16Picks["UCL-R16-1"] || null, matchId: "UCL-QF-1" },
    { teamId: round16Picks["UCL-R16-2"] || null, matchId: "UCL-QF-1" },
    { teamId: round16Picks["UCL-R16-3"] || null, matchId: "UCL-QF-2" },
    { teamId: round16Picks["UCL-R16-4"] || null, matchId: "UCL-QF-2" },
  ];
  const rightQF = [
    { teamId: round16Picks["UCL-R16-5"] || null, matchId: "UCL-QF-3" },
    { teamId: round16Picks["UCL-R16-6"] || null, matchId: "UCL-QF-3" },
    { teamId: round16Picks["UCL-R16-7"] || null, matchId: "UCL-QF-4" },
    { teamId: round16Picks["UCL-R16-8"] || null, matchId: "UCL-QF-4" },
  ];

  const leftSF = [
    { teamId: quarterPicks["UCL-QF-1"] || null, matchId: "UCL-SF-1" },
    { teamId: quarterPicks["UCL-QF-2"] || null, matchId: "UCL-SF-1" },
  ];
  const rightSF = [
    { teamId: quarterPicks["UCL-QF-3"] || null, matchId: "UCL-SF-2" },
    { teamId: quarterPicks["UCL-QF-4"] || null, matchId: "UCL-SF-2" },
  ];

  const finalists = [
    { teamId: semiPicks["UCL-SF-1"] || null, side: "left" },
    { teamId: semiPicks["UCL-SF-2"] || null, side: "right" },
  ];

  const isEliminatedAtStage = (teamId, stageMatchId) => {
    if (!teamId) {
      return false;
    }

    const winners = {
      "UCL-R16-1": round16Picks["UCL-R16-1"],
      "UCL-R16-2": round16Picks["UCL-R16-2"],
      "UCL-R16-3": round16Picks["UCL-R16-3"],
      "UCL-R16-4": round16Picks["UCL-R16-4"],
      "UCL-R16-5": round16Picks["UCL-R16-5"],
      "UCL-R16-6": round16Picks["UCL-R16-6"],
      "UCL-R16-7": round16Picks["UCL-R16-7"],
      "UCL-R16-8": round16Picks["UCL-R16-8"],
      "UCL-QF-1": quarterPicks["UCL-QF-1"],
      "UCL-QF-2": quarterPicks["UCL-QF-2"],
      "UCL-QF-3": quarterPicks["UCL-QF-3"],
      "UCL-QF-4": quarterPicks["UCL-QF-4"],
      "UCL-SF-1": semiPicks["UCL-SF-1"],
      "UCL-SF-2": semiPicks["UCL-SF-2"],
      "UCL-F": champion,
    };

    const winner = winners[stageMatchId];
    return Boolean(winner && winner !== teamId);
  };

  const renderTeamBox = ({ teamId, x, y, key, stageMatchId, championBox = false }) => {
    const team = teamId ? teamById[teamId] : null;
    const teamName = team ? UCL_SHORT_NAMES[team.id] || team.name : "TBD";
    const isEliminated = stageMatchId ? isEliminatedAtStage(teamId, stageMatchId) : false;
    const logoWidth = 22;
    const logoHeight = 22;
    const logoX = x + 8;
    const logoY = y + (boxH - logoHeight) / 2;

    return (
      <g key={key}>
        <rect x={x} y={y} width={boxW} height={boxH} rx={3} className={`ucl-svg-box ${championBox ? "champion" : ""}`.trim()} />
        {team?.icon ? (
          <image
            href={team.icon}
            x={logoX}
            y={logoY}
            width={logoWidth}
            height={logoHeight}
            preserveAspectRatio="xMidYMid meet"
            className="ucl-svg-logo"
          />
        ) : null}
        <text
          x={x + (team?.icon ? 34 : 8)}
          y={y + 22}
          className={`ucl-svg-team-name ${championBox ? "champion" : ""} ${isEliminated ? "eliminated struck" : ""}`.trim()}
        >
          {teamName}
        </text>
      </g>
    );
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) {
      return;
    }

    let isCancelled = false;

    const toDataUrl = (blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

    const buildPng = async () => {
      setIsPngLoading(true);
      setPngFailed(false);
      setPngSrc("");
      try {
        const clonedSvg = svgElement.cloneNode(true);
        clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        clonedSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

        const styleNode = document.createElementNS("http://www.w3.org/2000/svg", "style");
        styleNode.textContent = `
          .ucl-svg-bg { fill: #223a57; }
          .ucl-svg-line line { stroke: #ffffff; stroke-width: 3; }
          .ucl-svg-title { fill: #f0f4f8; font-size: 42px; font-weight: 500; letter-spacing: .04em; font-family: "DM Serif Display", Georgia, serif; }
          .ucl-svg-winner-label { fill: #f3e7bf; font-size: 15px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; font-family: "DM Serif Display", Georgia, serif; }
          .ucl-svg-box { fill: #ffffff; stroke: #d7dde5; stroke-width: 1.4; }
          .ucl-svg-box.champion { fill: #fff9e9; stroke: #cfad43; stroke-width: 2; }
          .ucl-svg-logo { width: 22px; height: 22px; }
          .ucl-svg-team-name { fill: #10233a; font-size: 14px; font-weight: 600; }
          .ucl-svg-team-name.champion { fill: #4a3c0f; }
          .ucl-svg-team-name.eliminated { fill: #67778a; }
          .ucl-svg-team-name.struck { text-decoration: line-through; text-decoration-color: currentColor; text-decoration-thickness: 1.5px; text-decoration-skip-ink: none; }
          .ucl-svg-footer { fill: rgba(240,244,248,.55); font-size: 14px; letter-spacing: .03em; }
        `;
        clonedSvg.insertBefore(styleNode, clonedSvg.firstChild);

        const imageNodes = Array.from(clonedSvg.querySelectorAll("image"));
        await Promise.all(
          imageNodes.map(async (imageNode) => {
            const href = imageNode.getAttribute("href") || imageNode.getAttribute("xlink:href");
            if (!href) {
              return;
            }

            const absoluteHref = href.startsWith("/") ? `${window.location.origin}${href}` : href;
            const response = await fetch(absoluteHref, { cache: "force-cache" });
            if (!response.ok) {
              return;
            }
            const blob = await response.blob();
            const dataUrl = await toDataUrl(blob);
            imageNode.setAttribute("href", dataUrl);
            imageNode.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", dataUrl);
          })
        );

        const serialized = new XMLSerializer().serializeToString(clonedSvg);
        const svgBlob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
        const blobUrl = URL.createObjectURL(svgBlob);
        const image = new Image();

        image.onload = () => {
          const viewBox = svgElement.viewBox.baseVal;
          const scale = Math.max(2, Math.min(4, Math.ceil(window.devicePixelRatio || 1) * 2));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(viewBox.width * scale);
          canvas.height = Math.round(viewBox.height * scale);
          const context = canvas.getContext("2d");

          if (!context || isCancelled) {
            URL.revokeObjectURL(blobUrl);
            return;
          }

          context.setTransform(1, 0, 0, 1, 0, 0);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";
          context.fillStyle = "#223a57";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          setPngSrc(canvas.toDataURL("image/png", 1));
          setIsPngLoading(false);
          URL.revokeObjectURL(blobUrl);
        };

        image.onerror = () => {
          URL.revokeObjectURL(blobUrl);
          if (!isCancelled) {
            setIsPngLoading(false);
            setPngFailed(true);
            setPngSrc("");
          }
        };

        image.src = blobUrl;
      } catch (error) {
        if (!isCancelled) {
          setIsPngLoading(false);
          setPngFailed(true);
          setPngSrc("");
        }
      }
    };

    buildPng();

    return () => {
      isCancelled = true;
    };
  }, [round16Matches, round16Picks, quarterPicks, semiPicks, champion, titleText, winnerText, footerText]);

  return (
    <div className="ucl-bracket-board">
      {isPngLoading ? <div className="ucl-bracket-loading">{loadingText}</div> : null}
      {pngSrc ? (
        <img
          src={pngSrc}
          alt="Champions League knockout bracket"
          className="ucl-bracket-image"
        />
      ) : null}
      {!isPngLoading && !pngSrc && pngFailed ? <div className="ucl-bracket-loading">{unavailableText}</div> : null}

      <svg
        ref={svgRef}
        viewBox="0 0 1560 620"
        className="ucl-bracket-svg is-source"
        role="img"
        aria-label="Champions League knockout bracket"
      >
        <rect x="0" y="0" width="1560" height="620" className="ucl-svg-bg" />
        <text x="780" y="82" textAnchor="middle" className="ucl-svg-title">
          {titleText}
        </text>
        <text x={championX + boxW / 2} y={championY - 10} textAnchor="middle" className="ucl-svg-winner-label">
          {winnerText}
        </text>

        {[0, 1, 2, 3].map((pair) => {
          const yTop = r16Y[pair * 2] + boxH / 2;
          const yBottom = r16Y[pair * 2 + 1] + boxH / 2;
          const yMid = qfY[pair] + boxH / 2;
          return (
            <g key={`left-r16-qf-${pair}`} className="ucl-svg-line">
              <line x1={leftR16X + boxW} y1={yTop} x2={leftR16Join} y2={yTop} />
              <line x1={leftR16X + boxW} y1={yBottom} x2={leftR16Join} y2={yBottom} />
              <line x1={leftR16Join} y1={yTop} x2={leftR16Join} y2={yBottom} />
              <line x1={leftR16Join} y1={yMid} x2={leftQFX} y2={yMid} />
            </g>
          );
        })}

        {[0, 1].map((pair) => {
          const yTop = qfY[pair * 2] + boxH / 2;
          const yBottom = qfY[pair * 2 + 1] + boxH / 2;
          const yMid = sfY[pair] + boxH / 2;
          return (
            <g key={`left-qf-sf-${pair}`} className="ucl-svg-line">
              <line x1={leftQFX + boxW} y1={yTop} x2={leftQFJoin} y2={yTop} />
              <line x1={leftQFX + boxW} y1={yBottom} x2={leftQFJoin} y2={yBottom} />
              <line x1={leftQFJoin} y1={yTop} x2={leftQFJoin} y2={yBottom} />
              <line x1={leftQFJoin} y1={yMid} x2={leftSFX} y2={yMid} />
            </g>
          );
        })}

        <g className="ucl-svg-line">
          <line x1={leftSFX + boxW} y1={sfY[0] + boxH / 2} x2={leftSFJoin} y2={sfY[0] + boxH / 2} />
          <line x1={leftSFX + boxW} y1={sfY[1] + boxH / 2} x2={leftSFJoin} y2={sfY[1] + boxH / 2} />
          <line x1={leftSFJoin} y1={sfY[0] + boxH / 2} x2={leftSFJoin} y2={sfY[1] + boxH / 2} />
          <line x1={leftSFJoin} y1={finalistY + boxH / 2} x2={leftFinalistX} y2={finalistY + boxH / 2} />
        </g>

        {[0, 1, 2, 3].map((pair) => {
          const yTop = r16Y[pair * 2] + boxH / 2;
          const yBottom = r16Y[pair * 2 + 1] + boxH / 2;
          const yMid = qfY[pair] + boxH / 2;
          return (
            <g key={`right-r16-qf-${pair}`} className="ucl-svg-line">
              <line x1={rightR16X} y1={yTop} x2={rightR16Join} y2={yTop} />
              <line x1={rightR16X} y1={yBottom} x2={rightR16Join} y2={yBottom} />
              <line x1={rightR16Join} y1={yTop} x2={rightR16Join} y2={yBottom} />
              <line x1={rightR16Join} y1={yMid} x2={rightQFX + boxW} y2={yMid} />
            </g>
          );
        })}

        {[0, 1].map((pair) => {
          const yTop = qfY[pair * 2] + boxH / 2;
          const yBottom = qfY[pair * 2 + 1] + boxH / 2;
          const yMid = sfY[pair] + boxH / 2;
          return (
            <g key={`right-qf-sf-${pair}`} className="ucl-svg-line">
              <line x1={rightQFX} y1={yTop} x2={rightQFJoin} y2={yTop} />
              <line x1={rightQFX} y1={yBottom} x2={rightQFJoin} y2={yBottom} />
              <line x1={rightQFJoin} y1={yTop} x2={rightQFJoin} y2={yBottom} />
              <line x1={rightQFJoin} y1={yMid} x2={rightSFX + boxW} y2={yMid} />
            </g>
          );
        })}

        <g className="ucl-svg-line">
          <line x1={rightSFX} y1={sfY[0] + boxH / 2} x2={rightSFJoin} y2={sfY[0] + boxH / 2} />
          <line x1={rightSFX} y1={sfY[1] + boxH / 2} x2={rightSFJoin} y2={sfY[1] + boxH / 2} />
          <line x1={rightSFJoin} y1={sfY[0] + boxH / 2} x2={rightSFJoin} y2={sfY[1] + boxH / 2} />
          <line x1={rightSFJoin} y1={finalistY + boxH / 2} x2={rightFinalistX + boxW} y2={finalistY + boxH / 2} />
        </g>

        {leftR16.map((slot, index) =>
          renderTeamBox({
            teamId: slot.teamId,
            stageMatchId: slot.matchId,
            x: leftR16X,
            y: r16Y[index],
            key: `left-r16-${index}`,
          })
        )}
        {rightR16.map((slot, index) =>
          renderTeamBox({
            teamId: slot.teamId,
            stageMatchId: slot.matchId,
            x: rightR16X,
            y: r16Y[index],
            key: `right-r16-${index}`,
          })
        )}
        {leftQF.map((slot, index) =>
          renderTeamBox({
            teamId: slot.teamId,
            stageMatchId: slot.matchId,
            x: leftQFX,
            y: qfY[index],
            key: `left-qf-${index}`,
          })
        )}
        {rightQF.map((slot, index) =>
          renderTeamBox({
            teamId: slot.teamId,
            stageMatchId: slot.matchId,
            x: rightQFX,
            y: qfY[index],
            key: `right-qf-${index}`,
          })
        )}
        {leftSF.map((slot, index) =>
          renderTeamBox({
            teamId: slot.teamId,
            stageMatchId: slot.matchId,
            x: leftSFX,
            y: sfY[index],
            key: `left-sf-${index}`,
          })
        )}
        {rightSF.map((slot, index) =>
          renderTeamBox({
            teamId: slot.teamId,
            stageMatchId: slot.matchId,
            x: rightSFX,
            y: sfY[index],
            key: `right-sf-${index}`,
          })
        )}
        {renderTeamBox({
          teamId: finalists[0].teamId,
          stageMatchId: "UCL-F",
          x: leftFinalistX,
          y: finalistY,
          key: "left-finalist",
        })}
        {renderTeamBox({
          teamId: finalists[1].teamId,
          stageMatchId: "UCL-F",
          x: rightFinalistX,
          y: finalistY,
          key: "right-finalist",
        })}
        {renderTeamBox({
          teamId: champion,
          x: championX,
          y: championY,
          key: "champion",
          championBox: true,
        })}

        <text x="780" y="590" textAnchor="middle" className="ucl-svg-footer">
          {footerText}
        </text>
      </svg>
    </div>
  );
};

const detectLocale = () => {
  if (typeof navigator === "undefined" || !navigator.language) {
    return "en";
  }

  const short = navigator.language.slice(0, 2).toLowerCase();
  return I18N[short] ? short : "en";
};

const translate = (locale, key, vars = {}) => {
  const text = (I18N[locale] && I18N[locale][key]) || I18N.en[key] || key;
  return text.replace(/\{(\w+)\}/g, (_, token) => String(vars[token] ?? ""));
};

const App = () => {
  const locale = useMemo(() => detectLocale(), []);
  const t = (key, vars) => translate(locale, key, vars);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [stage, setStage] = useState("landing");

  const [groupIndex, setGroupIndex] = useState(0);
  const [groupOrders, setGroupOrders] = useState(buildInitialGroupOrders);
  const [thirdRanking, setThirdRanking] = useState([]);

  const [round32Picks, setRound32Picks] = useState({});
  const [round16Picks, setRound16Picks] = useState({});
  const [quarterPicks, setQuarterPicks] = useState({});
  const [semiPicks, setSemiPicks] = useState({});
  const [thirdPlaceWinner, setThirdPlaceWinner] = useState(null);
  const [champion, setChampion] = useState(null);

  const [uclRound16Picks, setUclRound16Picks] = useState({});
  const [uclQuarterPicks, setUclQuarterPicks] = useState({});
  const [uclSemiPicks, setUclSemiPicks] = useState({});
  const [uclChampion, setUclChampion] = useState(null);

  const wcProgress = useMemo(
    () => [
      { id: "landing", label: t("progress.tournament") },
      { id: "groups", label: t("progress.groups") },
      { id: "thirds", label: t("progress.bestThirds") },
      { id: "round32", label: t("progress.round32") },
      { id: "round16", label: t("progress.round16") },
      { id: "quarters", label: t("progress.quarters") },
      { id: "semis", label: t("progress.semis") },
      { id: "third-place", label: t("progress.thirdPlace") },
      { id: "final", label: t("progress.final") },
      { id: "champion", label: t("progress.champion") },
    ],
    [locale]
  );

  const uclProgress = useMemo(
    () => [
      { id: "landing", label: t("progress.tournament") },
      { id: "ucl-round16", label: t("progress.round16") },
      { id: "ucl-quarters", label: t("progress.quarters") },
      { id: "ucl-semis", label: t("progress.semis") },
      { id: "ucl-final", label: t("progress.final") },
      { id: "ucl-champion", label: t("progress.champion") },
    ],
    [locale]
  );

  const progressSteps = selectedTournament?.id === "champions-league-25-26" ? uclProgress : wcProgress;

  const placements = useMemo(() => {
    return Object.fromEntries(
      WC26_GROUPS.map((group) => {
        const ordered = groupOrders[group.group];
        return [
          group.group,
          {
            first: ordered[0],
            second: ordered[1],
            third: ordered[2],
            fourth: ordered[3],
          },
        ];
      })
    );
  }, [groupOrders]);

  const thirdCandidates = useMemo(
    () => WC26_GROUPS.map((group) => placements[group.group].third),
    [placements]
  );

  useEffect(() => {
    if (stage !== "thirds") {
      return;
    }

    if (!isSameTeamSet(thirdRanking, thirdCandidates)) {
      setThirdRanking(thirdCandidates);
    }
  }, [stage, thirdRanking, thirdCandidates]);

  const round32Matches = useMemo(() => {
    if (thirdRanking.length < 8) {
      return [];
    }

    const q = thirdRanking.slice(0, 8);
    const first = (group) => placements[group].first;
    const second = (group) => placements[group].second;

    return [
      { id: "R32-1", home: first("A"), away: q[7] },
      { id: "R32-2", home: first("B"), away: q[6] },
      { id: "R32-3", home: first("C"), away: q[5] },
      { id: "R32-4", home: first("D"), away: q[4] },
      { id: "R32-5", home: first("E"), away: q[3] },
      { id: "R32-6", home: first("F"), away: q[2] },
      { id: "R32-7", home: first("G"), away: q[1] },
      { id: "R32-8", home: first("H"), away: q[0] },
      { id: "R32-9", home: first("I"), away: second("L") },
      { id: "R32-10", home: first("J"), away: second("K") },
      { id: "R32-11", home: first("K"), away: second("J") },
      { id: "R32-12", home: first("L"), away: second("I") },
      { id: "R32-13", home: second("A"), away: second("B") },
      { id: "R32-14", home: second("C"), away: second("D") },
      { id: "R32-15", home: second("E"), away: second("F") },
      { id: "R32-16", home: second("G"), away: second("H") },
    ];
  }, [placements, thirdRanking]);

  const round16Matches = useMemo(() => {
    const winner = (id) => round32Picks[id] || null;
    return [
      { id: "R16-1", home: winner("R32-1"), away: winner("R32-2") },
      { id: "R16-2", home: winner("R32-3"), away: winner("R32-4") },
      { id: "R16-3", home: winner("R32-5"), away: winner("R32-6") },
      { id: "R16-4", home: winner("R32-7"), away: winner("R32-8") },
      { id: "R16-5", home: winner("R32-9"), away: winner("R32-10") },
      { id: "R16-6", home: winner("R32-11"), away: winner("R32-12") },
      { id: "R16-7", home: winner("R32-13"), away: winner("R32-14") },
      { id: "R16-8", home: winner("R32-15"), away: winner("R32-16") },
    ];
  }, [round32Picks]);

  const quarterMatches = useMemo(() => {
    const winner = (id) => round16Picks[id] || null;
    return [
      { id: "QF-1", home: winner("R16-1"), away: winner("R16-2") },
      { id: "QF-2", home: winner("R16-3"), away: winner("R16-4") },
      { id: "QF-3", home: winner("R16-5"), away: winner("R16-6") },
      { id: "QF-4", home: winner("R16-7"), away: winner("R16-8") },
    ];
  }, [round16Picks]);

  const semiMatches = useMemo(() => {
    const winner = (id) => quarterPicks[id] || null;
    return [
      { id: "SF-1", home: winner("QF-1"), away: winner("QF-2") },
      { id: "SF-2", home: winner("QF-3"), away: winner("QF-4") },
    ];
  }, [quarterPicks]);

  const thirdPlaceMatch = useMemo(() => {
    const loser = (match) => {
      if (!match.home || !match.away) {
        return null;
      }

      const winner = semiPicks[match.id];
      if (!winner) {
        return null;
      }

      return winner === match.home ? match.away : match.home;
    };

    return {
      id: "3P",
      home: loser(semiMatches[0]),
      away: loser(semiMatches[1]),
    };
  }, [semiMatches, semiPicks]);

  const finalMatch = useMemo(() => {
    return {
      id: "F",
      home: semiPicks["SF-1"] || null,
      away: semiPicks["SF-2"] || null,
    };
  }, [semiPicks]);

  const runnerUp = useMemo(() => getRunnerUp(champion, finalMatch), [champion, finalMatch]);

  const uclQuarterMatches = useMemo(() => {
    const winner = (id) => uclRound16Picks[id] || null;
    return [
      { id: "UCL-QF-1", home: winner("UCL-R16-1"), away: winner("UCL-R16-2") },
      { id: "UCL-QF-2", home: winner("UCL-R16-3"), away: winner("UCL-R16-4") },
      { id: "UCL-QF-3", home: winner("UCL-R16-5"), away: winner("UCL-R16-6") },
      { id: "UCL-QF-4", home: winner("UCL-R16-7"), away: winner("UCL-R16-8") },
    ];
  }, [uclRound16Picks]);

  const uclSemiMatches = useMemo(() => {
    const winner = (id) => uclQuarterPicks[id] || null;
    return [
      { id: "UCL-SF-1", home: winner("UCL-QF-1"), away: winner("UCL-QF-2") },
      { id: "UCL-SF-2", home: winner("UCL-QF-3"), away: winner("UCL-QF-4") },
    ];
  }, [uclQuarterPicks]);

  const uclFinalMatch = useMemo(() => {
    return {
      id: "UCL-F",
      home: uclSemiPicks["UCL-SF-1"] || null,
      away: uclSemiPicks["UCL-SF-2"] || null,
    };
  }, [uclSemiPicks]);

  const uclRunnerUp = useMemo(() => getRunnerUp(uclChampion, uclFinalMatch), [uclChampion, uclFinalMatch]);

  const resetWorldCupFlow = () => {
    setGroupIndex(0);
    setGroupOrders(buildInitialGroupOrders());
    setThirdRanking([]);
    setRound32Picks({});
    setRound16Picks({});
    setQuarterPicks({});
    setSemiPicks({});
    setThirdPlaceWinner(null);
    setChampion(null);
  };

  const resetUclFlow = () => {
    setUclRound16Picks({});
    setUclQuarterPicks({});
    setUclSemiPicks({});
    setUclChampion(null);
  };

  const startTournament = () => {
    if (!selectedTournament) {
      return;
    }

    if (selectedTournament.id === "world-cup-2026") {
      resetWorldCupFlow();
      setStage("groups");
      return;
    }

    resetUclFlow();
    setStage("ucl-round16");
  };

  const resetToLanding = () => {
    setSelectedTournament(null);
    setStage("landing");
  };

  const currentGroup = WC26_GROUPS[groupIndex];

  const layout = (content) => (
    <main className="app-shell">
      <div className="app-frame">
        <ProgressStrip stage={stage} groupIndex={groupIndex} steps={progressSteps} />
        {content}
      </div>
    </main>
  );

  if (stage === "landing") {
    return layout(
      <section className="screen-card">
        <p className="eyebrow">{t("brand.name")}</p>
        <h1>{t("landing.title")}</h1>
        <p className="subtitle">{t("landing.subtitle")}</p>

        <div className="tournament-grid" role="list" aria-label="Tournament options">
          {TOURNAMENTS.map((tournament) => {
            const isSelected = selectedTournament?.id === tournament.id;
            return (
              <button
                key={tournament.id}
                type="button"
                className={`tournament-card ${isSelected ? "selected" : ""}`.trim()}
                onClick={() => setSelectedTournament(tournament)}
                aria-pressed={isSelected}
              >
                <span className="tournament-name">{t(`tournament.${tournament.id}.name`)}</span>
                <span className="tournament-description">{t(`tournament.${tournament.id}.description`)}</span>
              </button>
            );
          })}
        </div>

        <button type="button" className="primary-cta" onClick={startTournament} disabled={!selectedTournament}>
          {t("landing.build")}
        </button>
      </section>
    );
  }

  if (stage === "groups") {
    const isLastGroup = groupIndex === WC26_GROUPS.length - 1;
    const groupOrder = groupOrders[currentGroup.group];

    return layout(
      <section className="screen-card">
        <p className="eyebrow">{t("tournament.world-cup-2026.name")}</p>
        <h1>{t("groups.title", { group: currentGroup.group })}</h1>
        <p className="subtitle">{t("groups.subtitle")}</p>

        <div className="legend">
          <span className="legend-item first">{t("groups.legendTop2")}</span>
          <span className="legend-item third">{t("groups.legendThird")}</span>
          <span className="legend-item fourth">{t("groups.legendFourth")}</span>
        </div>

        <ReorderBoard
          title={t("groups.standingsTitle", { group: currentGroup.group })}
          hint={t("groups.standingsHint")}
          items={groupOrder}
          teamById={TEAM_BY_ID}
          onReorder={(nextOrder) =>
            setGroupOrders((previous) => ({
              ...previous,
              [currentGroup.group]: nextOrder,
            }))
          }
        />

        <button
          type="button"
          className="primary-cta"
          onClick={() => {
            if (isLastGroup) {
              setStage("thirds");
              return;
            }
            setGroupIndex((index) => index + 1);
          }}
        >
          {isLastGroup ? t("groups.nextThirds") : t("groups.next", { group: currentGroup.group })}
        </button>
      </section>
    );
  }

  if (stage === "thirds") {
    return layout(
      <section className="screen-card">
        <p className="eyebrow">{t("tournament.world-cup-2026.name")}</p>
        <h1>{t("thirds.title")}</h1>
        <p className="subtitle">{t("thirds.subtitle")}</p>

        <ReorderBoard
          title={t("thirds.rankingTitle")}
          hint={t("thirds.rankingHint")}
          items={thirdRanking}
          teamById={TEAM_BY_ID}
          onReorder={setThirdRanking}
          rankClassResolver={(index) => (index < 8 ? "place-qualify" : "place-fourth")}
        />

        <button
          type="button"
          className="primary-cta"
          onClick={() => {
            setRound32Picks({});
            setRound16Picks({});
            setQuarterPicks({});
            setSemiPicks({});
            setThirdPlaceWinner(null);
            setChampion(null);
            setStage("round32");
          }}
          disabled={thirdRanking.length !== 12}
        >
          {t("thirds.generate")}
        </button>
      </section>
    );
  }

  if (stage === "round32") {
    return layout(
      <KnockoutRound
        brand={t("brand.name")}
        title={t("progress.round32")}
        subtitle={t("r32.subtitle")}
        matches={round32Matches}
        picks={round32Picks}
        teamById={TEAM_BY_ID}
        onPick={(matchId, teamId) => {
          setRound32Picks((previous) => ({ ...previous, [matchId]: teamId }));
          setRound16Picks({});
          setQuarterPicks({});
          setSemiPicks({});
          setThirdPlaceWinner(null);
          setChampion(null);
        }}
        onContinue={() => setStage("round16")}
        continueLabel={t("next.r16")}
      />
    );
  }

  if (stage === "round16") {
    return layout(
      <KnockoutRound
        brand={t("brand.name")}
        title={t("progress.round16")}
        subtitle={t("r16.subtitle")}
        matches={round16Matches}
        picks={round16Picks}
        teamById={TEAM_BY_ID}
        onPick={(matchId, teamId) => {
          setRound16Picks((previous) => ({ ...previous, [matchId]: teamId }));
          setQuarterPicks({});
          setSemiPicks({});
          setThirdPlaceWinner(null);
          setChampion(null);
        }}
        onContinue={() => setStage("quarters")}
        continueLabel={t("next.quarters")}
      />
    );
  }

  if (stage === "quarters") {
    return layout(
      <KnockoutRound
        brand={t("brand.name")}
        title={t("progress.quarters")}
        subtitle={t("quarters.subtitle")}
        matches={quarterMatches}
        picks={quarterPicks}
        teamById={TEAM_BY_ID}
        onPick={(matchId, teamId) => {
          setQuarterPicks((previous) => ({ ...previous, [matchId]: teamId }));
          setSemiPicks({});
          setThirdPlaceWinner(null);
          setChampion(null);
        }}
        onContinue={() => setStage("semis")}
        continueLabel={t("next.semis")}
      />
    );
  }

  if (stage === "semis") {
    return layout(
      <KnockoutRound
        brand={t("brand.name")}
        title={t("progress.semis")}
        subtitle={t("semis.subtitleWc")}
        matches={semiMatches}
        picks={semiPicks}
        teamById={TEAM_BY_ID}
        onPick={(matchId, teamId) => {
          setSemiPicks((previous) => ({ ...previous, [matchId]: teamId }));
          setThirdPlaceWinner(null);
          setChampion(null);
        }}
        onContinue={() => setStage("third-place")}
        continueLabel={t("next.thirdPlace")}
      />
    );
  }

  if (stage === "third-place") {
    return layout(
      <section className="screen-card">
        <p className="eyebrow">{t("tournament.world-cup-2026.name")}</p>
        <h1>{t("thirdPlace.title")}</h1>
        <p className="subtitle">{t("thirdPlace.subtitle")}</p>
        <div className="match-grid one-up">
          <MatchCard
            match={thirdPlaceMatch}
            teamById={TEAM_BY_ID}
            winnerId={thirdPlaceWinner}
            onPick={(_, teamId) => setThirdPlaceWinner(teamId)}
          />
        </div>
        <button
          type="button"
          className="primary-cta"
          onClick={() => setStage("final")}
          disabled={!thirdPlaceWinner}
        >
          {t("thirdPlace.nextFinal")}
        </button>
      </section>
    );
  }

  if (stage === "final") {
    return layout(
      <section className="screen-card">
        <p className="eyebrow">{t("tournament.world-cup-2026.name")}</p>
        <h1>{t("final.title")}</h1>
        <p className="subtitle">{t("final.subtitleWc")}</p>
        <div className="match-grid one-up">
          <MatchCard
            match={finalMatch}
            teamById={TEAM_BY_ID}
            winnerId={champion}
            onPick={(_, teamId) => setChampion(teamId)}
          />
        </div>
        <button type="button" className="primary-cta" onClick={() => setStage("champion")} disabled={!champion}>
          {t("finish.bracket")}
        </button>
      </section>
    );
  }

  if (stage === "champion") {
    return layout(
      <section className="screen-card">
        <p className="eyebrow">{t("brand.name")}</p>
        <h1>{t("snapshot.wc.title")}</h1>
        <p className="subtitle">{t("snapshot.wc.subtitle")}</p>

        <div className="podium">
          {[champion, runnerUp, thirdPlaceWinner].map((teamId, index) => {
            const team = teamId ? TEAM_BY_ID[teamId] : null;
            const labels = [t("podium.champion"), t("podium.runnerUp"), t("podium.third")];
            return (
              <div key={labels[index]} className={`podium-slot slot-${index + 1}`.trim()}>
                <p className="podium-label">{labels[index]}</p>
                <p className="podium-team">
                  {team ? (
                    <>
                      <TeamIcon team={team} /> {team.name}
                    </>
                  ) : (
                    "TBD"
                  )}
                </p>
              </div>
            );
          })}
        </div>

        <div className="snapshot-grid">
          <div>
            <h3>{t("summary.r32")}</h3>
            <ul>
              {round32Matches.map((match) => (
                <li key={match.id}>{TEAM_BY_ID[round32Picks[match.id]]?.name || "TBD"}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t("summary.r16")}</h3>
            <ul>
              {round16Matches.map((match) => (
                <li key={match.id}>{TEAM_BY_ID[round16Picks[match.id]]?.name || "TBD"}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t("summary.qf")}</h3>
            <ul>
              {quarterMatches.map((match) => (
                <li key={match.id}>{TEAM_BY_ID[quarterPicks[match.id]]?.name || "TBD"}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t("summary.sf")}</h3>
            <ul>
              {semiMatches.map((match) => (
                <li key={match.id}>{TEAM_BY_ID[semiPicks[match.id]]?.name || "TBD"}</li>
              ))}
            </ul>
          </div>
        </div>

        <button type="button" className="primary-cta" onClick={resetToLanding}>
          {t("cta.another")}
        </button>
      </section>
    );
  }

  if (stage === "ucl-round16") {
    return layout(
      <KnockoutRound
        brand={t("brand.name")}
        title={t("ucl.r16.title")}
        subtitle={t("ucl.r16.subtitle")}
        matches={UCL_ROUND16_MATCHES}
        picks={uclRound16Picks}
        teamById={TEAM_BY_ID}
        onPick={(matchId, teamId) => {
          setUclRound16Picks((previous) => ({ ...previous, [matchId]: teamId }));
          setUclQuarterPicks({});
          setUclSemiPicks({});
          setUclChampion(null);
        }}
        onContinue={() => setStage("ucl-quarters")}
        continueLabel={t("next.quarters")}
      />
    );
  }

  if (stage === "ucl-quarters") {
    return layout(
      <KnockoutRound
        brand={t("brand.name")}
        title={t("ucl.qf.title")}
        subtitle={t("ucl.qf.subtitle")}
        matches={uclQuarterMatches}
        picks={uclQuarterPicks}
        teamById={TEAM_BY_ID}
        onPick={(matchId, teamId) => {
          setUclQuarterPicks((previous) => ({ ...previous, [matchId]: teamId }));
          setUclSemiPicks({});
          setUclChampion(null);
        }}
        onContinue={() => setStage("ucl-semis")}
        continueLabel={t("next.semis")}
      />
    );
  }

  if (stage === "ucl-semis") {
    return layout(
      <KnockoutRound
        brand={t("brand.name")}
        title={t("ucl.sf.title")}
        subtitle={t("ucl.sf.subtitle")}
        matches={uclSemiMatches}
        picks={uclSemiPicks}
        teamById={TEAM_BY_ID}
        onPick={(matchId, teamId) => {
          setUclSemiPicks((previous) => ({ ...previous, [matchId]: teamId }));
          setUclChampion(null);
        }}
        onContinue={() => setStage("ucl-final")}
        continueLabel={t("next.final")}
      />
    );
  }

  if (stage === "ucl-final") {
    return layout(
      <section className="screen-card">
        <p className="eyebrow">{t("tournament.champions-league-25-26.name")}</p>
        <h1>{t("final.title")}</h1>
        <p className="subtitle">{t("final.subtitleUcl")}</p>
        <div className="match-grid one-up">
          <MatchCard
            match={uclFinalMatch}
            teamById={TEAM_BY_ID}
            winnerId={uclChampion}
            onPick={(_, teamId) => setUclChampion(teamId)}
          />
        </div>
        <button
          type="button"
          className="primary-cta"
          onClick={() => setStage("ucl-champion")}
          disabled={!uclChampion}
        >
          {t("finish.bracket")}
        </button>
      </section>
    );
  }

  return layout(
    <section className="screen-card">
      <p className="eyebrow">{t("brand.name")}</p>
      <h1>{t("snapshot.ucl.title")}</h1>
      <p className="subtitle">{t("snapshot.ucl.subtitle")}</p>

      <div className="podium">
        {[uclChampion, uclRunnerUp].map((teamId, index) => {
          const team = teamId ? TEAM_BY_ID[teamId] : null;
          const labels = [t("podium.champion"), t("podium.runnerUp")];
          return (
            <div key={labels[index]} className={`podium-slot slot-${index + 1}`.trim()}>
              <p className="podium-label">{labels[index]}</p>
              <p className="podium-team">
                {team ? (
                  <>
                    <TeamIcon team={team} /> {team.name}
                  </>
                ) : (
                  "TBD"
                )}
              </p>
            </div>
          );
        })}
      </div>

      <UclBracketBoard
        teamById={TEAM_BY_ID}
        round16Matches={UCL_ROUND16_MATCHES}
        round16Picks={uclRound16Picks}
        quarterPicks={uclQuarterPicks}
        semiPicks={uclSemiPicks}
        champion={uclChampion}
        titleText={t("ucl.board.title")}
        winnerText={t("ucl.board.winner")}
        footerText={t("ucl.board.footer")}
        loadingText={t("ucl.board.loading")}
        unavailableText={t("ucl.board.unavailable")}
      />

      <button type="button" className="primary-cta" onClick={resetToLanding}>
        {t("cta.another")}
      </button>
    </section>
  );
};

export default App;
