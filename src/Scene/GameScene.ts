import { GameCamera, Scene, TimeManager, Vector2, GameObject, randomInt, SpacePointer } from "angry-pixel";
import { Foreground } from "../gameObject/Foreground";
import { Player } from "../gameObject/Player";
import { InputController } from "../gameObject/InputController";
import { FollowPlayerCamera } from "../component/camera/FollowPlayerCamera";
import { Goblin } from "../gameObject/Goblin";
import FpsMetter from "../gameObject/ui/FpsMetter";
import { WoodenPlate } from "../gameObject/scene/WoodenPlate";
import { Parallax } from "../gameObject/scene/Parallax";
import Pause from "../gameObject/ui/Pause";
import { MovingPlatform } from "../gameObject/scene/MovingPlatform";
import Information from "../gameObject/ui/Information";
import { LAYERS } from "../config/layers";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop.toString()),
});

export class GameScene extends Scene {
    private fxCamera: GameCamera;

    private pauseKey: boolean = false;
    private pausing: boolean = false;

    private pauseText: GameObject;
    public paused: boolean = false;

    private player: Player;
    private enemies: Goblin[] = [];

    init(): void {
        this.addGameObject(InputController);
        this.addGameObject(SpacePointer);
        this.addGameObject(Foreground);

        this.addGameObject(WoodenPlate);

        this.addGameObject(MovingPlatform, {
            spots: [new Vector2(1992, -688), new Vector2(1992, -824), new Vector2(2448, -824)],
        });

        this.addGameObject(MovingPlatform, {
            spots: [new Vector2(2184, -688), new Vector2(2948, -688)],
        });

        this.addGameObject(Parallax);

        this.player = this.addGameObject(Player);
        this.player.transform.position.set(randomInt(240, 2720), -600);

        // @ts-ignore
        for (let i = 1; i <= Number(params.enemies ?? 10); i++) {
            this.enemies.push(
                this.addGameObject(Goblin, {
                    position: new Vector2(randomInt(240, 2720), -400),
                    walkSpeed: (randomInt(160, 340) / 100) * 60,
                })
            );
        }

        this.pauseText = this.addGameObject(Pause);
        this.pauseText.active = false;

        this.addGameObject(FpsMetter);
        this.addGameObject(Information);
    }

    start(): void {
        const cameraScaler: number = 1;

        this.gameCamera.layers = [
            LAYERS.Foreground,
            LAYERS.Hills,
            LAYERS.Platform,
            LAYERS.Goblin,
            LAYERS.Player,
            LAYERS.Overlayer,
            LAYERS.UI,
        ];
        this.gameCamera.zoom = 1 * cameraScaler;
        this.gameCamera.addComponent(FollowPlayerCamera);

        this.fxCamera = this.gameCamera.addChild(GameCamera);
        this.fxCamera.layers = [LAYERS.Parallax];
        this.fxCamera.zoom = 0.6 * cameraScaler;
        this.fxCamera.depth = -1;
    }

    update(): void {
        this.pause();
    }

    private pause(): void {
        this.pauseKey = this.findGameObject<InputController>(InputController).pause;

        if (this.pauseKey && this.pausing === false) {
            this.pausing = true;
            TimeManager.setTimeScale(TimeManager.getTimeScale() === 0 ? 1 : 0);
            this.paused = TimeManager.getTimeScale() === 0;
            this.pauseText.active = this.paused;
        }

        this.pausing &&= this.pauseKey;
    }
}
