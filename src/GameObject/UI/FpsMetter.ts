import { DomManager, TimeManager, GameObject, TextRenderer } from "angry-pixel";

const FPS_REFRESH_DELAY = 0.1;

export default class FpsMetter extends GameObject {
    private textRenderer: TextRenderer;

    private delay: number = FPS_REFRESH_DELAY;
    private accumulator: number = 0;
    private counter: number = 0;

    constructor() {
        super();

        this.layer = "UI";
        this.ui = true;

        this.textRenderer = this.addComponent(
            () =>
                new TextRenderer({
                    text: "",
                    color: "#A7D6ED",
                    size: 20,
                    fontFamily: "PressStart2P-Regular",
                    fontUrl: "font/PressStart2P-Regular.ttf",
                    pivot: "center",
                })
        );
    }

    start() {
        this.transform.position.set(DomManager.gameWidth / 2 - 120, 20 - DomManager.gameHeight / 2);
    }

    update() {
        this.delay += TimeManager.unscaledDeltaTime;
        this.counter++;

        if (this.delay >= FPS_REFRESH_DELAY) {
            const fps: string = (1 / (this.delay / this.counter)).toFixed(2);
            this.textRenderer.text = `FPS: ${fps}`;

            this.delay = 0;
            this.counter = 0;
        }
    }
}
