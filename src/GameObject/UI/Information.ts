import { DomManager, GameObject, TextRenderer } from "angry-pixel";

const text = "Physics: 240 FPS        Use Arrows to move and Space to jump";
const fontSize = 14;

export default class Information extends GameObject {
    private textRenderer: TextRenderer;

    constructor() {
        super();

        this.layer = "UI";
        this.ui = true;

        this.textRenderer = this.addComponent(
            () =>
                new TextRenderer({
                    width: text.length * fontSize,
                    text,
                    color: "#A7D6ED",
                    fontSize,
                    fontFamily: "PressStart2P-Regular",
                    fontUrl: "font/PressStart2P-Regular.ttf",
                    orientation: "rightDown",
                })
        );
    }

    start() {
        this.transform.position.set(20 - DomManager.gameWidth / 2, 40 - DomManager.gameHeight / 2);
    }
}
