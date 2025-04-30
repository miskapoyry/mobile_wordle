import { View } from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { modalStyles } from '../styles/modalStyles';
import { GameEndModalProps } from '../types/types';
import LottieView from 'lottie-react-native';
import FadeInAnimation from './FadeInAnimation';
import { getPoints } from '../utils/resultService';
import PointAnimation from './PointAnimation';

export default function GameModal({ visible, status, targetWord, goHome, definition, guessAmount, startingPoints }: GameEndModalProps) {

    const gameWon = status === "won";
    let playerPointsDiff = 0

    if (gameWon) {
        playerPointsDiff = getPoints(targetWord.length)
    } else {
        playerPointsDiff = -50
    }

    return (
        <Portal>
            <Modal visible={visible} style={modalStyles.modalContainer}>
                <FadeInAnimation duration={1000}>
                    <View style={modalStyles.modalContent}>
                        <Text variant="titleMedium" style={modalStyles.modalTitle}>
                            {gameWon ? "You Won!" : "You Lost!"}
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
                        <Text variant="titleMedium" style={modalStyles.modalText}>
                            The word was: {targetWord.toUpperCase()}
                        </Text>
                        <Text variant="titleSmall" style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}>
                            {definition ? definition : "No definition available."}
                        </Text>
                        <Text variant="displayMedium" style={{ textAlign: "center", marginBottom: 10, marginTop: 10 }}>
                            Your new total points are:
                        </Text>
                        <View style={{ marginBottom: 20 }}>
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