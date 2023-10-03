import races from "../data/races.json";
import backgrounds from "../data/backgrounds.json";
import classes from "../data/classes.json";
import alignments from "../data/classes.json";

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

export { loadRaces, loadBackgrounds, loadClasses, loadAlignments };
