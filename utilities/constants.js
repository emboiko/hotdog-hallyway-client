import druidIcon from "~/public/static/img/png/druidIcon.png"
import hunterIcon from "~/public/static/img/png/hunterIcon.png"
import mageIcon from "~/public/static/img/png/mageIcon.png"
import paladinIcon from "~/public/static/img/png/paladinIcon.png"
import priestIcon from "~/public/static/img/png/priestIcon.png"
import rogueIcon from "~/public/static/img/png/rogueIcon.png"
import shamanIcon from "~/public/static/img/png/shamanIcon.png"
import warlockIcon from "~/public/static/img/png/warlockIcon.png"
import warriorIcon from "~/public/static/img/png/warriorIcon.png"

import druidBalanceIcon from "~/public/static/img/jpg/druidBalanceIcon.jpg"
import druidFeralIcon from "~/public/static/img/jpg/druidFeralIcon.jpg"
import druidRestorationIcon from "~/public/static/img/jpg/druidRestorationIcon.jpg"
import hunterMarksmanshipIcon from "~/public/static/img/jpg/hunterMarksmanshipIcon.jpg"
import hunterBeastMasteryIcon from "~/public/static/img/jpg/hunterBeastMasteryIcon.jpg"
import hunterSurvivalIcon from "~/public/static/img/jpg/hunterSurvivalIcon.jpg"
import mageArcaneIcon from "~/public/static/img/jpg/mageArcaneIcon.jpg"
import mageFireIcon from "~/public/static/img/jpg/mageFireIcon.jpg"
import mageFrostIcon from "~/public/static/img/jpg/mageFrostIcon.jpg"
import paladinHolyIcon from "~/public/static/img/jpg/paladinHolyIcon.jpg"
import paladinRetributionIcon from "~/public/static/img/jpg/paladinRetributionIcon.jpg"
import paladinProtectionIcon from "~/public/static/img/jpg/paladinProtectionIcon.jpg"
import priestDisciplineIcon from "~/public/static/img/jpg/priestDisciplineIcon.jpg"
import priestHolyIcon from "~/public/static/img/jpg/priestHolyIcon.jpg"
import priestShadowIcon from "~/public/static/img/jpg/priestShadowIcon.jpg"
import rogueAssassinationIcon from "~/public/static/img/jpg/rogueAssassinationIcon.jpg"
import rogueCombatIcon from "~/public/static/img/jpg/rogueCombatIcon.jpg"
import rogueSubletyIcon from "~/public/static/img/jpg/rogueSubletyIcon.jpg"
import shamanElementalIcon from "~/public/static/img/jpg/shamanElementalIcon.jpg"
import shamanEnhancementIcon from "~/public/static/img/jpg/shamanEnhancementIcon.jpg"
import shamanRestorationIcon from "~/public/static/img/jpg/shamanRestorationIcon.jpg"
import warlockAfflicationIcon from "~/public/static/img/jpg/warlockAfflicationIcon.jpg"
import warlockDemonologyIcon from "~/public/static/img/jpg/warlockDemonologyIcon.jpg"
import warlockDestructionIcon from "~/public/static/img/jpg/warlockDestructionIcon.jpg"
import warriorArmsIcon from "~/public/static/img/jpg/warriorArmsIcon.jpg"
import warriorFuryIcon from "~/public/static/img/jpg/warriorFuryIcon.jpg"
import warriorProtectionIcon from "~/public/static/img/jpg/warriorProtectionIcon.jpg"

const COLORS = {
  darkGrey: "#181A1B",
  red: "#FF0000",
  yellow: "#ebac00",
  lightGreen: "#1EDF58",
  accentBlue: "#22aad0",
  Druid: "#FF7D0A",
  Hunter: "#ABD473",
  Mage: "#69CCF0",
  Paladin: "#F58CBA",
  Priest: "#FFFFFF",
  Rogue: "#FFF569",
  Shaman: "#0070DE",
  Warlock: "#9f92C9",
  Warrior: "#C79C6E"
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
    specializations: ["Holy", "Retribution", "Protection"],
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

const SPECIALIZATION_ICONS = {
  "Druid": {
    "Balance": druidBalanceIcon,
    "Feral": druidFeralIcon,
    "Restoration": druidRestorationIcon,
  },
  "Hunter": {
    "Beast Mastery": hunterBeastMasteryIcon,
    "Marksmanship": hunterMarksmanshipIcon,
    "Survival": hunterSurvivalIcon,
  },
  "Mage": {
    "Arcane": mageArcaneIcon,
    "Fire": mageFireIcon,
    "Frost": mageFrostIcon,
  },
  "Paladin": {
    "Holy": paladinHolyIcon,
    "Retribution": paladinRetributionIcon,
    "Protection": paladinProtectionIcon,
  },
  "Priest": {
    "Discipline": priestDisciplineIcon,
    "Holy": priestHolyIcon,
    "Shadow": priestShadowIcon,
  },
  "Rogue": {
    "Assassination": rogueAssassinationIcon,
    "Combat": rogueCombatIcon,
    "Sublety": rogueSubletyIcon,
  },
  "Shaman": {
    "Elemental": shamanElementalIcon,
    "Enhancement": shamanEnhancementIcon,
    "Restoration": shamanRestorationIcon,
  },
  "Warlock": {
    "Afflication": warlockAfflicationIcon,
    "Demonology": warlockDemonologyIcon,
    "Destruction": warlockDestructionIcon,
  },
  "Warrior": {
    "Arms": warriorArmsIcon,
    "Fury": warriorFuryIcon,
    "Protection": warriorProtectionIcon,
  },
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
        defeated: true,
      },
      "Reliquary of Souls": {
        defeated: true,
      },
      "Mother Shahraz": {
        defeated: false,
        progressing: true,
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
  SPECIALIZATION_ICONS,
  APPLICATION_STATUSES,
  BOSSES
}
