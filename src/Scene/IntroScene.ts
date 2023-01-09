import { clamp, GameObject, Scene, SceneManager, TextRenderer, TimeManager } from "angry-pixel";

export class Intro extends Scene {
    protected start(): void {
        this.gameCamera.layers = ["Text"];

        this.addGameObject(IntroText);
    }
}

const text = "an angry pixel game";
const step = 0.1;
const exitDelay = 0.5;

class IntroText extends GameObject {
    private textRenderer: TextRenderer;
    private timer: number = 0;
    private char: number = 0;

    protected init(): void {
        this.layer = "Text";

        this.textRenderer = this.addComponent(TextRenderer, {
            width: 304,
            height: 32,
            color: "#FFFFFF",
            text: "",
            fontFamily: "PressStart2P-Regular",
            fontUrl: "font/PressStart2P-Regular.ttf",
            fontSize: 16,
            orientation: "rightDown",
        });

        this.transform.position.set(-152, 0);
    }

    protected update(): void {
        if (this.char < text.length) {
            this.fillText();
        } else if (this.textRenderer.opacity > 0) {
            this.hideText();
        } else if (this.textRenderer.opacity === 0) {
            this.changeScene();
        }

        this.timer += TimeManager.deltaTime;
    }

    private fillText(): void {
        if (this.timer >= step) {
            this.textRenderer.text += text[this.char];
            this.char++;
            this.timer = 0;
        }
    }

    private hideText(): void {
        if (this.timer >= step) {
            this.textRenderer.opacity = clamp(this.textRenderer.opacity - 0.1, 0, 1);
            this.timer = 0;
        }
    }

    private changeScene(): void {
        if (this.timer >= exitDelay) {
            SceneManager.loadScene("Stage01");
        }
    }
}
