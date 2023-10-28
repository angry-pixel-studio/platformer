import { Sprite, Animation, IAssetManager, Rectangle } from "angry-pixel";

export const GoblinWalking = (assetManager: IAssetManager): Animation => {
    return new Animation({
        sprites: [0, 16, 32, 48, 64, 80].map(
            (x: number) =>
                new Sprite({
                    image: assetManager.getImage("image/enemy/goblin_spritesheet.png"),
                    smooth: false,
                    slice: new Rectangle(x, 0, 16, 16),
                })
        ),
        framerate: 10,
        loop: true,
    });
};
