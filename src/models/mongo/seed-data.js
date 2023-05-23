export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa",
      admin: true,
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK",
      admin: false,
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO",
      admin: false,
    },
  },
  counties: {
    _model: "County",
    waterford: {
      countyName: "Waterford",
    },
    cork: {
      countyName: "Cork",
    },
    dublin: {
      countyName: "Dublin",
    },
    galway: {
      countyName: "Galway",
    },
  },
  places: {
    _model: "Place",
    one: {
      placename: "River Lee",
      description: "blablablaaaaa",
      category: "riverside",
      lat: "52.160858",
      lng: "-7.152420",
      donor: "->users.bart",
      county: "->counties.cork",
    },
    two: {
      placename: "Bairon Bay Walk",
      description: "blalalalalala",
      category: "seaside",
      lat: "52.149220",
      lng: "-6.994620",
      donor: "->users.marge",
      county: "->counties.dublin",
    },
    three: {
      placename: "O'connell River",
      description: "blalalaloooooooo",
      category: "riverside",
      lat: "52.161290",
      lng: "-7.231540",
      donor: "->users.homer",
      county: "->counties.waterford",
    },
  },
};
