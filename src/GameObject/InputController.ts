import { GameObject, GamepadData, InputManager, KeyboardController, Vector2 } from "angry-pixel";
import { Stage01 } from "../Scene/Stage01";

export class InputController extends GameObject {
    private keyboard: KeyboardController;
    private gamepad: GamepadData;

    public axis: Vector2 = new Vector2(0, 0);
    public jump: boolean = false;
    public pause: boolean = false;

    constructor() {
        super();

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

        this.jump = this.gamepad.bottomFace || this.jump;
        this.pause = this.gamepad.start || this.pause;
    }
}
