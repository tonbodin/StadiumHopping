const NBA_DATASET = [
    {
        team: 'Boston Celtics',
        abv: 'bos',
        logo:
            'http://content.sportslogos.net/logos/6/220/full/5mdhgjh3aa92kih09pgi.gif',
        longitude: -71.062146,
        latitude: 42.366198,
        stadiumName: 'TD Garden',
    },
    {
        team: 'Brooklyn Nets',
        abv: 'bkn',
        logo:
            'http://content.sportslogos.net/logos/6/3786/full/137_brooklyn-nets-primary-2013.gif',
        longitude: -73.975035,
        latitude: 40.682495,
        stadiumName: 'Barclays Center',
    },
    {
        team: 'New York Knicks',
        abv: 'ny',
        logo:
            'http://content.sportslogos.net/logos/6/216/full/2nn48xofg0hms8k326cqdmuis.gif',
        longitude: -73.993439,
        latitude: 40.750504,
        stadiumName: 'Madison Square Garden',
    },
    {
        team: 'Philadelphia 76ers',
        abv: 'phi',
        logo:
            'http://content.sportslogos.net/logos/6/217/full/wd9ic7qafgfb0yxs7tem7n5g4.gif',
        longitude: -75.17198,
        latitude: 39.901201,
        stadiumName: 'Wells Fargo Center',
    },
    {
        team: 'Toronto Raptors',
        abv: 'tor',
        logo:
            'http://content.sportslogos.net/logos/6/227/full/yfypcwqog6qx8658sn5w65huh.gif',
        longitude: -79.379099,
        latitude: 43.643466,
        stadiumName: 'Scotiabank Arena',
    },
    {
        team: 'Golden State Warriors',
        abv: 'gs',
        logo:
            'http://content.sportslogos.net/logos/6/235/full/qhhir6fj8zp30f33s7sfb4yw0.png',
        longitude: -122.387766,
        latitude: 37.768005,
        stadiumName: 'Chase Center',
    },
    {
        team: 'Los Angeles Clippers',
        abv: 'lac',
        logo:
            'http://content.sportslogos.net/logos/6/236/full/bvv028jd1hhr8ee8ii7a0fg4i.gif',
        longitude: -118.267254,
        latitude: 34.043017,
        stadiumName: 'Staples Center',
    },
    {
        team: 'Los Angeles Lakers',
        abv: 'lal',
        logo:
            'http://content.sportslogos.net/logos/6/237/full/uig7aiht8jnpl1szbi57zzlsh.gif',
        longitude: -118.267254,
        latitude: 34.043017,
        stadiumName: 'Staples Center',
    },
    {
        team: 'Phoenix Suns',
        abv: 'phx',
        logo:
            'http://content.sportslogos.net/logos/6/238/full/4370_phoenix_suns-primary-2014.png',
        longitude: -112.071174,
        latitude: 33.4458,
        stadiumName: 'Talking Stick Resort Arena',
    },
    {
        team: 'Sacramento Kings',
        abv: 'sac',
        logo: 'http://content.sportslogos.net/logos/6/240/full/832.gif',
        longitude: -121.499619,
        latitude: 38.580641,
        stadiumName: 'Golden 1 Center',
    },
    {
        team: 'Chicago Bulls',
        abv: 'chi',
        logo:
            'http://content.sportslogos.net/logos/6/221/full/hj3gmh82w9hffmeh3fjm5h874.gif',
        longitude: -87.674176,
        latitude: 41.880691,
        stadiumName: 'United Center',
    },
    {
        team: 'Cleveland Cavaliers',
        abv: 'cle',
        logo:
            'http://content.sportslogos.net/logos/6/222/full/e4701g88mmn7ehz2baynbs6e0.gif',
        longitude: -81.688209,
        latitude: 41.496554,
        stadiumName: 'Rocket Mortgage FieldHouse',
    },
    {
        team: 'Detroit Pistons',
        abv: 'det',
        logo: 'http://content.sportslogos.net/logos/6/223/full/3079.gif',
        longitude: -83.055236,
        latitude: 42.34114,
        stadiumName: 'Little Caesars Arena',
    },
    {
        team: 'Indiana Pacers',
        abv: 'ind',
        logo: 'http://content.sportslogos.net/logos/6/224/full/3083.gif',
        longitude: -86.155464,
        latitude: 39.76393,
        stadiumName: 'Bankers Life Fieldhouse',
    },
    {
        team: 'Milwaukee Bucks',
        abv: 'mil',
        logo:
            'http://content.sportslogos.net/logos/6/225/full/0295onf2c4xsbfsxye6i.gif',
        longitude: -87.91715,
        latitude: 43.04514,
        stadiumName: 'Fiserv Forum',
    },
    {
        team: 'Dallas Mavericks',
        abv: 'dal',
        logo:
            'http://content.sportslogos.net/logos/6/222/full/e4701g88mmn7ehz2baynbs6e0.gif',
        longitude: -96.810355,
        latitude: 32.790506,
        stadiumName: 'American Airlines Center',
    },
    {
        team: 'Houston Rockets',
        abv: 'hou',
        logo:
            'http://content.sportslogos.net/logos/6/230/full/8xe4813lzybfhfl14axgzzqeq.gif',
        longitude: -95.3621,
        latitude: 29.75076,
        stadiumName: 'Toyota Center',
    },
    {
        team: 'Memphis Grizzlies',
        abv: 'mem',
        logo: '	http://content.sportslogos.net/logos/6/231/full/793.gif',
        longitude: -90.050474,
        latitude: 35.138204,
        stadiumName: 'FedEx Forum',
    },
    {
        team: 'New Orleans Pelicans',
        abv: 'no',
        logo:
            'http://content.sportslogos.net/logos/6/4962/full/2681_new_orleans_pelicans-primary-2014.png',
        longitude: -90.082057,
        latitude: 29.949035,
        stadiumName: 'Smoothie King Center',
    },
    {
        team: 'San Antonio Spurs',
        abv: 'sa',
        logo: 'http://content.sportslogos.net/logos/6/233/full/827.gif',
        longitude: -98.437445,
        latitude: 29.427071,
        stadiumName: 'AT&T Center',
    },
    {
        team: 'Atlanta Hawks',
        abv: 'atl',
        logo:
            'http://content.sportslogos.net/logos/6/220/full/5mdhgjh3aa92kih09pgi.gif',
        longitude: -84.396324,
        latitude: 33.757289,
        stadiumName: 'State Farm Arena',
    },
    {
        team: 'Charlotte Hornets',
        abv: 'cha',
        logo:
            'http://content.sportslogos.net/logos/6/5120/full/1926_charlotte__hornets_-primary-2015.png',
        longitude: -80.839235,
        latitude: 35.225143,
        stadiumName: 'Spectrum Center',
    },
    {
        team: 'Miami Heat',
        abv: 'mia',
        logo:
            'http://content.sportslogos.net/logos/6/214/full/burm5gh2wvjti3xhei5h16k8e.gif',
        longitude: -80.186977,
        latitude: 25.781402,
        stadiumName: 'American Airlines Arena',
    },
    {
        team: 'Orlando Magic',
        abv: 'orl',
        logo:
            'http://content.sportslogos.net/logos/6/217/full/wd9ic7qafgfb0yxs7tem7n5g4.gif',
        longitude: -81.383935,
        latitude: 28.539269,
        stadiumName: 'Amway Center',
    },
    {
        team: 'Washington Wizards',
        abv: 'wsh',
        logo:
            'http://content.sportslogos.net/logos/6/219/full/b3619brnphtx65s2th4p9eggf.gif',
        longitude: -77.02088,
        latitude: 38.898125,
        stadiumName: 'Capital One Arena',
    },
    {
        team: 'Denver Nuggets',
        abv: 'den',
        logo:
            'http://content.sportslogos.net/logos/6/229/full/xeti0fjbyzmcffue57vz5o1gl.gif',
        longitude: -105.00771,
        latitude: 39.74866,
        stadiumName: 'Pepsi Center',
    },
    {
        team: 'Minnesota Timberwolves',
        abv: 'min',
        logo:
            'http://content.sportslogos.net/logos/6/232/full/zq8qkfni1g087f4245egc32po.gif',
        longitude: -93.27619,
        latitude: 44.979455,
        stadiumName: 'Target Center',
    },
    {
        team: 'Oklahoma City Thunder',
        abv: 'okc',
        logo:
            'http://content.sportslogos.net/logos/6/2687/full/khmovcnezy06c3nm05ccn0oj2.gif',
        longitude: -97.515118,
        latitude: 35.463417,
        stadiumName: 'Chesapeake Energy Arena',
    },
    {
        team: 'Portland Trail Blazers',
        abv: 'por',
        logo:
            'http://content.sportslogos.net/logos/6/239/full/bahmh46cyy6eod2jez4g21buk.gif',
        longitude: -122.666842,
        latitude: 45.531565,
        stadiumName: 'Moda Center',
    },
    {
        team: 'Utah Jazz',
        abv: 'uta',
        logo:
            'http://content.sportslogos.net/logos/6/234/full/m2leygieeoy40t46n1qqv0550.gif',
        longitude: -111.901087,
        latitude: 40.768268,
        stadiumName: 'Vivint Smart Home Arena',
    },
];

export { NBA_DATASET };
