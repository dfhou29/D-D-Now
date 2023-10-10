"use client";
import React from "react";
import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";

const styles = StyleSheet.create({
  basicInfoItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  basicInfoItemKey: {
    fontSize: 6,
    paddingBottom: 2,
  },
  basicInfoItemValue: {
    fontSize: 8,
    textAlign: "center",
    fontWeight: "heavy", // doesnt work for default font
  },
  abilityScoreItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  abilityScoreKey: {
    fontSize: 6,
    paddingBottom: 2,
  },
  abilityScoreValue: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "heavy", // doesnt work for default font
    paddingBottom: 1.5,
  },
  abilityScoreMod: {
    fontSize: 10,
    textAlign: "center",
  },
  spellItem: {
    fontSize: 5,
    width: 100,
    lineHeight: 2.1,
  },
});

const Pdf = ({ character }) => {
  const {
    name,
    age,
    height,
    weight,
    eyes,
    skin,
    hair,
    race,
    rank,
    background,
    alignment,
    level,
    armor_class,
    ability_scores,
    hit_points,
    hit_dice,
    proficiencies,
    racial_traits,
    class_features,
    equipments,
    spells,
    personality,
    ideals,
    bonds,
    flaws,
    backstory,
  } = character;

  let initiative = "";
  let dexterityModifier =
    "" + Math.floor((parseInt(ability_scores.dexterity) - 10) / 2);

  if (parseInt(dexterityModifier) > 0) {
    dexterityModifier = "+" + dexterityModifier;
  } else {
    dexterityModifier = "" + dexterityModifier;
  }

  initiative = dexterityModifier;

  let proficiencies_bonus = "+" + (Math.ceil(level / 4) + 1);

  return (
    <Document>
      <Page size="A5">
        <View style={{ width: "100%", height: "100%" }}>
          <Image
            source={"/png/page1.png"}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></Image>
          {/* name */}
          <Text
            style={{ position: "absolute", top: 44, left: 48, fontSize: 14 }}
          >
            {name}
          </Text>
          {/* basicinfo section */}
          <View style={{ position: "absolute", top: 40, right: 50 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: 180,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* basic info - class */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{rank}</Text>
                <Text style={styles.basicInfoItemKey}>Class</Text>
              </View>

              {/* basic info - level */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{level}</Text>
                <Text style={styles.basicInfoItemKey}>Level</Text>
              </View>

              {/* basic info - race */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{race}</Text>
                <Text style={styles.basicInfoItemKey}>Race</Text>
              </View>

              {/* basic info - background */}
              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{background}</Text>
                <Text style={styles.basicInfoItemKey}>Background</Text>
              </View>

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{alignment}</Text>
                <Text style={styles.basicInfoItemKey}>Alignment</Text>
              </View>
            </View>
          </View>

          {/* abilityScore section */}
          <View style={{ position: "absolute", top: 110, left: 23 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* strenth  */}
              <View style={styles.abilityScoreItem}>
                <Text style={styles.abilityScoreKey}>Strength</Text>
                <Text style={styles.abilityScoreValue}>
                  {ability_scores.strength}
                </Text>
                {/* replace with strength modifier */}
                <Text style={styles.abilityScoreMod}>0</Text>
              </View>

              {/* dexterity  */}
              <View style={styles.abilityScoreItem}>
                <Text style={styles.abilityScoreKey}>Dexterity</Text>
                <Text style={styles.abilityScoreValue}>
                  {ability_scores.dexterity}
                </Text>
                {/* replace with dexerity modifier */}
                <Text style={styles.abilityScoreMod}>0</Text>
              </View>

              {/* constitution  */}
              <View style={styles.abilityScoreItem}>
                <Text style={styles.abilityScoreKey}>Constitution</Text>
                <Text style={styles.abilityScoreValue}>
                  {ability_scores.constitution}
                </Text>
                {/* replace with constitution modifier */}
                <Text style={styles.abilityScoreMod}>0</Text>
              </View>

              {/* intelligence  */}
              <View style={styles.abilityScoreItem}>
                <Text style={styles.abilityScoreKey}>Intelligence</Text>
                <Text style={styles.abilityScoreValue}>
                  {ability_scores.intelligence}
                </Text>
                {/* replace with intelligence modifier */}
                <Text style={styles.abilityScoreMod}>0</Text>
              </View>

              {/* wisdom  */}
              <View style={styles.abilityScoreItem}>
                <Text style={styles.abilityScoreKey}>Wisdom</Text>
                <Text style={styles.abilityScoreValue}>
                  {ability_scores.wisdom}
                </Text>
                {/* replace with wisdom modifier */}
                <Text style={styles.abilityScoreMod}>0</Text>
              </View>

              {/* charisma  */}
              <View style={styles.abilityScoreItem}>
                <Text style={styles.abilityScoreKey}>Charisma</Text>
                <Text style={styles.abilityScoreValue}>
                  {ability_scores.charisma}
                </Text>
                {/* replace with charisma modifier */}
                <Text style={styles.abilityScoreMod}>0</Text>
              </View>
            </View>
          </View>

          {/* inspiration */}
          <Text
            style={{ position: "absolute", top: 102, left: 94, fontSize: 4.5 }}
          >
            INSPIRATION
          </Text>

          {/* proficncies bonus */}
          {/* replace placeholder with proficiencies bonus */}
          <Text
            style={{ position: "absolute", top: 126, left: 70, fontSize: 12 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 131, left: 88, fontSize: 4.5 }}
          >
            PROFIENCIES BONUS
          </Text>

          {/* saving throw */}
          <Text
            style={{ position: "absolute", top: 218, left: 80, fontSize: 6 }}
          >
            SAVING THROW
          </Text>
          {/* strength */}
          <Text
            style={{ position: "absolute", top: 154, left: 80, fontSize: 7 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 154.5, left: 95, fontSize: 6 }}
          >
            Strength
          </Text>

          {/* dexterity */}
          <Text
            style={{ position: "absolute", top: 164, left: 80, fontSize: 7 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 164.5, left: 95, fontSize: 6 }}
          >
            Dexterity
          </Text>

          {/* constitution */}
          <Text
            style={{ position: "absolute", top: 174, left: 80, fontSize: 7 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 174.5, left: 95, fontSize: 6 }}
          >
            Constitution
          </Text>

          {/* intelligence */}
          <Text
            style={{ position: "absolute", top: 184, left: 80, fontSize: 7 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 184.5, left: 95, fontSize: 6 }}
          >
            Intelligence
          </Text>

          {/* wisdom */}
          <Text
            style={{ position: "absolute", top: 194, left: 80, fontSize: 7 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 194.5, left: 95, fontSize: 6 }}
          >
            Wisdom
          </Text>
          {/* charisma */}
          <Text
            style={{ position: "absolute", top: 204, left: 80, fontSize: 7 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 204.5, left: 95, fontSize: 6 }}
          >
            Charisma
          </Text>

          {/* armor class */}
          <Text
            style={{ position: "absolute", top: 105, left: 160, fontSize: 16 }}
          >
            {armor_class}
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 122,
              left: 161,
              fontSize: 5,
              width: 20,
            }}
          >
            ARMOR CLASS
          </Text>

          {/* initiative */}
          <Text
            style={{ position: "absolute", top: 105, left: 200, fontSize: 16 }}
          >
            {initiative}
          </Text>
          <Text
            style={{ position: "absolute", top: 130, left: 196, fontSize: 5 }}
          >
            INITIATIVE
          </Text>

          {/* speed */}
          {/* replace placeholder with speed */}
          <Text
            style={{ position: "absolute", top: 105, left: 244, fontSize: 16 }}
          >
            0
          </Text>
          <Text
            style={{ position: "absolute", top: 130, left: 240, fontSize: 5 }}
          >
            SPEED
          </Text>

          {/* hit point */}
          <Text
            style={{ position: "absolute", top: 150, left: 160, fontSize: 5 }}
          >
            Hit Point Maximum
          </Text>
          <Text
            style={{ position: "absolute", top: 160, left: 200, fontSize: 16 }}
          >
            {hit_points}
          </Text>
          <Text
            style={{ position: "absolute", top: 182, left: 180, fontSize: 6 }}
          >
            CURRENT HIT POINTS
          </Text>

          <Text
            style={{ position: "absolute", top: 222, left: 175, fontSize: 6 }}
          >
            TEMPORARY HIT POINTS
          </Text>

          {/* hit dice */}
          <Text
            style={{ position: "absolute", top: 242, left: 164, fontSize: 16 }}
          >
            {hit_dice}
          </Text>
          <Text
            style={{ position: "absolute", top: 264, left: 166, fontSize: 6 }}
          >
            HIT DICES
          </Text>

          {/* death save */}
          <Text
            style={{ position: "absolute", top: 244, left: 216, fontSize: 4 }}
          >
            SUCCESS
          </Text>
          <Text
            style={{ position: "absolute", top: 254, left: 216, fontSize: 4 }}
          >
            FAILURES
          </Text>
          <Text
            style={{ position: "absolute", top: 264, left: 218, fontSize: 6 }}
          >
            DEATH SAVES
          </Text>

          {/* personality */}
          <Text
            style={{
              position: "absolute",
              top: 110,
              left: 292,
              fontSize: 6,
              width: 95,
            }}
          >
            {personality}
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 140,
              left: 320,
              fontSize: 6,
              width: 95,
            }}
          >
            PERSONALITY
          </Text>

          {/* bonds */}
          <Text
            style={{
              position: "absolute",
              top: 160,
              left: 292,
              fontSize: 6,
              width: 95,
            }}
          >
            {bonds}
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 182,
              left: 328,
              fontSize: 6,
              width: 95,
            }}
          >
            BONDS
          </Text>

          {/* ideals */}
          <Text
            style={{
              position: "absolute",
              top: 202,
              left: 292,
              fontSize: 6,
              width: 95,
            }}
          >
            {ideals}
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 224,
              left: 328,
              fontSize: 6,
              width: 95,
            }}
          >
            IDEALS
          </Text>
          {/* flaws */}
          <Text
            style={{
              position: "absolute",
              top: 242,
              left: 292,
              fontSize: 6,
              width: 95,
            }}
          >
            {flaws}
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 264,
              left: 328,
              fontSize: 6,
              width: 95,
            }}
          >
            FLAWS
          </Text>

          {/* class feature and racial traits */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: 295,
              left: 290,
            }}
          >
            {Object.keys(racial_traits).map((key) => (
              <Text
                key={key}
                style={{ width: 100, fontSize: 6, marginBottom: 2 }}
              >
                {key}: {racial_traits[key].description}
              </Text>
            ))}
            {Object.keys(class_features).map((key) => (
              <Text
                key={key}
                style={{ width: 100, fontSize: 6, marginBottom: 2 }}
              >
                {key}: {class_features[key].description}
              </Text>
            ))}
          </View>
          <Text
            style={{
              position: "absolute",
              bottom: 26,
              left: 302,
              fontSize: 6,
            }}
          >
            TRAITS AND FEATURES
          </Text>

          {/* proficiency */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              bottom: 90,
              left: 28,
            }}
          >
            {Object.keys(proficiencies).map((key) => (
              <Text
                key={key}
                style={{ width: 100, fontSize: 6, marginBottom: 2 }}
              >
                {key}: {proficiencies[key].description}
              </Text>
            ))}
          </View>
          <Text
            style={{
              position: "absolute",
              bottom: 26,
              left: 56,
              fontSize: 6,
            }}
          >
            PROFICIENCIES
          </Text>

          {/* equipment */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              bottom: 96,
              left: 185,
            }}
          >
            {Object.keys(equipments).map((key) => (
              <Text
                key={key}
                style={{ width: 80, fontSize: 6, marginBottom: 2 }}
              >
                {key}: {equipments[key].description}
              </Text>
            ))}
          </View>
          <Text
            style={{
              position: "absolute",
              bottom: 26,
              left: 190,
              fontSize: 6,
            }}
          >
            EQIUPMENTS
          </Text>
        </View>
      </Page>

      {/* second page */}
      <Page size="A5">
        <View style={{ width: "100%", height: "100%" }}>
          <Image
            source={"/png/page2.png"}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></Image>
          {/* name */}
          <Text
            style={{ position: "absolute", top: 46, left: 48, fontSize: 14 }}
          >
            {name}
          </Text>

          {/* appearance section */}
          <View style={{ position: "absolute", top: 43, right: 50 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: 180,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* age */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{age}</Text>
                <Text style={styles.basicInfoItemKey}>Age</Text>
              </View>

              {/* height */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{height}</Text>
                <Text style={styles.basicInfoItemKey}>Height</Text>
              </View>

              {/* weight */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{weight}</Text>
                <Text style={styles.basicInfoItemKey}>Weight</Text>
              </View>

              {/* Eyes */}
              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{eyes}</Text>
                <Text style={styles.basicInfoItemKey}>Eyes</Text>
              </View>

              {/* skin */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{skin}</Text>
                <Text style={styles.basicInfoItemKey}>Skin</Text>
              </View>

              {/* hair */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoItemValue}>{hair}</Text>
                <Text style={styles.basicInfoItemKey}>Hair</Text>
              </View>
            </View>
          </View>

          {/* character appearance */}
          <Text
            style={{
              position: "absolute",
              top: 260,
              left: 40,
              fontSize: 6,
            }}
          >
            CHARACTER APPEARANCE
          </Text>

          {/* backstory */}
          <Text
            style={{
              position: "absolute",
              top: 292,
              left: 30,
              fontSize: 6,
              width: 100,
            }}
          >
            {backstory}
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 26,
              left: 60,
              fontSize: 6,
            }}
          >
            BACKSTORY
          </Text>

          {/* addtional features and traits  */}
          <Text
            style={{
              position: "absolute",
              top: 430,
              left: 226,
              fontSize: 6,
            }}
          >
            ADDTIONAL FEATURES & TRAITS
          </Text>

          {/* treasure  */}
          <Text
            style={{
              position: "absolute",
              bottom: 26,
              left: 250,
              fontSize: 6,
            }}
          >
            TREASURES
          </Text>
        </View>
      </Page>
      {/* page 3 */}
      <Page size="A5">
        <View style={{ width: "100%", height: "100%" }}>
          <Image
            source={"/png/page3.png"}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></Image>
          {/* name */}
          <Text
            style={{ position: "absolute", top: 46, left: 48, fontSize: 14 }}
          >
            {name}
          </Text>
          {/* spellcasting ability */}
          {/* replace placeholder with spellcasting ability */}
          <Text
            style={{
              position: "absolute",
              top: 45,
              left: 204,
              fontSize: 12,
            }}
          >
            AAA
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 64,
              left: 194,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            SPELLCASTING ABILITY
          </Text>

          {/* spell save dc */}
          {/* replace placeholder with spell save dc */}
          <Text
            style={{
              position: "absolute",
              top: 45,
              left: 278,
              fontSize: 12,
            }}
          >
            00
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 64,
              left: 260,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            SPELL SAVE DC
          </Text>
          {/* spell attack bonus */}
          {/* replace placeholder with spell attack bonus */}
          <Text
            style={{
              position: "absolute",
              top: 45,
              left: 350,
              fontSize: 12,
            }}
          >
            +0
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 64,
              left: 330,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            SPELL ATTACK BONUS
          </Text>

          {/* spells */}
          {/* cantrip */}
          <Text
            style={{
              position: "absolute",
              top: 114,
              left: 60,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            CANTRIPS
          </Text>
          <View
            style={{
              position: "absolute",
              top: 132,
              left: 24,
            }}
          >
            {spells.Cantrips &&
              Object.keys(spells.Cantrips).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells.Cantrips[key].description}
                </Text>
              ))}
          </View>

          {/* level1 */}

          <Text
            style={{
              position: "absolute",
              top: 240,
              left: 24,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 1
          </Text>

          <View
            style={{
              position: "absolute",
              top: 262,
              left: 28,
            }}
          >
            {spells["Level 1"] &&
              Object.keys(spells["Level 1"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 1"][key].description}
                </Text>
              ))}
          </View>

          {/* level 2 */}
          <Text
            style={{
              position: "absolute",
              top: 412,
              left: 24,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 2
          </Text>

          <View
            style={{
              position: "absolute",
              top: 432,
              left: 28,
            }}
          >
            {spells["Level 2"] &&
              Object.keys(spells["Level 2"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 2"][key].description}
                </Text>
              ))}
          </View>

          {/* level 3 */}
          <Text
            style={{
              position: "absolute",
              top: 114,
              left: 154,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 3
          </Text>

          <View
            style={{
              position: "absolute",
              top: 134,
              left: 160,
            }}
          >
            {spells["Level 3"] &&
              Object.keys(spells["Level 3"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 3"][key].description}
                </Text>
              ))}
          </View>

          {/* level 4 */}
          <Text
            style={{
              position: "absolute",
              top: 284,
              left: 154,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 4
          </Text>

          <View
            style={{
              position: "absolute",
              top: 304,
              left: 160,
            }}
          >
            {spells["Level 4"] &&
              Object.keys(spells["Level 4"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 4"][key].description}
                </Text>
              ))}
          </View>
          {/* level 5 */}
          <Text
            style={{
              position: "absolute",
              top: 454,
              left: 154,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 5
          </Text>

          <View
            style={{
              position: "absolute",
              top: 474,
              left: 160,
            }}
          >
            {spells["Level 5"] &&
              Object.keys(spells["Level 5"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 5"][key].description}
                </Text>
              ))}
          </View>
          {/* level 6 */}
          <Text
            style={{
              position: "absolute",
              top: 114,
              left: 282,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 6
          </Text>

          <View
            style={{
              position: "absolute",
              top: 134,
              left: 286,
            }}
          >
            {spells["Level 6"] &&
              Object.keys(spells["Level 6"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 6"][key].description}
                </Text>
              ))}
          </View>
          {/* level 7 */}
          <Text
            style={{
              position: "absolute",
              top: 242,
              left: 282,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 7
          </Text>

          <View
            style={{
              position: "absolute",
              top: 262,
              left: 286,
            }}
          >
            {spells["Level 7"] &&
              Object.keys(spells["Level 7"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 7"][key].description}
                </Text>
              ))}
          </View>
          {/* level 8 */}
          <Text
            style={{
              position: "absolute",
              top: 370,
              left: 282,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 8
          </Text>

          <View
            style={{
              position: "absolute",
              top: 389,
              left: 286,
            }}
          >
            {spells["Level 8"] &&
              Object.keys(spells["Level 8"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 8"][key].description}
                </Text>
              ))}
          </View>
          {/* level 9 */}
          <Text
            style={{
              position: "absolute",
              top: 476,
              left: 282,
              fontSize: 6,
              width: 50,
              textAlign: "center",
            }}
          >
            LEVEL 9
          </Text>

          <View
            style={{
              position: "absolute",
              top: 494,
              left: 286,
            }}
          >
            {spells["Level 9"] &&
              Object.keys(spells["Level 9"]).map((key) => (
                <Text key={key} style={styles.spellItem}>
                  {key} : {spells["Level 9"][key].description}
                </Text>
              ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PDFView = ({ character }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  });

  return (
    <PDFViewer style={{ width: "60%", height: "800px" }}>
      <Pdf character={character} />
    </PDFViewer>
  );
};

export default PDFView;
