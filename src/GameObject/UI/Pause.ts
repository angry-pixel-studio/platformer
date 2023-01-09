import { GameObject, TextOrientation, TextRenderer, TextRendererOptions } from "angry-pixel";

export default class Pause extends GameObject {
    protected init(): void {
        this.layer = "UI";
        this.ui = true;

        this.addComponent(TextRenderer, {
            text: "PAUSE",
            color: "#A7D6ED",
            fontSize: 20,
            font: "PressStart2P-Regular",
            orientation: TextOrientation.Center,
            width: 100,
        } as TextRendererOptions);
    }

    start() {
        this.transform.position.set(0, 0);
    }
}
