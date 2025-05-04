export const ranks = [
    { name: "NOOB", minPoints: -10000, maxPoints: -1, animation: require("../assets/noobAnimation.json"), },
    { name: "BEGINNER", minPoints: 0, maxPoints: 999, animation: require("../assets/beginnerAnimation.json"), },
    { name: "ADVANCED", minPoints: 1000, maxPoints: 2499, animation: require("../assets/advancedAnimation.json"), },
    { name: "PROFESSIONAL", minPoints: 2500, maxPoints: 4999, animation: require("../assets/professionalAnimation.json"), },
    { name: "GODLIKE", minPoints: 5000, maxPoints: 10000, animation: require("../assets/godAnimation.json"), },
]

export const getPlayerRank = (points: number) => {
    const playerRank = ranks.find(rank => points >= rank.minPoints && points <= rank.maxPoints);

    if (!playerRank) {
        return {
            name: "No Rank",
            progress: 0,
            rankMinPoints: 0,
            rankMaxPoints: 0,
            animation: null,
        }
    }

    const rankPoints = playerRank.maxPoints - playerRank.minPoints;
    const rankProgress = points - playerRank.minPoints;
    const progress = rankProgress / rankPoints;

    return {
        name: playerRank.name,
        progress: progress,
        rankMinPoints: playerRank.minPoints,
        rankMaxPoints: playerRank.maxPoints,
        animation: playerRank.animation,
    }
};  