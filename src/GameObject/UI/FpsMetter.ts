import {
    DomManager,
    TimeManager,
    GameObject,
    TextRenderer,
    PhysicsComponent,
    Component,
    Vector2,
    PreRenderComponent,
    TextOrientation,
} from "angry-pixel";
import { LAYERS } from "../../config/layers";

const FPS_REFRESH_DELAY = 0.1;

export default class FpsMetter extends GameObject {
    protected init(): void {
        this.layer = LAYERS.UI;
        this.ui = true;

        this.addComponent(GameFpsMetter);
        this.addComponent(PhysicsFpsMetter);
        this.addComponent(RenderFpsMetter);
    }

    protected start(): void {
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
            font: "PressStart2P-Regular",
            orientation: TextOrientation.RightDown,
            offset: new Vector2(260, 0),
        });
    }

    protected update(): void {
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
            font: "PressStart2P-Regular",
            orientation: TextOrientation.RightDown,
            smooth: false,
        });
    }

    protected update(): void {
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
            font: "PressStart2P-Regular",
            orientation: TextOrientation.RightDown,
            offset: new Vector2(580, 0),
        });
    }

    protected update(): void {
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
