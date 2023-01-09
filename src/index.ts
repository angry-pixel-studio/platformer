import { Game, Rectangle, CollisionMethods, GameConfig, Vector2, BroadPhaseMethods } from "angry-pixel";
import { Stage01 } from "./Scene/Stage01";
import { Intro } from "./Scene/IntroScene";
import { Loading } from "./Scene/Loading";

const containerElement = document.getElementById("app");

// full config
const config: GameConfig = {
    containerNode: containerElement,
    gameWidth: 1280,
    gameHeight: 720,
    debugEnabled: false,
    canvasColor: "#000000",
    // physicsFramerate: 60,
    collisions: {
        collisionMethod: CollisionMethods.SAT,
        collisionMatrix: [
            ["Player", "Foreground"],
            ["Player", "Enemy"],
            ["Player", "Platform"],
            ["Player", "Hills"],
            ["Enemy", "Foreground"],
            ["Enemy", "Player"],
            ["Enemy", "Platform"],
            ["Enemy", "Hills"],
        ],
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
game.addScene(Loading, "Loading");
game.addScene(Intro, "Intro");
game.addScene(Stage01, "Stage01");

// Run the game
game.run();
