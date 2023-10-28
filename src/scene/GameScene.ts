import { GameCamera, Scene, Vector2 } from "angry-pixel";
import { LAYERS } from "../config/layers";
import { FollowPlayerCamera } from "../component/camera/FollowPlayerCamera";
import { GameController } from "../gameObject/GameController";
import { Foreground } from "../gameObject/stage/Foreground";
import { InputController } from "../gameObject/InputController";
import { MovingPlatform } from "../gameObject/stage/MovingPlatform";
import { Parallax } from "../gameObject/stage/Parallax";
import { WoodenPlate } from "../gameObject/stage/WoodenPlate";
import { FpsMetter } from "../gameObject/ui/FpsMetter";
import { Information } from "../gameObject/ui/Information";

export class GameScene extends Scene {
    init(): void {
        this.setupCamera();

        this.setupStage();
        this.addGameObject(InputController);
        this.addGameObject(GameController);

        this.addGameObject(FpsMetter);
        this.addGameObject(Information);
    }

    private setupCamera(): void {
        this.gameCamera.layers = [
            LAYERS.Background,
            LAYERS.Foreground,
            LAYERS.Hills,
            LAYERS.Platform,
            LAYERS.Goblin,
            LAYERS.Player,
            LAYERS.Overlayer,
            LAYERS.UI,
        ];
        this.gameCamera.addComponent(FollowPlayerCamera);

        const parallaxCamera = this.gameCamera.addChild(GameCamera);
        parallaxCamera.layers = [LAYERS.Parallax];
        parallaxCamera.zoom = 0.6;
        parallaxCamera.depth = -1;
    }

    private setupStage(): void {
        this.addGameObject(Foreground);
        this.addGameObject(WoodenPlate);
        this.addGameObject(MovingPlatform, {
            spots: [new Vector2(1992, -688), new Vector2(1992, -824), new Vector2(2448, -824)],
        });
        this.addGameObject(MovingPlatform, {
            spots: [new Vector2(2184, -688), new Vector2(2948, -688)],
        });
        this.addGameObject(Parallax);
    }
}
