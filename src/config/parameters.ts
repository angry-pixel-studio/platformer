import { LAYERS } from "./layers";

export const PARAMETERS = {
    collisionMatrix: [
        [LAYERS.Player, LAYERS.Foreground],
        [LAYERS.Player, LAYERS.Goblin],
        [LAYERS.Player, LAYERS.Platform],
        [LAYERS.Player, LAYERS.Hills],
        [LAYERS.Goblin, LAYERS.Foreground],
        [LAYERS.Goblin, LAYERS.Player],
        [LAYERS.Goblin, LAYERS.Platform],
        [LAYERS.Goblin, LAYERS.Hills],
    ],
};
