import {
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

export class FpsMetter extends GameObject {
    protected init(): void {
        this.layer = LAYERS.UI;
        this.ui = true;

        this.addComponent(GameFpsMetter);
        this.addComponent(PhysicsFpsMetter);
        this.addComponent(RenderFpsMetter);

        this.transform.position.set(20 - this.domManager.canvas.width / 2, 40 - this.domManager.canvas.height / 2);
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
            bitmapSpacing: new Vector2(-1, -2),
            orientation: TextOrientation.RightDown,
            offset: new Vector2(260, 0),
        });
    }

    protected update(): void {
        this.timer += this.timeManager.unscaledPhysicsDeltaTime;
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
            bitmapSpacing: new Vector2(-1, -2),
            orientation: TextOrientation.RightDown,
            smooth: false,
        });
    }

    protected update(): void {
        this.timer += this.timeManager.unscaledDeltaTime;
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
            bitmapSpacing: new Vector2(-1, -2),
            orientation: TextOrientation.RightDown,
            offset: new Vector2(580, 0),
        });
    }

    protected update(): void {
        this.timer += this.timeManager.browserDeltaTime;
        this.counter++;

        if (this.timer >= FPS_REFRESH_DELAY) {
            const fps: string = (1 / (this.timer / this.counter)).toFixed(2);
            this.textRenderer.text = `Render: ${fps} FPS`;

            this.timer = 0;
            this.counter = 0;
        }
    }
}
