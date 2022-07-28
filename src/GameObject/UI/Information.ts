import { DomManager, GameObject, TextRenderer } from "angry-pixel";

const text = "Use Arrows to move and Space to jump";
const fontSize = 14;

export default class Information extends GameObject {
    protected init(): void {
        this.layer = "UI";
        this.ui = true;

        this.addComponent(TextRenderer, {
            width: text.length * fontSize,
            text,
            color: "#A7D6ED",
            fontSize,
            fontFamily: "PressStart2P-Regular",
            fontUrl: "font/PressStart2P-Regular.ttf",
            orientation: "rightDown",
        });
    }

    start() {
        this.transform.position.set(20 - DomManager.gameWidth / 2, 70 - DomManager.gameHeight / 2);
    }
}
