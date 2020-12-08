const NBA_DATASET = [
    {
        team: 'Boston Celtics',
        abv: 'BOS',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-boston-celtics-logo-480x480.png',
        longitude: -71.062146,
        latitude: 42.366198,
        stadiumName: 'TD Garden',
    },
    {
        team: 'Chicago Bulls',
        abv: 'CHI',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-chicago-bulls-logo-480x480.png',
        longitude: -87.674176,
        latitude: 41.880691,
        stadiumName: 'United Center',
    },
    {
        team: 'Philadelphia 76ers',
        abv: 'PHI',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-philadelphia-76ers-logo-480x480.png',
        longitude: -75.17198,
        latitude: 39.901201,
        stadiumName: 'Wells Fargo Center',
    },
    {
        team: 'Los Angeles Clippers',
        abv: 'LAC',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-la-clippers-logo-480x480.png',
        longitude: -118.267254,
        latitude: 34.043017,
        stadiumName: 'Staples Center',
    },
    {
        team: 'Toronto Raptors',
        abv: 'TOR',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-toronto-raptors-logo-480x480.png',
        longitude: -79.379099,
        latitude: 43.643466,
        stadiumName: 'Scotiabank Arena',
    },
    {
        team: 'Golden State Warriors',
        abv: 'GSW',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-golden-state-warriors-logo-480x480.png',
        longitude: -122.387766,
        latitude: 37.768005,
        stadiumName: 'Chase Center',
    },
    {
        team: 'Los Angeles Lakers',
        abv: 'LAL',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-los-angeles-lakers-logo-480x480.png',
        longitude: -118.267254,
        latitude: 34.043017,
        stadiumName: 'Staples Center',
    },
    {
        team: 'New York Knicks',
        abv: 'NYK',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-new-york-knicks-logo-480x480.png',
        longitude: -73.993439,
        latitude: 40.750504,
        stadiumName: 'Madison Square Garden',
    },
    {
        team: 'Phoenix Suns',
        abv: 'PHX',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-phoenix-suns-logo-480x480.png',
        longitude: -112.071174,
        latitude: 33.4458,
        stadiumName: 'Talking Stick Resort Arena',
    },
    {
        team: 'Sacramento Kings',
        abv: 'SAC',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-sacramento-kings-logo-480x480.png',
        longitude: -121.499619,
        latitude: 38.580641,
        stadiumName: 'Golden 1 Center',
    },
    {
        team: 'Cleveland Cavaliers',
        abv: 'CLE',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-cleveland-cavaliers-logo-480x480.png',
        longitude: -81.688209,
        latitude: 41.496554,
        stadiumName: 'Rocket Mortgage FieldHouse',
    },
    {
        team: 'Detroit Pistons',
        abv: 'det',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-detroit-pistons-logo-480x480.png',
        longitude: -83.055236,
        latitude: 42.34114,
        stadiumName: 'Little Caesars Arena',
    },
    {
        team: 'Brooklyn Nets',
        abv: 'BKN',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-brooklyn-nets-logo-480x480.png',
        longitude: -73.975035,
        latitude: 40.682495,
        stadiumName: 'Barclays Center',
    },
    {
        team: 'Indiana Pacers',
        abv: 'IND',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-indiana-pacers-logo-480x480.png',
        longitude: -86.155464,
        latitude: 39.76393,
        stadiumName: 'Bankers Life Fieldhouse',
    },
    {
        team: 'Milwaukee Bucks',
        abv: 'MIL',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-milwaukee-bucks-logo-480x480.png',
        longitude: -87.91715,
        latitude: 43.04514,
        stadiumName: 'Fiserv Forum',
    },
    {
        team: 'Dallas Mavericks',
        abv: 'DAL',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-dallas-mavericks-logo-480x480.png',
        longitude: -96.810355,
        latitude: 32.790506,
        stadiumName: 'American Airlines Center',
    },
    {
        team: 'Houston Rockets',
        abv: 'HOU',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-houston-rockets-logo-2020-300x300.png',
        longitude: -95.3621,
        latitude: 29.75076,
        stadiumName: 'Toyota Center',
    },
    {
        team: 'Memphis Grizzlies',
        abv: 'MEM',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-memphis-grizzlies-logo-480x480.png',
        longitude: -90.050474,
        latitude: 35.138204,
        stadiumName: 'FedEx Forum',
    },
    {
        team: 'New Orleans Pelicans',
        abv: 'NOP',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-new-orleans-pelicans-logo-480x480.png',
        longitude: -90.082057,
        latitude: 29.949035,
        stadiumName: 'Smoothie King Center',
    },
    {
        team: 'San Antonio Spurs',
        abv: 'SAS',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-san-antonio-spurs-logo-480x480.png',
        longitude: -98.437445,
        latitude: 29.427071,
        stadiumName: 'AT&T Center',
    },
    {
        team: 'Atlanta Hawks',
        abv: 'ATL',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-atlanta-hawks-logo-480x480.png',
        longitude: -84.396324,
        latitude: 33.757289,
        stadiumName: 'State Farm Arena',
    },
    {
        team: 'Charlotte Hornets',
        abv: 'CHA',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-charlotte-hornets-logo-480x480.png',
        longitude: -80.839235,
        latitude: 35.225143,
        stadiumName: 'Spectrum Center',
    },
    {
        team: 'Miami Heat',
        abv: 'MIA',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-miami-heat-logo-480x480.png',
        longitude: -80.186977,
        latitude: 25.781402,
        stadiumName: 'American Airlines Arena',
    },
    {
        team: 'Orlando Magic',
        abv: 'ORL',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-orlando-magic-logo-480x480.png',
        longitude: -81.383935,
        latitude: 28.539269,
        stadiumName: 'Amway Center',
    },
    {
        team: 'Washington Wizards',
        abv: 'WAS',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-washington-wizards-logo-480x480.png',
        longitude: -77.02088,
        latitude: 38.898125,
        stadiumName: 'Capital One Arena',
    },
    {
        team: 'Denver Nuggets',
        abv: 'DEN',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-denver-nuggets-logo-2018-480x480.png',
        longitude: -105.00771,
        latitude: 39.74866,
        stadiumName: 'Pepsi Center',
    },
    {
        team: 'Minnesota Timberwolves',
        abv: 'MIN',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-minnesota-timberwolves-logo-480x480.png',
        longitude: -93.27619,
        latitude: 44.979455,
        stadiumName: 'Target Center',
    },
    {
        team: 'Oklahoma City Thunder',
        abv: 'OKC',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-oklahoma-city-thunder-logo-480x480.png',
        longitude: -97.515118,
        latitude: 35.463417,
        stadiumName: 'Chesapeake Energy Arena',
    },
    {
        team: 'Portland Trail Blazers',
        abv: 'POR',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-portland-trail-blazers-logo-480x480.png',
        longitude: -122.666842,
        latitude: 45.531565,
        stadiumName: 'Moda Center',
    },
    {
        team: 'Utah Jazz',
        abv: 'UTA',
        logo:
            'http://loodibee.com/wp-content/uploads/nba-utah-jazz-logo-480x480.png',
        longitude: -111.901087,
        latitude: 40.768268,
        stadiumName: 'Vivint Smart Home Arena',
    },
];

export { NBA_DATASET };
