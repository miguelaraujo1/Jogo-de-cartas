import React, { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground } from "react-native";
import { getDeckId } from "../../services/axiosClient";
import { styles } from "./styles";
import bgImg from "../../images/AAAA.webp";
import { TextInput } from "react-native";
import { useContext } from "react";
import { NickContext } from "../../NickContext";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [idDeck, setIdDeck] = useState(null);
  const [nickName, setNickName] = useState("player1")

  const {dados, setDados} = useContext(NickContext)

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const id = await getDeckId();
      setIdDeck(id);
      setLoading(false);
    };
    get();
    
  }, []);

  const inciarPartida = async () => {
    navigation.navigate("Game", {
      deckId: idDeck,
    });
    setDados(nickName)
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.container}
      imageStyle={{ resizeMode: "contain", transform: [{ scale: 2.3 }] }}
    >
      <Text style={styles.title}>Jogo de Cartas</Text>
      <View style={{ flex: 2, justifyContent: "center", paddingTop: "25%" }}>
        <Button title="Iniciar Partida" onPress={inciarPartida} headerShown/>
        <TextInput style={styles.input} placeholder="Insira seu nickname" onChangeText={setNickName}></TextInput>
      </View>
    </ImageBackground>
  );
};

export default Home;
