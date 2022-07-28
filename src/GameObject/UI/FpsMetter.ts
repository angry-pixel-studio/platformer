import {
    DomManager,
    TimeManager,
    GameObject,
    TextRenderer,
    PhysicsComponent,
    Component,
    Vector2,
    PreRenderComponent,
} from "angry-pixel";

const FPS_REFRESH_DELAY = 0.1;

export default class FpsMetter extends GameObject {
    protected init(): void {
        this.layer = "UI";
        this.ui = true;

        this.addComponent(GameFpsMetter);
        this.addComponent(PhysicsFpsMetter);
        this.addComponent(RenderFpsMetter);
    }

    start() {
        this.transform.position.set(20 - DomManager.gameWidth / 2, 40 - DomManager.gameHeight / 2);
    }
}

class PhysicsFpsMetter extends PhysicsComponent {
    private textRenderer: TextRenderer;

    private timer: number = FPS_REFRESH_DELAY;
    private counter: number = 0;

    protected init(): void {
        this.textRenderer = this.gameObject.addComponent(TextRenderer, {
            width: 280,
            text: "",
            color: "#A7D6ED",
            fontSize: 14,
            fontFamily: "PressStart2P-Regular",
            fontUrl: "font/PressStart2P-Regular.ttf",
            orientation: "rightDown",
            offset: new Vector2(260, 0),
        });
    }

    update() {
        this.timer += TimeManager.physicsDeltaTime;
        this.counter++;

        if (this.timer >= FPS_REFRESH_DELAY) {
            const fps: string = (1 / (this.timer / this.counter)).toFixed(2);
            this.textRenderer.text = `Physics: ${fps} FPS`;

            this.timer = 0;
            this.counter = 0;
        }
    }
}

class GameFpsMetter extends Component {
    private textRenderer: TextRenderer;

    private timer: number = FPS_REFRESH_DELAY;
    private counter: number = 0;

    protected init(): void {
        this.textRenderer = this.gameObject.addComponent(TextRenderer, {
            width: 210,
            text: "",
            color: "#A7D6ED",
            fontSize: 14,
            fontFamily: "PressStart2P-Regular",
            fontUrl: "font/PressStart2P-Regular.ttf",
            orientation: "rightDown",
        });
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

class RenderFpsMetter extends PreRenderComponent {
    private textRenderer: TextRenderer;

    private timer: number = FPS_REFRESH_DELAY;
    private counter: number = 0;

    protected init(): void {
        this.textRenderer = this.gameObject.addComponent(TextRenderer, {
            width: 280,
            text: "",
            color: "#A7D6ED",
            fontSize: 14,
            fontFamily: "PressStart2P-Regular",
            fontUrl: "font/PressStart2P-Regular.ttf",
            orientation: "rightDown",
            offset: new Vector2(580, 0),
        });
    }

    update() {
        this.timer += TimeManager.browserDeltaTime;
        this.counter++;

        if (this.timer >= FPS_REFRESH_DELAY) {
            const fps: string = (1 / (this.timer / this.counter)).toFixed(2);
            this.textRenderer.text = `Render: ${fps} FPS`;

            this.timer = 0;
            this.counter = 0;
        }
    }
}
