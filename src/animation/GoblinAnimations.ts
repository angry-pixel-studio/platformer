import { Sprite, AnimationConfig, IAssetManager, Rectangle } from "angry-pixel";

export const GoblinWalking = (assetManager: IAssetManager): AnimationConfig => {
    return {
        sprites: [0, 16, 32, 48, 64, 80].map(
            (x: number) =>
                new Sprite({
                    image: assetManager.getImage("image/enemy/goblin_spritesheet.png"),
                    smooth: false,
                    slice: { x, y: 0, width: 16, height: 16 },
                })
        ),
        framerate: 10,
        loop: true,
    };
};
