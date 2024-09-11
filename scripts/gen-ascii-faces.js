/*
 * Credits for the ascii face data goes to: https://huw2k8.itch.io/warsims-generator-toolbox
 */

if (!window._bigjk.base) {
  throw new Error("gen-ascii-faces.js requires base.js to be loaded first");
}

if (!window._bigjk.random) {
  throw new Error("gen-ascii-faces.js requires random.js to be loaded first");
}

const _FACE_DATA_URL_BASE = "/proxy/https://raw.githubusercontent.com/BigJk/end_of_eden/main/assets/gen/faces/Face";
const _FACE_DATA_URL = new Array(6).fill(0).map((_, i) => `${_FACE_DATA_URL_BASE}${i + 1}.txt`);
const _FACES = [{}, {}, {}, {}, {}, {}];
const _FACE_TYPE = `
Men.1
Cthuul.1
Mutants.1
Druids.1
Centaars.13
Centaurs.1
Orks.37
Cyclops.8
Demigods.11
Demons.9
Draconians.10
Dryads.27
Dwarves.12
Elves.13
Faun.1
Witches.26
Fiends.7
Ghouls.19
Giants.3
Gnolls.25
Gnomes.18
Goblins.2
Gogs.2
Gremlins.2
Half-Giants.3
Halflings.39
Hobgoblins.2
Implings.2
Imps.2
Kappas.5
Kobolds.29
Lizardmen.10
Magi.1
Magogs.2
Mermen.5
Minotaurs.15
Minotaars.15
Naga.5
Necromancers.1
Ogres.16
Orclings.6
Orcs.6
Satyrs.43
Sorcerers.1
Tritons.5
Trolls.20
Trows.30
Vampires.14
Warlocks.1
Troglodytes.2
Wizards.1
Folk.1
Snotlings.2
Liches.7
Corpselords.7
Elders.1
Asshthaki.1
Zombies.19
Ghosts.1
Bogeymen.19
Ents.22
Treemen.22
Shroomlings.23
Golems.24
Harpies.28
Oracles.1
Pyromancers.1
Aquamancers.1
Aeromancers.1
Auramancers.1
Lavamancers.1
Terramancers.1
Hydromancers.1
Godlings.11
Half-Demons.1
Abominations.31
Psions.1
Underlings.32
Grumpkin.33
Essfanti.34
Protofolk.35
Skeeroks.36
Cannibals.1
Shades.7
Bloodlings.2
Blogroki.38
Homunculi.39
Fungus Folk.23
People.1
Gillghouls.42`
  .split("\n")
  .filter((l) => l.trim())
  .map((l) => l.trim().split("."))
  .reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});

// Load the face data
_FACE_DATA_URL.forEach((url, fi) => {
  const chunk = syncFetch(url);

  chunk.split("\n").forEach((l) => {
    const id = l.substr(0, l.indexOf("."));
    const line = l.substr(l.indexOf(".") + 2);

    if (!_FACES[fi][id]) {
      _FACES[fi][id] = [];
    }
    _FACES[fi][id].push(line);
  });
});

/*
 * Get all face types.
 */
function getFaceTypes() {
  return Object.keys(_FACE_TYPE);
}

/**
 * Generate a ascii face.
 * @param {string|number} type - The type of face to generate. Can be a string or a number. If a string is provided, it will be converted to a number. Use getFaceTypes() to get all the possible types. Example types: People, Psions, Underlings...
 * @returns {string} - The generated
 */
function generateFace(type = 1) {
  if (typeof type === "string") {
    type = _FACE_TYPE[type];
  }

  return `${pickRandom(_FACES[0][type.toString()])}
${pickRandom(_FACES[1][type.toString()])}
${pickRandom(_FACES[2][type.toString()])}
${pickRandom(_FACES[3][type.toString()])}
${pickRandom(_FACES[4][type.toString()])}
${pickRandom(_FACES[5][type.toString()])}`;
}

window._bigjk ??= {};
window._bigjk.gen_ascii_faces = true;

console.log("gen-ascii-faces.js loaded");
