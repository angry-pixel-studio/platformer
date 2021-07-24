import { GameObject, GamepadData, InputManager, KeyboardController, Vector2 } from "angry-pixel";
import { Stage01 } from "../Scene/Stage01";

export class InputController extends GameObject {
    private keyboard: KeyboardController;
    private gamepad: GamepadData;

    private _axis: Vector2 = new Vector2(0, 0);
    private _jump: boolean = false;

    constructor() {
        super();

        this.keyboard = InputManager.keyboard;
        this.gamepad = InputManager.gamepad.getGamepad(0);
    }

    public get axis(): Vector2 {
        return this._axis;
    }

    public get jump(): boolean {
        return this._jump;
    }

    protected update(): void {
        if (this.getCurrentScene<Stage01>().paused) {
            return;
        }

        this.updateKeyboard();
        if (this.gamepad) this.updateGamepad();
    }

    private updateKeyboard(): void {
        this._axis.x = this.keyboard.isPressed("ArrowRight") ? 1 : this.keyboard.isPressed("ArrowLeft") ? -1 : 0;

        this._axis.y = this.keyboard.isPressed("ArrowUp") ? 1 : this.keyboard.isPressed("ArrowDown") ? -1 : 0;

        this._jump = this.keyboard.isPressed("Space");
    }

    private updateGamepad(): void {
        this.axis.set(
            this.gamepad.dpadRight ? 1 : this.gamepad.dpadLeft ? -1 : this.axis.x,
            this.gamepad.dpadUp ? 1 : this.gamepad.dpadDown ? -1 : this.axis.y
        );

        this.axis.set(
            this.gamepad.leftStickHorizontal > 0.1 || this.gamepad.leftStickHorizontal < -0.1
                ? Math.sign(this.gamepad.leftStickHorizontal)
                : this.axis.x,
            this.gamepad.leftStickVertical > 0.1 || this.gamepad.leftStickVertical < -0.1
                ? Math.sign(this.gamepad.leftStickVertical)
                : this.axis.y
        );

        this._jump = this.gamepad.bottomFace || this._jump;
    }
}
