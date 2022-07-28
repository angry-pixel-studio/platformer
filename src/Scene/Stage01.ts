import {
    AssetManager,
    GameCamera,
    Scene,
    TimeManager,
    Vector2,
    InputManager,
    GameObject,
    randomInt,
} from "angry-pixel";
import { Foreground } from "../GameObject/Foreground";
import { Player } from "../GameObject/Player";
import { InputController } from "../GameObject/InputController";
import { FollowPlayerCamera } from "../Component/Camera/FollowPlayerCamera";
import { Enemy01 } from "../GameObject/Enemy/Enemy01";
import FpsMetter from "../GameObject/UI/FpsMetter";
import { WoodenPlate } from "../GameObject/Scene/WoodenPlate";
import { Parallax } from "../GameObject/Scene/Parallax";
import Pause from "../GameObject/UI/Pause";
import { MovingPlatform } from "../GameObject/Scene/MovingPlatform";
import SpotPointer from "../GameObject/SpotPointer";
import Information from "../GameObject/UI/Information";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop.toString()),
});

export class Stage01 extends Scene {
    private fxCamera: GameCamera;

    private pauseKey: boolean = false;
    private pausing: boolean = false;

    private pauseText: GameObject;
    public paused: boolean = false;

    init(): void {
        AssetManager.loadImage("image/tileset/tileset.png");
        AssetManager.loadImage("image/tileset/brinstar-tiles.png");
        AssetManager.loadImage("image/player/player-spritesheet.png");
        AssetManager.loadImage("image/enemy/goblin_spritesheet.png");
        AssetManager.loadImage("image/misc/wooden_plate.png");
        AssetManager.loadImage("image/scene/background.png");

        this.addGameObject(InputController);
        this.addGameObject(SpotPointer);
        this.addGameObject(Foreground);

        this.addGameObject(WoodenPlate);

        this.addGameObject(MovingPlatform, {
            spots: [new Vector2(1992, -688), new Vector2(1992, -824), new Vector2(2448, -824)],
        });

        this.addGameObject(MovingPlatform, {
            spots: [new Vector2(2184, -688), new Vector2(2948, -688)],
        });

        this.addGameObject(Parallax);

        this.addGameObject(Player).transform.position.set(randomInt(240, 2720), -600);

        // @ts-ignore
        for (let i = 1; i <= Number(params.enemies ?? 10); i++) {
            this.addGameObject(Enemy01, {
                position: new Vector2(randomInt(240, 2720), -400),
                walkSpeed: (randomInt(160, 340) / 100) * 60,
            });
        }

        this.pauseText = this.addGameObject(Pause);
        this.pauseText.active = false;

        this.addGameObject(FpsMetter);
        this.addGameObject(Information);
    }

    start(): void {
        const cameraScaler: number = 1;

        this.gameCamera.layers = ["Foreground", "Hills", "Platform", "Enemy", "Player", "Overlayer", "QuadTree", "UI"];
        this.gameCamera.zoom = 1 * cameraScaler;
        this.gameCamera.addComponent(FollowPlayerCamera);

        this.fxCamera = this.gameCamera.addChild(GameCamera);
        this.fxCamera.layers = ["Parallax"];
        this.fxCamera.zoom = 0.6 * cameraScaler;
        this.fxCamera.depth = -1;
    }

    update(): void {
        this.pause();

        // this.cameraFX();
    }

    private cameraFX(): void {
        if (this.gameCamera.zoom < 1) {
            this.gameCamera.zoom += 0.01;
        }

        if (this.fxCamera.zoom < 0.6) {
            this.fxCamera.zoom += 0.01;
        }
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
