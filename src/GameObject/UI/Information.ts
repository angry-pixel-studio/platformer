import { DomManager, GameObject, TextOrientation, TextRenderer, TextRendererOptions } from "angry-pixel";
import { LAYERS } from "../../config/layers";

const text = "Use Arrows to move and Space to jump";
const fontSize = 14;

export default class Information extends GameObject {
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
        } as TextRendererOptions);
    }

    protected start(): void {
        this.transform.position.set(20 - DomManager.gameWidth / 2, 70 - DomManager.gameHeight / 2);
    }
}
