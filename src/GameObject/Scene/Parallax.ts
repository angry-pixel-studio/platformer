import { AssetManager, GameObject, Sprite, SpriteRenderer, Vector2 } from "angry-pixel";

export class Parallax extends GameObject {
    protected init(): void {
        this.layer = "Parallax";

        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: AssetManager.getImage("image/scene/background.png"),
                smooth: false,
            }),
            tiled: new Vector2(5, 1),
        });

        this.transform.scale.set(8, 9.5);
        this.transform.position.set(1512, 100);
    }
}
