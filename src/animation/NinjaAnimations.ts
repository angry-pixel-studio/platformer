import { Sprite, AnimationConfig, IAssetManager, Rectangle } from "angry-pixel";

export const NinjaIdle = (assetManager: IAssetManager): AnimationConfig => {
    return {
        sprites: [0, 16, 32, 48].map(
            (x: number) =>
                new Sprite({
                    image: assetManager.getImage("image/player/player-spritesheet.png"),
                    smooth: false,
                    slice: { x, y: 64, width: 16, height: 16 },
                })
        ),
        framerate: 10,
        loop: true,
    };
};

export const NinjaRun = (assetManager: IAssetManager): AnimationConfig => {
    return {
        sprites: [0, 16, 32, 48, 64, 80].map(
            (x: number) =>
                new Sprite({
                    image: assetManager.getImage("image/player/player-spritesheet.png"),
                    smooth: false,
                    slice: { x, y: 16, width: 16, height: 16 },
                })
        ),
        framerate: 10,
        loop: true,
    };
};
