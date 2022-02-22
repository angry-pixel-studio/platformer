import { GameObject, TiledTilemapRenderer, Tileset, Vector2 } from "angry-pixel";
import TilemapData from "../Tilemap/Tilemap02.json";

export class OtherLayer extends GameObject {
    constructor(sprite: HTMLImageElement) {
        super();

        this.layer = "Overlayer";

        this.addComponent(
            () =>
                new TiledTilemapRenderer({
                    tileset: new Tileset({
                        image: sprite,
                        tileWidth: 16,
                        tileHeight: 16,
                        gridWidth: 12,
                        gridHeight: 16,
                    }),
                    tilemapData: TilemapData,
                    layerName: "Layer2",
                })
        );

        this.transform.scale.set(3, 3);
    }
}
