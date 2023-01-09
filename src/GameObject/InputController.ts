import { GameObject, GamepadData, InputManager, KeyboardController, Vector2 } from "angry-pixel";
import { Stage01 } from "../Scene/Stage01";

export class InputController extends GameObject {
    private keyboard: KeyboardController;
    private gamepad: GamepadData;

    public axis: Vector2 = new Vector2(0, 0);
    public jump: boolean = false;
    public pause: boolean = false;

    protected init(): void {
        this.keyboard = InputManager.keyboard;
    }

    protected update(): void {
        this.gamepad = InputManager.gamepad.getGamepad(0);

        this.updateKeyboard();
        if (this.gamepad) this.updateGamepad();
    }

    private updateKeyboard(): void {
        this.axis.x = this.keyboard.isPressed("ArrowRight") ? 1 : this.keyboard.isPressed("ArrowLeft") ? -1 : 0;

        this.axis.y = this.keyboard.isPressed("ArrowUp") ? 1 : this.keyboard.isPressed("ArrowDown") ? -1 : 0;

        this.jump = this.keyboard.isPressed("Space");
        this.pause = this.keyboard.isPressed("KeyP");
    }

    private updateGamepad(): void {
        if (this.gamepad.dpadAxes.magnitude > 0) {
            this.axis.copy(this.gamepad.dpadAxes);
        } else if (this.gamepad.leftStickAxes.magnitude >= 0.5) {
            this.axis.set(Math.sign(this.gamepad.leftStickAxes.x), Math.sign(this.gamepad.leftStickAxes.y));
        }

        this.jump = this.gamepad.bottomFace || this.jump;
        this.pause = this.gamepad.start || this.pause;
    }
}
