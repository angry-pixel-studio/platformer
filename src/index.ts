import { Game, Rectangle, CollisionMethodConfig, GameConfig } from "angry-pixel";
import { Stage01 } from "./Scene/Stage01";
import { Intro } from "./Scene/IntroScene";

const containerElement = document.getElementById("app");

// full config
const config: GameConfig = {
    containerNode: containerElement,
    gameWidth: 1280,
    gameHeight: 720,
    debugEnabled: false,
    canvasColor: "#000000",
    collisions: {
        method: CollisionMethodConfig.SAT,
    },
};

// min config
/*const config: GameConfig = {
    containerNode: containerElement,
    gameWidth: 1280,
    gameHeight: 720,
};*/

// Create the Game
const game = new Game(config);

// Add a scene
game.addScene("Intro", () => new Intro());
game.addScene("Stage01", () => new Stage01());

// Run the game
game.run();
