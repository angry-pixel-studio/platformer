import { GameObject, TextRenderer } from "angry-pixel";

export default class Pause extends GameObject {
    protected init(): void {
        this.layer = "UI";
        this.ui = true;

        this.addComponent(TextRenderer, {
            text: "PAUSE",
            color: "#A7D6ED",
            fontSize: 20,
            fontFamily: "PressStart2P-Regular",
            fontUrl: "font/PressStart2P-Regular.ttf",
            orientation: "center",
            width: 100,
        });
    }

    start() {
        this.transform.position.set(0, 0);
    }
}
