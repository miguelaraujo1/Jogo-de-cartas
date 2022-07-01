import { useEffect, useState, useContext } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { getCards } from "../../services/axiosClient";
import { styles } from "./styles";
import { NickContext } from "../../NickContext";
import bgImg from "../../images/fundoVerde.jpg";

const Game = ({ route, navigation }) => {
  const { deckId } = route.params;
  const [cards, setCards] = useState(null);
  const [naipe, setNaipe] = useState(0);
  const { dados } = useContext(NickContext);
  const [restante, setRestante] = useState(52);

  const verificar = () => {
    const ganhou =
      cards &&
      cards.cards.every(
        (card) => card.suit == "CLUBS" || card.suit == "SPADES"
      );

    if (cards == null) {
      return;
    } else if (restante <= 2) {
      alert("As cartas acabaram");
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
    } else if (ganhou) {
      alert(`🏆Parabéns ${dados}, você venceu🏆`);
    } else {
      alert(
        "☠️ VOCÊ PERDEU ☠️                                                                     Tente novamente"
      );
    }
  };

  const comprarCartas = () => {
    const get = async () => {
      const deck = await getCards(deckId, 3);
      setCards(deck);
      setRestante(restante - 3);
    };
    get();

    //

    //

    //DAQUI ATÉ A LINHA 37 É TENTATIVA

    //   {cards && cards.cards.map((card) => (
    //     setNaipe({...cards, ...card.suit})
    //   ))}
    //   alert(naipe)
    //   console.log("aqui",naipe);

    //   if((cards[0].suit=="CLUBS" || cards[0].suit=="SPADES")&&(cards[1].suit=="CLUBS" || cards[1].suit=="SPADES")&&(cards[2].suit=="CLUBS" || cards[2].suit=="SPADES")){
    //     return alert("Você ganhou!")
    //   }
    //   else{
    //    return alert("Não foi dessa vez, tente novamente")
    //   }
  };

  //TENTATIVA ATÉ AQUI

  useEffect(() => {
    setTimeout(() => {
      verificar();
    }, 500);
  }, [cards]);

  return (
    <ImageBackground
      source={bgImg}
      style={styles.container}
      imageStyle={{ resizeMode: "contain", transform: [{ scale: 2.3 }] }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cards &&
          cards.cards.map((card, index) => (
            <Image
              key={index}
              source={{ uri: card.image }}
              style={{ width: 130, height: 195, resizeMode: "contain" }}
            ></Image>
          ))}
      </View>

      <View>
        <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
          Regras do jogo: Se as 3 cartas compradas forem da cor preta, você
          ganha!
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.comprarCartas} onPress={comprarCartas}>
          <Text>Comprar cartas</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Game;
