import { GameObject, TextOrientation, TextRenderer, TextRendererOptions, Vector2 } from "angry-pixel";
import { LAYERS } from "../../config/layers";

export class Pause extends GameObject {
    protected init(): void {
        this.layer = LAYERS.UI;
        this.ui = true;

        this.addComponent(TextRenderer, {
            text: "PAUSE",
            color: "#A7D6ED",
            fontSize: 20,
            font: "PressStart2P-Regular",
            bitmapSpacing: new Vector2(-1, -2),
            orientation: TextOrientation.Center,
            width: 100,
        } as TextRendererOptions);
    }
}
