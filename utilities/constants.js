import druidIcon from "~/public/static/img/png/druidIcon.png"
import hunterIcon from "~/public/static/img/png/hunterIcon.png"
import mageIcon from "~/public/static/img/png/mageIcon.png"
import paladinIcon from "~/public/static/img/png/paladinIcon.png"
import priestIcon from "~/public/static/img/png/priestIcon.png"
import rogueIcon from "~/public/static/img/png/rogueIcon.png"
import shamanIcon from "~/public/static/img/png/shamanIcon.png"
import warlockIcon from "~/public/static/img/png/warlockIcon.png"
import warriorIcon from "~/public/static/img/png/warriorIcon.png"

const COLORS = {
  darkGrey: "#181A1B",
  red: "#FF0000",
  yellow: "#ebac00",
  lightGreen: "#1EDF58",
  accentBlue: "#22aad0"
}

const UI_SIZES = {
  medium: 700,
  small: 500,
  tiny: 300
}

const PLAYER_SPECIALIZATIONS = {
  "Druid": {
    specializations: ["Balance", "Feral", "Restoration"],
    races: ["Tauren"],
    icon: druidIcon
  },
  "Hunter": {
    specializations: ["Beast Mastery", "Marksmanship", "Survival"],
    races: ["Blood Elf", "Orc", "Tauren", "Troll"],
    icon: hunterIcon
  },
  "Mage": {
    specializations: ["Arcane", "Fire", "Frost"],
    races: ["Blood Elf", "Troll", "Undead"],
    icon: mageIcon
  },
  "Paladin": {
    specializations: ["Holy", "Protection", "Retribution"],
    races: ["Blood Elf"],
    icon: paladinIcon
  },
  "Priest": {
    specializations: ["Discipline", "Holy", "Shadow"],
    races: ["Blood Elf", "Troll", "Undead"],
    icon: priestIcon
  },
  "Rogue": {
    specializations: ["Assassination", "Combat", "Subtlety"],
    races: ["Blood Elf", "Orc", "Troll", "Undead"],
    icon: rogueIcon
  },
  "Shaman": {
    specializations: ["Restoration", "Enhancement", "Elemental"],
    races: ["Orc", "Tauren", "Troll"],
    icon: shamanIcon
  },
  "Warlock": {
    specializations: ["Affliction", "Demonology", "Destruction"],
    races: ["Blood Elf", "Orc", "Undead"],
    icon: warlockIcon
  },
  "Warrior": {
    specializations: ["Arms", "Fury", "Protection"],
    races: ["Orc", "Tauren", "Troll", "Undead"],
    icon: warriorIcon
  }
}

const APPLICATION_STATUSES = {
  pending: "pending",
  declined: "declined",
  accepted: "accepted",
}

const BOSSES = {
  "P1": {
    "Karazhan": {
      "Attumen the Huntsman": {
        defeated: true
      },
      "Moroes": {
        defeated: true
      },
      "Maiden of Virtue": {
        defeated: true
      },
      "Opera House": {
        defeated: true
      },
      "Curator": {
        defeated: true
      },
      "Shade of Aran": {
        defeated: true
      },
      "Terestian Illhoof": {
        defeated: true
      },
      "Netherspite": {
        defeated: true
      },
      "Chess Event": {
        defeated: true
      },
      "Prince Malchezaar": {
        defeated: true
      },
      "Nightbane": {
        defeated: true
      }
    },
    "Gruul's Lair": {
      "High King Maulgar": {
        defeated: true
      },
      "Gruul": {
        defeated: true
      }
    },
    "Magtheridon's Lair": {
      "Magtheridon": {
        defeated: true
      }
    }
  },
  "P2": {
    "Serpentshrine Cavern": {
      "Hydross the Unstable": {
        defeated: true
      },
      "The Lurker Below": {
        defeated: true
      },
      "Leotheras the Blind": {
        defeated: true
      },
      "Fathom Lord Karathress": {
        defeated: true
      },
      "Morogrim Tidewalker": {
        defeated: true
      },
      "Lady Vashj": {
        defeated: true
      }
    },
    "Tempest Keep": {
      "A'lar": {
        defeated: true
      },
      "Void Reaver": {
        defeated: true
      },
      "High Astromancer Solarian": {
        defeated: true
      },
      "Kael'thas Sunstrider": {
        defeated: true
      }
    }
  },
  "P3": {
    "Mount Hyjal": {
      "Rage Winterchill": {
        defeated: true
      },
      "Anetheron": {
        defeated: true
      },
      "Kaz'rogal": {
        defeated: true
      },
      "Azgalor": {
        defeated: true
      },
      "Archimonde": {
        defeated: true
      }
    },
    "Black Temple": {
      "High Warlord Naj'entus": {
        defeated: true
      },
      "Supremus": {
        defeated: true
      },
      "Shade of Akama": {
        defeated: true
      },
      "Teron Gorefiend": {
        defeated: true
      },
      "Gurtogg Bloodboil": {
        defeated: false,
        progressing: true
      },
      "Reliquary of Souls": {
        defeated: false
      },
      "Mother Shahraz": {
        defeated: false
      },
      "Illidari Council": {
        defeated: false
      },
      "Illidan Stormrage": {
        defeated: false
      }
    }
  }
}

module.exports = {
  COLORS,
  UI_SIZES,
  PLAYER_SPECIALIZATIONS,
  APPLICATION_STATUSES,
  BOSSES
}
