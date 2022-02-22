import { AssetManager, GameCamera, Scene, TimeManager, Vector2, InputManager, GameObject, random } from "angry-pixel";
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
import Information from "../GameObject/UI/Information";

export class Stage01 extends Scene {
    private fxCamera: GameCamera;

    private pauseKey: boolean = false;
    private pausing: boolean = false;

    private pauseText: GameObject;
    public paused: boolean = false;

    constructor() {
        super();

        AssetManager.loadImage("image/tileset/tileset.png");
        AssetManager.loadImage("image/player/player-spritesheet.png");
        AssetManager.loadImage("image/enemy/goblin_spritesheet.png");
        AssetManager.loadImage("image/misc/wooden_plate.png");
        AssetManager.loadImage("image/scene/background.png");
    }

    init(): void {
        this.addGameObject(() => new InputController(), "InputController");
        this.addGameObject(() => new SpotPointer(), "SpotPointer");
        this.addGameObject(() => new Foreground(AssetManager.getImage("image/tileset/tileset.png")), "Foreground");

        this.addGameObject(() => new WoodenPlate(1400, -648), "WoodenPlate");

        this.addGameObject(
            () => new MovingPlatform([new Vector2(1992, -688), new Vector2(1992, -824)]),
            "MovingPlatform01"
        );
        this.addGameObject(
            () => new MovingPlatform([new Vector2(2184, -688), new Vector2(2948, -688)]),
            "MovingPlatform02"
        );

        this.addGameObject(() => new Parallax(1512, -500, 5, 1), "Parallax");

        this.addGameObject(() => new Player(random(240, 2720), -600), "Player");

        for (let i = 1; i <= 10; i++) {
            this.addGameObject(
                () => new Enemy01(new Vector2(random(240, 2720), -600), (random(160, 340) / 100) * 60),
                `Enemy${i}`
            );
        }

        this.pauseText = this.addGameObject(() => new Pause(), "Pause");
        this.pauseText.setActive(false);

        this.addGameObject(() => new FpsMetter(), "FpsMetter");
        this.addGameObject(() => new Information(), "Information");
    }

    start(): void {
        const cameraScaler: number = 1;

        this.gameCamera.layers = ["Foreground", "Platform", "Enemy", "Player", "Overlayer", "QuadTree", "UI"];
        this.gameCamera.zoom = 1 * cameraScaler;
        this.gameCamera.addComponent(() => new FollowPlayerCamera());

        this.fxCamera = this.gameCamera.addChild(() => new GameCamera(), "FxCamera");
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
        this.pauseKey = this.findGameObjectByName<InputController>("InputController").pause;

        if (this.pauseKey && this.pausing === false) {
            this.pausing = true;
            TimeManager.setTimeScale(TimeManager.getTimeScale() === 0 ? 1 : 0);
            this.paused = TimeManager.getTimeScale() === 0;
            this.pauseText.setActive(this.paused);
        }

        this.pausing &&= this.pauseKey;
    }
}
