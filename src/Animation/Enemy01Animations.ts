import { Sprite, Animation, AssetManager, Rectangle } from "angry-pixel";

export const Enemy01Walking = (): Animation => {
    const config = {
        image: AssetManager.getImage("image/enemy/goblin_spritesheet.png"),
        smooth: false,
    };

    return new Animation({
        sprites: [0, 16, 32, 48, 64, 80].map(
            (x: number) =>
                new Sprite({
                    ...config,
                    slice: new Rectangle(x, 0, 16, 16),
                })
        ),
        framerate: 10,
        loop: true,
    });
};
