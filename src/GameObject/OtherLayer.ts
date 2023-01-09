import {
    AssetManager,
    GameObject,
    TiledTilemapRenderer,
    TiledTilemapRendererOptions,
    TilemapOrientation,
} from "angry-pixel";
import TilemapData from "../Tilemap/Tilemap02.json";

export class OtherLayer extends GameObject {
    protected init(): void {
        this.layer = "Overlayer";

        this.addComponent(TiledTilemapRenderer, {
            tileset: {
                image: AssetManager.getImage("image/tileset/tileset.png"),
                tileWidth: 16,
                tileHeight: 16,
                width: 12,
            },
            tiledData: TilemapData,
            tilemapLayer: "Layer2",
            tileWidth: 16,
            tileHeight: 16,
            orientation: TilemapOrientation.RightDown,
        } as TiledTilemapRendererOptions);

        this.transform.scale.set(3, 3);
    }
}
