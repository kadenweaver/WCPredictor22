
export const groups = [
    {
        groupName: "A", 
        teams: [
            {name: "Qatar", flagName: "QA", short: 'QAT'},
            {name: "Ecuador", flagName: "EC", short: 'ECU'},
            {name: "Senegal", flagName: "SN", short: 'SEN'},
            {name: "Netherlands", flagName: "NL", short: 'NED'}
        ]
    },
    {
        groupName: "B", 
        teams: [
            {name: "Wales", short: 'WAL'},
            {name: "England", short: 'ENG'},
            {name: "USA", flagName: "US", short: 'USA'},
            {name: "Iran", flagName: "IR", short: 'IRN'}
        ]
    },
    {
        groupName: "C", 
        teams: [
            {name: "Argentina", flagName: "AR", short: 'ARG'},
            {name: "Saudia Arabia", flagName: "SA", short: 'KSA'},
            {name: "Mexico", flagName: "MX", short: 'MEX'},
            {name: "Poland", flagName: "PL", short: 'POL'}
        ]
    },
    {
        groupName: "D", 
        teams: [
            {name: "France", flagName: "FR", short: 'FRA'},
            {name: "Australia", flagName: "AU", short: 'AUS'},
            {name: "Denmark", flagName: "DK", short: 'DEN'},
            {name: "Tunisia", flagName: "TN", short: 'TUN'}
        ]
    },
    {
        groupName: "E", 
        teams: [
            {name: "Spain", flagName: "ES", short: 'ESP'},
            {name: "Costa Rica", flagName: "CR", short: 'CRC'},
            {name: "Germany", flagName: "DE", short: 'GER'},
            {name: "Japan", flagName: "JP", short: 'JPN'}
        ]
    },
    {
        groupName: "F", 
        teams: [
            {name: "Belgium", flagName: "BE", short: 'BEL'},
            {name: "Canada", flagName: "CA", short: 'CAN'},
            {name: "Morocco", flagName: "MA", short: 'MOR'},
            {name: "Croatia", flagName: "HR", short: 'CRO'}
        ]
    },
    {
        groupName: "G", 
        teams: [
            {name: "Brazil", flagName: "BR", short: 'BRA'},
            {name: "Serbia", flagName: "RS", short: 'SRB'},
            {name: "Switzerland", flagName: "CH", short: 'SUI'},
            {name: "Cameroon", flagName: "CM", short: 'CMR'}
        ]
    },
    {
        groupName: "H", 
        teams: [
            {name: "Portugal", flagName: "PT", short: 'POR'},
            {name: "Ghana", flagName: "GH", short: 'GHA'},
            {name: "Uruguay", flagName: "UY", short: 'URU'},
            {name: "South Korea", flagName: "KR", short: 'KOR'}
        ]
    },
]

export const teamsByName = groups.map(x => x.teams.map(team => team)).flat()