import { InputManager, GameObject, Vector2, GameCamera } from "angry-pixel";

export default class SpotPointer extends GameObject {
    // cache
    private camera: GameCamera = null;

    // status
    private mousePressed: boolean = false;
    private position: Vector2 = new Vector2();

    start() {
        this.camera = this.getCurrentScene().gameCamera;
    }

    update() {
        if (InputManager.mouse.leftButtonPressed && this.mousePressed === false) {
            Vector2.scale(this.position, InputManager.mouse.positionInViewport, 1 / this.camera.zoom);

            Vector2.add(this.position, this.position, this.camera.worldSpaceRect.center);

            Vector2.round(this.position, this.position);

            console.log(this.position);
        }

        this.mousePressed = InputManager.mouse.leftButtonPressed;
    }
}
