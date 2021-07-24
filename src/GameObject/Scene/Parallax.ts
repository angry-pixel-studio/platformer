import { AssetManager, GameObject, Sprite, SpriteRenderer, Vector2 } from "angry-pixel";

export class Parallax extends GameObject {
    constructor(x: number, y: number, h: number = 1, v: number = 1) {
        super();

        this.layer = "Parallax";

        this.addComponent(
            () =>
                new SpriteRenderer({
                    sprite: new Sprite({
                        image: AssetManager.getImage("image/scene/background.png"),
                        smooth: false,
                    }),
                    tiled: new Vector2(h, v),
                })
        );

        this.transform.scale.set(8, 9.5);
        this.transform.position.set(x, y);
    }
}
