import { AssetManager, Scene, SceneManager } from "angry-pixel";

export class Loading extends Scene {
    protected init(): void {
        AssetManager.loadImage("image/tileset/tileset.png");
        AssetManager.loadImage("image/player/player-spritesheet.png");
        AssetManager.loadImage("image/enemy/goblin_spritesheet.png");
        AssetManager.loadImage("image/misc/wooden_plate.png");
        AssetManager.loadImage("image/scene/background.png");
        AssetManager.loadFont("PressStart2P-Regular", "font/PressStart2P-Regular.ttf");
    }

    protected update(): void {
        if (AssetManager.getAssetsLoaded()) {
            SceneManager.loadScene("Stage01");
        }
    }
}
