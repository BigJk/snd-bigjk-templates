if (!window._bigjk.base) {
  throw new Error("gen-dis-station.js requires base.js to be loaded first");
}

if (!window._bigjk.random) {
  throw new Error("gen-dis-station.js requires random.js to be loaded first");
}

const _DIS_STATION_DATA = {
  modules: [
    {
      name: "Gravity Generator",
      purpose: "Life Support",
      essential: true,
      description: "Generates artificial gravity for the station.",
      statuses: ["Failing due to damaged sensors", "Operational", "Undergoing maintenance"],
    },
    {
      name: "Water Recycling Unit",
      purpose: "Life Support",
      essential: true,
      description: "Recycles water for human consumption.",
      statuses: ["Total failure, leaking toxic chemicals", "Operational", "Undergoing repairs"],
    },
    {
      name: "Solar Panels",
      purpose: "Power Source",
      essential: false,
      description: "Provides supplementary power to the station.",
      statuses: ["Partially functional, some panels damaged", "Fully operational", "Offline for maintenance"],
    },
    {
      name: "Laser Cutting Tool",
      purpose: "Engineering",
      essential: false,
      description: "Used for high-precision metal cutting.",
      statuses: ["Operational", "Undergoing calibration", "Offline"],
    },
    {
      name: "Cryogenic Storage",
      purpose: "Research",
      essential: false,
      description: "Stores samples and personnel in cryosleep.",
      statuses: ["Leaking liquid nitrogen", "Operational", "Undergoing maintenance"],
    },
    {
      name: "Nuclear Power Core",
      purpose: "Power Source",
      essential: true,
      description: "Primary power source for the station.",
      statuses: ["Operating at 75%, leaking radiation", "Fully operational", "Undergoing inspection"],
    },
    {
      name: "Holographic Entertainment System",
      purpose: "Recreation",
      essential: false,
      description: "Provides entertainment for station personnel.",
      statuses: ["Functional, but displaying distorted and unsettling content", "Fully operational", "Offline for updates"],
    },
    {
      name: "Zero-Gravity Gym",
      purpose: "Recreation",
      essential: false,
      description: "Fitness area for zero-gravity exercise.",
      statuses: ["Undamaged, but unused for extended periods", "Operational", "Undergoing cleaning"],
    },
    {
      name: "Food Storage",
      purpose: "Life Support",
      essential: true,
      description: "Stores non-perishable food items.",
      statuses: ["Partially depleted, some expired", "Fully stocked", "Undergoing inventory check"],
    },
    {
      name: "Atmosphere Processing Unit",
      purpose: "Life Support",
      essential: true,
      description: "Regulates station atmosphere.",
      statuses: ["Operational under manual control", "Fully operational", "Undergoing maintenance"],
    },
    {
      name: "Internal Security Camera System",
      purpose: "Security",
      essential: false,
      description: "Monitors station interior.",
      statuses: ["Sporadic transmission, frequent blackouts", "Fully operational", "Undergoing upgrades"],
    },
    {
      name: "Computer Server Room",
      purpose: "Information Technology",
      essential: true,
      description: "Houses mainframe servers for station operations.",
      statuses: ["Overheated due to cooling system failure", "Fully operational", "Undergoing cooling system repairs"],
    },
    {
      name: "Virology Lab",
      purpose: "Research",
      essential: false,
      description: "Used for virus research and development.",
      statuses: ["Sealed due to biological contamination", "Operational", "Undergoing decontamination"],
    },
    {
      name: "Library Database",
      purpose: "Information Technology",
      essential: false,
      description: "Houses station's vast digital library.",
      statuses: ["Partially corrupted due to power surges", "Fully operational", "Undergoing data recovery"],
    },
    {
      name: "Airlock 3",
      purpose: "Safety",
      essential: false,
      description: "Used for spacesuit maintenance and spacewalking prep.",
      statuses: ["Non-functional, airlock damaged during explosive decompression", "Operational", "Undergoing repairs"],
    },
    {
      name: "Engine Repair Bay",
      purpose: "Maintenance",
      essential: false,
      description: "Used for repairing and replacing engines.",
      statuses: ["Heavily damaged, several unrepaired engines present", "Operational", "Undergoing repairs"],
    },
    {
      name: "Infected Robotics Workshop",
      purpose: "Maintenance",
      essential: false,
      description: "Used for robotics maintenance and repair.",
      statuses: ["Bodies of engineers found inside, robotic parts scattered", "Operational", "Undergoing investigation"],
    },
    {
      name: "Robotic Arm Assembly Area",
      purpose: "Manufacturing",
      essential: false,
      description: "Used for assembling and testing robotic arms.",
      statuses: ["Systematically dismantled, components missing", "Operational", "Undergoing reassembly"],
    },
    {
      name: "X-ray Analyzer",
      purpose: "Research",
      essential: false,
      description: "Used for materials analysis.",
      statuses: ["Calibration required, currently inoperable", "Operational", "Undergoing calibration"],
    },
    {
      name: "Mass Spectrometer",
      purpose: "Research",
      essential: false,
      description: "Used for chemical composition analysis.",
      statuses: ["Operational but giving inconsistent results", "Fully operational", "Undergoing recalibration"],
    },
    {
      name: "Optical Telescopes",
      purpose: "Observation",
      essential: false,
      description: "Used for observing distant celestial objects.",
      statuses: ["Lens damage due to solar flare exposure", "Operational", "Undergoing lens replacement"],
    },
    {
      name: "Environmental Monitoring System",
      purpose: "Life Support",
      essential: true,
      description: "Monitors and controls station's internal environment.",
      statuses: ["Partially functional, giving erroneous readings", "Fully operational", "Undergoing sensor recalibration"],
    },
    {
      name: "Maintenance Drone Charging Bay",
      purpose: "Maintenance",
      essential: false,
      description: "Used for charging and storing maintenance drones.",
      statuses: ["Empty, drones relocated or damaged", "Operational", "Undergoing restocking"],
    },
    {
      name: "Agriculture Unit",
      purpose: "Life Support",
      essential: false,
      description: "Used for growing vegetables and fruits for station personnel.",
      statuses: ["Overgrown, need for urgent pruning and nutrient replenishment", "Operational", "Undergoing maintenance"],
    },
    {
      name: "Cryogenic Storage Tank",
      purpose: "Research",
      essential: false,
      description: "Used for storing experimental components at cryogenic temperatures.",
      statuses: ["Currently empty", "Operational", "Undergoing restocking"],
    },
    {
      name: "Hazardous Material Storage",
      purpose: "Safety",
      essential: false,
      description: "Used for storing and handling dangerous materials.",
      statuses: ["Warning signs indicate high radiation levels", "Operational", "Undergoing inspection"],
    },
    {
      name: "Recyclable Materials Processing Unit",
      purpose: "Life Support",
      essential: false,
      description: "Used for recycling various materials for station operations.",
      statuses: ["Non-functional due to component failure", "Operational", "Undergoing repairs"],
    },
    {
      name: "High-Energy Laser Cutter",
      purpose: "Manufacturing",
      essential: false,
      description: "Used for cutting through thick planetary materials.",
      statuses: ["Operational, slightly uneven cut quality", "Fully operational", "Undergoing calibration"],
    },
    {
      name: "Medical Bay",
      purpose: "Healthcare",
      essential: true,
      description: "Provides medical facilities for treating injured personnel.",
      statuses: ["Operational, but critically short of supplies", "Fully operational", "Undergoing restocking"],
    },
    {
      name: "Surgical Robotic Arm",
      purpose: "Healthcare",
      essential: false,
      description: "Advanced surgical equipment for precision operations.",
      statuses: ["Partially functional, precision alignment issue", "Fully operational", "Undergoing calibration"],
    },
    {
      name: "Sickbay Quarters",
      purpose: "Healthcare",
      essential: false,
      description: "Temporary living quarters for recovering patients.",
      statuses: ["Hygiene standards unsatisfactory due to limited cleaning resources", "Operational", "Undergoing cleaning"],
    },
    {
      name: "General Purpose Laboratory",
      purpose: "Research",
      essential: false,
      description: "Used for various scientific experiments and analysis.",
      statuses: ["Partially equipped, several analytical devices missing", "Fully operational", "Undergoing restocking"],
    },
    {
      name: "Incubator",
      purpose: "Biotechnology",
      essential: false,
      description: "Used for cultivating bacteria and microorganisms.",
      statuses: ["Non-functional due to temperature control issues", "Operational", "Undergoing repairs"],
    },
    {
      name: "Advanced NMR Spectrometer",
      purpose: "Biotechnology",
      essential: false,
      description: "Used for determining the structure of biomolecules.",
      statuses: ["Operational, magnet slightly misaligned", "Fully operational", "Undergoing calibration"],
    },
    {
      name: "Hydroponics Lab",
      purpose: "Life Support",
      essential: false,
      description: "Uses nutrient-rich solutions rather than soil for plant growth.",
      statuses: ["Plants appear to be on the brink of collapse", "Operational", "Undergoing maintenance"],
    },
    {
      name: "Computer-Operated Manufacturing System",
      purpose: "Manufacturing",
      essential: false,
      description: "Allows for the flexible reproduction of electronic devices and modules.",
      statuses: ["Can be manually operated, but with limitations", "Fully operational", "Undergoing software updates"],
    },
    {
      name: "VocalID Device",
      purpose: "Biotechnology",
      essential: false,
      description: "Determine an individual's ethnicity from Brain waves.",
      statuses: ["Deactivated", "Operational", "Undergoing calibration"],
    },
    {
      name: "Infra-red recognition device",
      purpose: "Biotechnology",
      essential: false,
      description: "Scans all temperatures in and around one's body for 4 inches deep.",
      statuses: ["Has the last 10 scans stored in memory", "Operational", "Undergoing data transfer"],
    },
    {
      name: "Harmony One Medical scanner",
      purpose: "Biotechnology",
      essential: false,
      description: "Scans the body for any abnormalities and gives a diagnosis.",
      statuses: ["Operational", "Undergoing calibration", "Offline"],
    },
    {
      name: "Tractor beam",
      purpose: "Exploration",
      essential: false,
      description: "Stellar tractor beam to collect invaders.",
      statuses: ["Operational", "Undergoing maintenance", "Offline"],
    },
    {
      name: "Adv. Life Support System",
      purpose: "Life Support",
      essential: false,
      description: "Enhanced life support system for extended missions.",
      statuses: ["Infested with unknown alien organisms", "Operational", "Undergoing decontamination"],
    },
    {
      name: "Advanced Resource Utilization",
      purpose: "Life Support",
      essential: false,
      description: "Optimizes resource usage for extended missions.",
      statuses: ["Partially operational", "Fully operational", "Undergoing optimization"],
    },
    {
      name: "Automated Repair System",
      purpose: "Maintenance",
      essential: false,
      description: "Automatically repairs damaged equipment.",
      statuses: ["Currently offline due to software issues", "Operational", "Undergoing software updates"],
    },
    {
      name: "Unidentified Technology Module",
      purpose: "Research",
      essential: false,
      description: "Unknown purpose, emits unusual energy signature.",
      statuses: ["Sealed by security protocols, warning signs posted", "Operational", "Undergoing analysis"],
    },
    {
      name: "Artificial Gravity Test Chamber",
      purpose: "Research",
      essential: false,
      description: "Used to test and calibrate artificial gravity generators.",
      statuses: ["Vacant, caged monkeys released", "Operational", "Undergoing cleaning"],
    },
  ],
};

const DISStationGen = {
  /**
   * Gets all module purposes.
   * @param {boolean} onlyEssential - Whether to only consider essential modules.
   */
  getAllModulePurpose: function (onlyEssential = false) {
    if (onlyEssential) {
      return [...new Set(_DIS_STATION_DATA.modules.filter((module) => module.essential).map((module) => module.purpose))];
    }
    return [...new Set(_DIS_STATION_DATA.modules.map((module) => module.purpose))];
  },

  /**
   * Returns all essential modules.
   */
  getAllEssentialModules: function () {
    return _DIS_STATION_DATA.modules.filter((module) => module.essential);
  },

  /**
   * Returns all modules by purpose.
   * @param {string} purpose - The purpose of the module.
   * @param {boolean} onlyEssential - Whether to only consider essential modules.
   */
  getModulesByPurpose: function (purpose, onlyEssential = false) {
    let modules = _DIS_STATION_DATA.modules.filter((module) => module.purpose === purpose);
    if (onlyEssential) {
      modules = modules.filter((module) => module.essential);
    }
    return modules;
  },

  /**
   * Returns a random module object based on the specified purpose.
   * @param {string} purpose - The purpose of the module.
   * @param {boolean} onlyEssential - Whether to only consider essential modules.
   */
  getRandomModuleByPurpose: function (purpose, onlyEssential = false) {
    let modules = _DIS_STATION_DATA.modules.filter((module) => module.purpose === purpose);
    if (onlyEssential) {
      modules = modules.filter((module) => module.essential);
    }
    return modules[Math.floor(random() * modules.length)];
  },

  /**
   * Generates a random station name using a combination of prefixes, adjectives, and nouns.
   */
  generateStationName() {
    const prefixes = [
      "Outpost",
      "Station",
      "Beacon",
      "Relay",
      "Hub",
      "Nexus",
      "Port",
      "Dock",
      "Terminal",
      "Waypoint",
      "Base",
      "Spaceport",
      "Platform",
      "Anchorage",
      "Command",
      "ISS",
    ];
    const adjectives = [
      "Alpha",
      "Prime",
      "Nova",
      "Stellar",
      "Cosmic",
      "Orbital",
      "Astro",
      "Galactic",
      "Solar",
      "Lunar",
      "Celestial",
      "Interstellar",
      "Deep",
      "Far",
      "Proxima",
    ];
    const nouns = [
      "Hope",
      "Frontier",
      "Horizon",
      "Nebula",
      "Star",
      "Gemini",
      "Orion",
      "Phoenix",
      "Zenith",
      "Aegis",
      "Vega",
      "Polaris",
      "Themis",
      "Aurora",
      "Elysium",
      "Artemis",
      "Helios",
      "Cygnus",
      "Andromeda",
      "Io",
      "Titan",
      "Europa",
      "Callisto",
      "Hyperion",
      "Enceladus",
      "Oberon",
      "Triton",
      "Charon",
      "Deimos",
      "Phobos",
    ];
    const suffixes = [
      // Roman numerals
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      // Greek letters
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
      "Epsilon",
      "Zeta",
      "Eta",
      "Theta",
      "Iota",
      "Kappa",
      // Numeric suffixes
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      // Alphanumeric codes
      "A1",
      "B2",
      "C3",
      "D4",
      "E5",
      "F6",
      "G7",
      "H8",
      "J9",
      "K10",
    ];

    const prefix = prefixes[Math.floor(random() * prefixes.length)];
    const adjective = adjectives[Math.floor(random() * adjectives.length)];
    const noun = nouns[Math.floor(random() * nouns.length)];
    const suffix = suffixes[Math.floor(random() * suffixes.length)];

    const randomNumber = Math.floor(random() * 1000)
      .toString()
      .padStart(3, "0");

    const nameFormats = [
      `${prefix} ${adjective}-${randomNumber}`,
      `${adjective} ${prefix} ${noun}`,
      `${prefix} ${noun} ${suffix}`,
      `${noun} ${prefix}-${randomNumber}`,
      `${prefix} ${adjective} ${suffix}`,
      `${noun}-${suffix}`,
      `${prefix} ${noun}-${randomNumber}`,
    ];

    return nameFormats[Math.floor(random() * nameFormats.length)];
  },

  /**
   * Generates a grid-based space station layout.
   */
  generateStationGrid(width = 5, height = 5, emptiness = 3, corridor = 10) {
    const grid = new Array(height).fill(null).map((r) => new Array(width).fill(null));

    // Fill grid with basic rooms
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        grid[x][y] = { type: "BASIC_ROOM" };
      }
    }

    // Remove some rooms to create empty space
    for (let i = 0; i < ((height + width) / 2) * emptiness; i++) {
      const x = Math.floor(random() * height);
      const y = Math.floor(random() * width);
      grid[x][y] = null;
    }

    // Create corridors
    for (let i = 0; i < ((height + width) / 2) * corridor; i++) {
      const x = Math.floor(random() * height);
      const y = Math.floor(random() * width);

      const dxy = [
        [1, 0, "B"],
        [-1, 0, "T"],
        [0, -1, "L"],
        [0, 1, "R"],
      ];
      const pattern = dxy
        .map((xy) => {
          if (x + xy[0] < 0 || x + xy[0] >= height) {
            return "";
          }
          if (y + xy[1] < 0 || y + xy[1] >= width) {
            return "";
          }
          if (grid[x + xy[0]]?.[y + xy[1]]?.type === "BASIC_ROOM") {
            return xy[2];
          }
          if (grid[x + xy[0]]?.[y + xy[1]]?.type) {
            return "x";
          }
          return "";
        })
        .join("");

      switch (pattern) {
        case "TR":
        case "TL":
        case "BT":
        case "RL":
        case "TLR":
        case "BLR":
        case "BTR":
        case "BTL":
        case "BTLR":
          grid[x][y] = { type: pattern };
          break;
      }
    }

    // Assign room IDs and collect rooms
    const rooms = [];
    const corridors = [];

    let corridorID = 1;
    let roomID = 1;
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        const cell = grid[x]?.[y];
        if (cell?.type === "BASIC_ROOM") {
          cell.id = roomID++;
          rooms.push(cell);
        } else if (cell) {
          cell.id = corridorID++;
          corridors.push(cell);
        }
      }
    }

    return {
      grid,
      width,
      height,
      rooms,
      corridors,
      roomCount: roomID - 1,
      corridorCount: corridorID - 1,
      visit: (fn) => {
        for (let x = 0; x < height; x++) {
          for (let y = 0; y < width; y++) {
            fn(grid[x][y], x, y);
          }
        }
      },
    };
  },

  fillStation(stationGrid, options = {}) {
    options = {
      lifeSupportsN: 2,
      hasPowerSource: true,
      ...options,
    };

    const lifeSupports = pickRandomN(this.getModulesByPurpose("Life Support"), options.lifeSupportsN);
    const powerSource = pickRandom(this.getModulesByPurpose("Power Source", true));

    const placeModuleRandomly = (module) => {
      for (let i = 0; i < 1000; i++) {
        const room = pickRandom(stationGrid.rooms);
        if (!room.module) {
          room.module = module;
          room.status = pickRandom(room.module.statuses);
          return;
        }
      }
    };

    // Place power source
    if (options.hasPowerSource) {
      placeModuleRandomly(powerSource);
    }

    // Place life supports
    lifeSupports.forEach(placeModuleRandomly);

    // Fill rest randomly
    const rest = pickRandomN(
      _DIS_STATION_DATA.modules.filter((module) => module.purpose !== "Power Source" && module.purpose !== "Life Support"),
      stationGrid.roomCount,
    );
    stationGrid.rooms.forEach((room) => {
      if (!room.module) {
        if (rest.length > 0) {
          room.module = rest.pop();
        } else {
          room.module = pickRandom(_DIS_STATION_DATA.modules);
        }
        room.status = pickRandom(room.module.statuses);
      }
    });

    stationGrid.name = this.generateStationName();

    return stationGrid;
  },

  /**
   * Creates a HTML representation of a station grid
   */
  printStationGrid(station, options = {}) {
    options = {
      showRoomIDs: true,
      showCorridorIDs: false,
      ...options,
    };

    return div(
      "w-100 h-100 flex flex-wrap",
      (() => {
        const divs = [];
        const grid = station.grid;
        const widthPerc = 100 / station.width;

        for (let x = 0; x < station.height; x++) {
          for (let y = 0; y < station.width; y++) {
            const cell = grid[x]?.[y];
            const type = cell?.type;
            const inner = (() => {
              switch (type) {
                // Basic room with doors
                case "BASIC_ROOM":
                  const dxy = [
                    [1, 0, "B"],
                    [-1, 0, "T"],
                    [0, -1, "L"],
                    [0, 1, "R"],
                  ];
                  const doors = dxy
                    .map((xy) => {
                      if (x + xy[0] < 0 || x + xy[0] >= station.height) {
                        return "";
                      }
                      if (y + xy[1] < 0 || y + xy[1] >= station.width) {
                        return "";
                      }
                      if (grid[x + xy[0]]?.[y + xy[1]]?.type === "BASIC_ROOM") {
                        return xy[2];
                      }
                      return "";
                    })
                    .map((c) => {
                      switch (c) {
                        case "B":
                          return div("absolute", "bottom: -12px; left: calc(50% - 10px); width: 20px; height: 10px; background: black;", "");
                        case "T":
                          return div("absolute", "top: -12px; left: calc(50% - 10px); width: 20px; height: 10px; background: black;", "");
                        case "L":
                          return div("absolute", "left: -12px; top: calc(50% - 10px); width: 10px; height: 20px; background: black;", "");
                        case "R":
                          return div("absolute", "right: -12px; top: calc(50% - 10px); width: 10px; height: 20px; background: black;", "");
                      }
                    })
                    .join("");

                  const id = options.showRoomIDs ? `${cell.id}${cell?.module?.essential ? "E" : ""}` : "";

                  return div("w-100 h-100 ba bw2 br3 b f3 pa2 relative", `${id}${doors}`);
              }

              if (type) {
                return div(
                  "w-100 h-100 relative f3 b pa2",
                  (options.showCorridorIDs ? `C${cell.id}` : "") +
                    type
                      .split("")
                      .map((c) => {
                        switch (c) {
                          case "B":
                            return div(
                              "absolute",
                              "bottom: -10px; left: calc(50% - 5px); width: 10px; height: calc(50% + 10px); background: black;",
                              "",
                            );
                          case "T":
                            return div(
                              "absolute",
                              "top: -10px; left: calc(50% - 5px); width: 10px; height: calc(50% + 10px); background: black;",
                              "",
                            );
                          case "L":
                            return div(
                              "absolute",
                              "left: -10px; top: calc(50% - 5px); width: calc(50% + 15px); height: 10px; background: black;",
                              "",
                            );
                          case "R":
                            return div(
                              "absolute",
                              "right: -10px; top: calc(50% - 5px); width: calc(50% + 15px); height: 10px; background: black;",
                              "",
                            );
                        }
                      })
                      .join(""),
                );
              }

              return "";
            })();

            divs.push(div("flex flex-wrap", `width: ${widthPerc}%; aspect-ratio: 1/1; padding: 5px;`, inner));
          }
        }

        return divs.join("\n");
      })(),
    );
  },
};

window._bigjk ??= {};
window._bigjk.gen_dis_station = true;

console.log("gen-dis-station.js loaded");
