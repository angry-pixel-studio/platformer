import { AssetManager, GameObject, TiledTilemapRenderer, Tileset } from "angry-pixel";
import TilemapData from "../Tilemap/Tilemap02.json";

export class OtherLayer extends GameObject {
    protected init(): void {
        this.layer = "Overlayer";

        this.addComponent(TiledTilemapRenderer, {
            tileset: new Tileset({
                image: AssetManager.getImage("image/tileset/tileset.png"),
                tileWidth: 16,
                tileHeight: 16,
                gridWidth: 12,
                gridHeight: 16,
            }),
            tilemapData: TilemapData,
            layerName: "Layer2",
        });

        this.transform.scale.set(3, 3);
    }
}
