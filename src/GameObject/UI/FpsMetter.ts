import { DomManager, TimeManager, GameObject, TextRenderer } from "angry-pixel";

const FPS_REFRESH_DELAY = 0.1;

export default class FpsMetter extends GameObject {
    private textRenderer: TextRenderer;

    private timer: number = FPS_REFRESH_DELAY;
    private counter: number = 0;

    constructor() {
        super();

        this.layer = "UI";
        this.ui = true;

        this.textRenderer = this.addComponent(
            () =>
                new TextRenderer({
                    width: 210,
                    text: "",
                    color: "#A7D6ED",
                    fontSize: 14,
                    fontFamily: "PressStart2P-Regular",
                    fontUrl: "font/PressStart2P-Regular.ttf",
                    orientation: "rightDown",
                })
        );
    }

    start() {
        this.transform.position.set(DomManager.gameWidth / 2 - 240, 40 - DomManager.gameHeight / 2);
    }

    update() {
        this.timer += TimeManager.unscaledDeltaTime;
        this.counter++;

        if (this.timer >= FPS_REFRESH_DELAY) {
            const fps: string = (1 / (this.timer / this.counter)).toFixed(2);
            this.textRenderer.text = `Game: ${fps} FPS`;

            this.timer = 0;
            this.counter = 0;
        }
    }
}
