import { TouchableOpacity, View } from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { modalStyles } from '../styles/modalStyles';
import { GameEndModalProps } from '../types/types';
import LottieView from 'lottie-react-native';
import FadeInAnimation from './FadeInAnimation';
import { getPoints } from '../utils/resultService';
import PointAnimation from './PointAnimation';
import { shareResult } from '../utils/shareService';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function GameModal({ visible, status, targetWord, goHome, definition, guessAmount, startingPoints }: GameEndModalProps) {

    const gameWon = status === "won";
    let playerPointsDiff = 0
    let prefix = "";

    if (gameWon) {
        playerPointsDiff = getPoints(targetWord.length)
    } else {
        playerPointsDiff = -50
    }

    let totalPoints = startingPoints + playerPointsDiff;
    if(totalPoints < 0){
        prefix = "-";
    }

    return (
        <Portal>
            <Modal visible={visible} style={modalStyles.modalContainer}>
                <FadeInAnimation duration={1000}>
                    <View style={modalStyles.modalContent}>

                        <View style={modalStyles.share}>
                            <TouchableOpacity onPress={() => shareResult({ word: targetWord, won: gameWon, guesses: guessAmount, rating: totalPoints })}>
                                <AntDesign name="sharealt" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <Text variant="displayMedium" style={modalStyles.modalTitle}>
                            {gameWon ? "YOU WON!" : "YOU LOST!"}
                        </Text>

                        <Text variant="titleSmall" style={{ textAlign: "center", marginTop: 10 }}>
                            {gameWon ? `You got the word in ${guessAmount} guesses.` : "You didn't guess the word this time"}
                        </Text>

                        <LottieView
                            source={gameWon ? require('../assets/winAnimation.json') : require('../assets/lossAnimation.json')}
                            autoPlay
                            loop={true}
                            style={{ width: 200, height: 200, alignContent: "center", alignSelf: "center" }}
                        />

                        <Text variant="displayMedium" style={{ textAlign: "center" }}>
                            The word was: {targetWord.toUpperCase()}
                        </Text>

                        <Text variant="titleSmall" style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}>
                            {definition ? definition : "No definition available."}
                        </Text>

                        <Text variant="displayMedium" style={{ textAlign: "center", marginBottom: 10, marginTop: 10 }}>
                            YOUR TOTAL POINTS ARE:
                        </Text>

                        <View style={{ marginBottom: 20, flexDirection: "row", justifyContent: "center" }}>
                            <Text style={{ color: "red", fontSize: 30 }}>{prefix}</Text>
                            <PointAnimation totalPoints={startingPoints} difference={playerPointsDiff} fontSize={30} />
                        </View>

                        <Button onPress={goHome} mode="contained">
                            Home
                        </Button>

                    </View>
                </FadeInAnimation>
            </Modal>
        </Portal>
    )
}