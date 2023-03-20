import { CollisionMatrix, Game, GameConfig } from "angry-pixel";
import { PARAMETERS } from "./config/parameters";
import { GameScene } from "./scene/GameScene";
import { Intro } from "./scene/IntroScene";
import { Loading } from "./scene/Loading";

const containerElement = document.getElementById("app");

// full config
const config: GameConfig = {
    containerNode: containerElement,
    gameWidth: 1280,
    gameHeight: 720,
    debugEnabled: false,
    canvasColor: "#000000",
    collisions: {
        collisionMatrix: PARAMETERS.collisionMatrix as CollisionMatrix,
    },
};

// Create the Game
const game = new Game(config);

// Add a scene
game.addScene(Loading, "Loading");
game.addScene(Intro, "Intro");
game.addScene(GameScene, "GameScene");

// Run the game
game.run();
