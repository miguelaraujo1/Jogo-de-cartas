import React, { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground } from "react-native";
import { getDeckId } from "../../services/axiosClient";
import { styles } from "./styles";
import bgImg from "../../images/BBBB.jpg";
import { TextInput } from "react-native";
import { useContext } from "react";
import { NickContext } from "../../NickContext";

const Home = ({ navigation }) => {
 
  const [nickName, setNickName] = useState("Player 1")

  const {setDados} = useContext(NickContext)

  
  const inciarPartida = async () => {
    const id = await getDeckId();
    navigation.navigate("Game", {
      deckId: id,
    });
    setDados(nickName)
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.container}
      imageStyle={{ resizeMode: "contain", transform: [{ scale: 2.3 }] }}
    >
      <Text style={styles.title}>Black Lucky</Text>
      <View style={{ flex: 2, justifyContent: "center", paddingTop: "25%" }}>
        <Button title="Iniciar Partida" onPress={inciarPartida} headerShown/>
        <TextInput style={styles.input} placeholder="Insira seu nickname" onChangeText={setNickName}></TextInput>
      </View>
    </ImageBackground>
  );
};

export default Home;
