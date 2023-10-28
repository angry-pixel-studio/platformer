import { GameObject, Vector2, randomInt } from "angry-pixel";
import { Pause } from "./ui/Pause";
import { InputController } from "./InputController";
import { Player } from "./Player";
import { Goblin } from "./Goblin";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop.toString()),
}) as { [key: string]: any };

export class GameController extends GameObject {
    private inputController: InputController;
    private pauseText: Pause;
    private player: Player;

    private paused: boolean = false;
    private pauseKeyReleased: boolean = false;

    protected init(): void {
        this.pauseText = this.addGameObject(Pause);
        this.pauseText.active = false;

        this.player = this.addGameObject(Player);
        this.player.transform.position.set(randomInt(240, 2720), -600);

        const goblinQuantity = Number(params.goblins ?? 10);

        for (let i = 1; i <= goblinQuantity; i++) {
            this.addGameObject(Goblin, {
                position: new Vector2(randomInt(240, 2720), -400),
                walkSpeed: (randomInt(160, 340) / 100) * 60,
            });
        }
    }

    protected start(): void {
        this.inputController = this.findGameObject(InputController);
    }

    protected update(): void {
        this.pause();
    }

    private pause(): void {
        if (this.pauseKeyReleased && this.inputController.pause) {
            this.paused = !this.paused;
            this.timeManager.timeScale = this.paused ? 0 : 1;
            this.pauseText.active = this.paused;
            this.player.active = !this.paused;
        }

        this.pauseKeyReleased = !this.inputController.pause;
    }
}
