import { AssetManager, Scene, SceneManager } from "angry-pixel";
import { ASSETS } from "../config/assets";

export class Loading extends Scene {
    protected init(): void {
        Object.values(ASSETS.images).forEach((filename) => AssetManager.loadImage(filename));
        // Object.values(ASSETS.audio).forEach((filename) => AssetManager.loadAudio(filename));
        Object.values(ASSETS.fonts).forEach((data) => AssetManager.loadFont(data.name, data.url));
    }

    protected update(): void {
        if (AssetManager.getAssetsLoaded()) {
            SceneManager.loadScene("Intro");
        }
    }
}
