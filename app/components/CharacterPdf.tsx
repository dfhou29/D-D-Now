"use client";

import React from "react";
import {
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
  page: {
    // flexDirection: "row",
    // justifyContent: "flex-start",
    backgroundColor: "#E4E4E4",
  },
  basicInfoWrapper: {
    width: "230",
    height: "auto",
  },
  basicInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    backgroundColor: "red",
    flexGrow: 0,
  },
  basicInfoItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 5,
    border: 1,
    backgroundColor: "yellow",
    width: "60",
    height: "30",
    // marginBottom: 10,
  },
  basicInfoKey: {
    fontSize: 10,
  },
  basicInfoValue: {
    fontSize: 8,
  },
  acbilityItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",

    margin: 3,
    marginTop: 0,
    border: 1,
    backgroundColor: "yellow",
    width: "60",
    height: "30",
    // marginBottom: 10,
  },
  abilityKey: {
    fontSize: 10,
  },
  abilityValue: {
    fontSize: 8,
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
    hitPoints,
    hitDice,
    proficiencies,
    racialTraits,
    classFeatures,
    equipments,
    spells,
    personality,
    ideas,
    bonds,
    flaws,
    backstory,
  } = character;
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        {/* wrapper for name and character basic as a row */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "pink",
            height: "120",
            width: "100%",
          }}
        >
          <View>
            <Text style={{ textAlign: "left", fontSize: 10 }}>Name</Text>
            <Text>{name ? name : null}</Text>
          </View>
          {/* wrapper for basic info */}
          <View style={styles.basicInfoWrapper}>
            <Text style={{ textAlign: "left", fontSize: 10, marginBottom: 5 }}>
              Character Basic
            </Text>
            <View style={styles.basicInfo}>
              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoKey}>Level</Text>
                <Text style={styles.basicInfoValue}>
                  {level ? level : null}
                </Text>
              </View>

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoKey}>Race</Text>
                <Text style={styles.basicInfoValue}>{race ? race : null}</Text>
              </View>

              {/* <View style={{ width: 10 }}></View> */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoKey}>Class</Text>
                <Text style={styles.basicInfoValue}>{rank ? rank : null}</Text>
              </View>

              {/* <View style={{ width: 10 }}></View> */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoKey}>Background</Text>
                <Text style={styles.basicInfoValue}>
                  {background ? background : null}
                </Text>
              </View>

              {/* <View style={{ width: 10 }}></View> */}

              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoKey}>Alignment</Text>
                <Text style={styles.basicInfoValue}>
                  {alignment ? alignment : null}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* container for ability scores and its title*/}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "gray",
            height: "70",
            width: "100%",
          }}
        >
          <View style={{ textAlign: "left", marginLeft: 15 }}>
            <Text style={{ fontSize: 10, marginTop: 6 }}>Ability Scores</Text>
          </View>

          {/* container for ability scores */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              height: "50",
              width: "100%",
            }}
          >
            {Object.keys(ability_scores).map((key) => (
              <View key={key} style={styles.acbilityItem}>
                <Text style={styles.abilityKey}>{key}</Text>
                <Text style={styles.abilityValue}>{ability_scores[key]}</Text>
              </View>
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
