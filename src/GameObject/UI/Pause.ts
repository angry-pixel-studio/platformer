import { GameObject, TextOrientation, TextRenderer, TextRendererOptions } from "angry-pixel";
import { LAYERS } from "../../config/layers";

export default class Pause extends GameObject {
    protected init(): void {
        this.layer = LAYERS.UI;
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

    protected start(): void {
        this.transform.position.set(0, 0);
    }
}
