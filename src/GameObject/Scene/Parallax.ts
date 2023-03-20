import { AssetManager, GameObject, Sprite, SpriteRenderer, Vector2 } from "angry-pixel";
import { LAYERS } from "../../config/layers";

export class Parallax extends GameObject {
    protected init(): void {
        this.layer = LAYERS.Parallax;

        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: AssetManager.getImage("image/scene/background.png"),
                smooth: false,
            }),
            tiled: new Vector2(6, 1),
        });

        this.transform.scale.set(4.8, 9.6);
        this.transform.position.set(1512, -500);
    }
}
