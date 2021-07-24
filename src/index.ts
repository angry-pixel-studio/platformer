import { Game, Rectangle, CollisionMethodConfig, Context2DConfig, GameConfig } from "angry-pixel";
import { Stage01 } from "./Scene/Stage01";

const containerElement = document.getElementById("app");

// full config
const config: GameConfig = {
    containerNode: containerElement,
    gameWidth: 1280,
    gameHeight: 720,
    debugEnabled: false,
    context2d: Context2DConfig.Fallback,
    bgColor: "#967557",
    collisions: {
        quadTreeBounds: new Rectangle(0, -1024, 5120, 2048),
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
game.addScene("Stage01", () => new Stage01());

// Run the game
game.run();
