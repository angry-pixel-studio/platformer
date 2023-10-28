import { CollisionMatrix, Game, GameConfig } from "angry-pixel";
import { PARAMETERS } from "./config/parameters";
import { GameScene } from "./scene/GameScene";
import { Loading } from "./scene/Loading";

// Game config
const config: GameConfig = {
    containerNode: document.getElementById("app"),
    gameWidth: 1280,
    gameHeight: 720,
    collisions: {
        collisionMatrix: PARAMETERS.collisionMatrix as CollisionMatrix,
    },
};

// Create the Game
const game = new Game(config);

// Add scenes
game.addScene(Loading, "Loading");
game.addScene(GameScene, "GameScene");

// Run the game
game.run();
