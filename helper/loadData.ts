import races from "../data/races.json";
import backgrounds from "../data/backgrounds.json";
import classes from "../data/classes.json";
import alignments from "../data/alignments.json";
import levels from "../data/levels.json";

function loadRaces() {
  return races;
}

function loadBackgrounds() {
  return backgrounds;
}

function loadClasses() {
  return classes;
}

function loadAlignments() {
  return alignments;
}

function loadLevels() {
  return levels;
}

export { loadRaces, loadBackgrounds, loadClasses, loadAlignments, loadLevels };
