import { View } from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { modalStyles } from '../styles/modalStyles';
import { GameEndModalProps } from '../types/types';
import LottieView from 'lottie-react-native';
import FadeInAnimation from './FadeInAnimation';

export default function GameModal({ visible, status, targetWord, goHome, definition, guessAmount }: GameEndModalProps) {

    const gameWon = status === "won";

    return (
        <Portal>
            <Modal visible={visible} style={modalStyles.modalContainer}>
                <FadeInAnimation duration={1000}>
                    <View style={modalStyles.modalContent}>
                        <Text variant="titleMedium" style={modalStyles.modalTitle}>
                            {gameWon ? "You Won!" : "You Lost!"}
                        </Text>
                        <Text variant="titleSmall" style={{textAlign: "center", marginTop: 10}}>
                            You got the word in {guessAmount} guesses.
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
                        <Text variant="titleSmall" style={{textAlign: "center", marginBottom: 20, marginTop: 10}}>
                            {definition ? definition : "No definition available."}
                        </Text>
                        <Button onPress={goHome} mode="contained">
                            Home
                        </Button>
                    </View>
                </FadeInAnimation>
            </Modal>
        </Portal>
    )
}