import { GameObject, TextOrientation, TextRenderer, TextRendererOptions, Vector2 } from "angry-pixel";
import { LAYERS } from "../../config/layers";

const text = "Use Arrows to move and Space to jump";
const fontSize = 14;

export class Information extends GameObject {
    protected init(): void {
        this.layer = LAYERS.UI;
        this.ui = true;

        this.addComponent(TextRenderer, {
            width: text.length * fontSize,
            text,
            color: "#A7D6ED",
            fontSize,
            font: "PressStart2P-Regular",
            orientation: TextOrientation.RightDown,
            bitmapSpacing: new Vector2(-1, -2),
        } as TextRendererOptions);

        this.transform.position.set(20 - this.domManager.canvas.width / 2, 70 - this.domManager.canvas.height / 2);
    }
}
