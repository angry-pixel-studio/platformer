import { AssetManager, GameCamera, Scene, TimeManager, Vector2, InputManager, GameObject } from "angry-pixel";
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
import { OtherLayer } from "../GameObject/OtherLayer";
import SpotPointer from "../GameObject/SpotPointer";

export class Stage01 extends Scene {
    private fxCamera: GameCamera;

    private pauseKey: boolean = false;
    private pausing: boolean = false;

    private pauseText: GameObject;
    public paused: boolean = false;

    constructor() {
        super();

        AssetManager.createImage("image/tileset/tileset.png");
        AssetManager.createImage("image/player/player-spritesheet.png");
        AssetManager.createImage("image/enemy/goblin_spritesheet.png");
        AssetManager.createImage("image/misc/wooden_plate.png");
        AssetManager.createImage("image/scene/background.png");
    }

    protected start(): void {
        this.addGameObject(() => new InputController(), "InputController");
        this.addGameObject(() => new SpotPointer(), "SpotPointer");
        this.addGameObject(() => new Foreground(AssetManager.getImage("image/tileset/tileset.png")), "Foreground");

        this.addGameObject(() => new WoodenPlate(1512, -648), "WoodenPlate");

        this.addGameObject(
            () => new MovingPlatform([new Vector2(1992, -688), new Vector2(1992, -824)]),
            "MovingPlatform01"
        );
        this.addGameObject(
            () => new MovingPlatform([new Vector2(2184, -688), new Vector2(2760, -688)]),
            "MovingPlatform02"
        );

        this.addGameObject(() => new Parallax(1512, -500, 5, 1), "Parallax");

        this.addGameObject(() => new Player(2184, -600), "Player");

        this.addGameObject(() => new Enemy01(new Vector2(480, -600), 2), "Enemy00");
        this.addGameObject(() => new Enemy01(new Vector2(460, -600), 2.4), "Enemy01");
        this.addGameObject(() => new Enemy01(new Vector2(440, -600), 1.6), "Enemy02");
        this.addGameObject(() => new Enemy01(new Vector2(2400, -600), 3), "Enemy03");
        this.addGameObject(() => new Enemy01(new Vector2(1400, -600), 2), "Enemy04");
        this.addGameObject(() => new Enemy01(new Vector2(1200, -600), 2.4), "Enemy05");
        this.addGameObject(() => new Enemy01(new Vector2(960, -600), 1.6), "Enemy06");
        this.addGameObject(() => new Enemy01(new Vector2(2000, -600), 3), "Enemy07");
        this.addGameObject(() => new Enemy01(new Vector2(2200, -600), 2.6), "Enemy08");
        this.addGameObject(() => new Enemy01(new Vector2(2400, -600), 2.2), "Enemy09");

        this.pauseText = this.addGameObject(() => new Pause(), "Pause");
        this.pauseText.setActive(false);

        this.addGameObject(() => new FpsMetter(), "FpsMetter");

        const cameraScaler: number = 1;

        this.gameCamera.layers = ["Foreground", "Platform", "Enemy", "Player", "QuadTree", "UI"];
        this.gameCamera.zoom = 1 * cameraScaler;
        this.gameCamera.addComponent(() => new FollowPlayerCamera());

        this.fxCamera = this.gameCamera.addChild(() => new GameCamera(), "FxCamera");
        this.fxCamera.layers = ["Parallax"];
        this.fxCamera.zoom = 0.6 * cameraScaler;
        this.fxCamera.depth = -1;
    }

    protected update(): void {
        this.pause();

        //this.cameraFX();
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
        this.pauseKey = InputManager.keyboard.isPressed("KeyP");

        if (this.pauseKey && this.pausing === false) {
            this.pausing = true;
            TimeManager.setTimeScale(TimeManager.getTimeScale() === 0 ? 1 : 0);
            this.paused = TimeManager.getTimeScale() === 0;
            this.pauseText.setActive(this.paused);
        }

        this.pausing &&= this.pauseKey;
    }
}
