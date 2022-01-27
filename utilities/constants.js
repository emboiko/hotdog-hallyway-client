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

const PLAYER_CLASSES = ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"]

const PLAYER_SPECIALIZATIONS = {
  "Druid": {
    specializations: ["Balance", "Feral", "Restoration"],
    races: ["Tauren"]
  },
  "Hunter": {
    specializations: ["Beast Mastery", "Marksmanship", "Survival"],
    races: ["Blood Elf", "Orc", "Tauren", "Troll"]
  },
  "Mage": {
    specializations: ["Arcane", "Fire", "Frost"],
    races: ["Blood Elf", "Troll", "Undead"]
  },
  "Paladin": {
    specializations: ["Holy", "Protection", "Retribution"],
    races: ["Blood Elf"]
  },
  "Priest": {
    specializations: ["Discipline", "Holy", "Shadow"],
    races: ["Blood Elf", "Troll", "Undead"]
  },
  "Rogue": {
    specializations: ["Assassination", "Combat", "Subtlety"],
    races: ["Blood Elf", "Orc", "Troll", "Undead"]
  },
  "Shaman": {
    specializations: ["Restoration", "Enhancement", "Elemental"],
    races: ["Orc", "Tauren", "Troll"]
  },
  "Warlock": {
    specializations: ["Affliction", "Demonology", "Destruction"],
    races: ["Blood Elf", "Orc", "Undead"]
  },
  "Warrior": {
    specializations: ["Arms", "Fury", "Protection"],
    races: ["Orc", "Tauren", "Troll", "Undead"]
  }
}

const APPLICATION_STATUSES = {
  pending: "pending",
  declined: "declined",
  accepted: "accepted",
}

module.exports = {
  COLORS,
  UI_SIZES,
  PLAYER_CLASSES,
  PLAYER_SPECIALIZATIONS,
  APPLICATION_STATUSES
}
