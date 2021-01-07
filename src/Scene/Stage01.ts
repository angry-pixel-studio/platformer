import { AssetManager, GameCamera, Scene, TimeManager } from "mini-engine";
import { Foreground } from "../GameObject/Foreground";
import { Player } from "../GameObject/Player";
import { InputController } from "../GameObject/InputController";
import { FollowPlayerCamera } from "../Component/Camera/FollowPlayerCamera";
import { Enemy01 } from "../GameObject/Enemy/Enemy01";
import FpsMetter from "../GameObject/UI/FpsMetter";
import { WoodenPlate } from "../GameObject/Scene/WoodenPlate";
import { Parallax } from "../GameObject/Scene/Parallax";

export class Stage01 extends Scene {
    private fxCamera: GameCamera;

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
        this.addGameObject(() => new Foreground(AssetManager.getImage("image/tileset/tileset.png")), "Foreground");
        this.addGameObject(() => new WoodenPlate(), "WoodenPlate");
        this.addGameObject(() => new Player(), "Player");
        this.addGameObject(() => new Enemy01(), "Enemy01");
        this.addGameObject(() => new FpsMetter(), "FpsMetter");
        this.addGameObject(() => new Parallax(), "Parallax");

        this.gameCamera.layers = ["Foreground", "Enemy", "Player"];
        this.gameCamera.zoom = 0.01;
        this.gameCamera.addComponent(() => new FollowPlayerCamera());

        this.fxCamera = this.gameCamera.addChild(() => new GameCamera(), "FxCamera");
        this.fxCamera.layers = ["Parallax"];
        this.fxCamera.zoom = 0.01;
        this.fxCamera.depth = -1;
    }

    protected update(): void {
        if (this.gameCamera.zoom < 1) {
            this.gameCamera.zoom += 0.01;
        }

        if (this.fxCamera.zoom < 0.6) {
            this.fxCamera.zoom += 0.01;
        }
        //console.log(TimeManager.deltaTime);
    }
}
