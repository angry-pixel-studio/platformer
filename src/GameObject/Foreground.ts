import {
    AssetManager,
    GameObject,
    RigidBody,
    RigidBodyType,
    TiledTilemapRenderer,
    TilemapCollider,
    Tileset,
    Vector2,
} from "angry-pixel";
import TilemapData from "../Tilemap/Tilemap02.json";
import { OtherLayer } from "./OtherLayer";

export class Foreground extends GameObject {
    private tilemapRenderer: TiledTilemapRenderer;

    protected init(): void {
        this.layer = "Foreground";

        this.tilemapRenderer = this.addComponent(TiledTilemapRenderer, {
            tileset: new Tileset({
                image: AssetManager.getImage("image/tileset/tileset.png"),
                tileWidth: 16,
                tileHeight: 16,
                gridWidth: 12,
                gridHeight: 6,
            }),
            tilemapData: TilemapData,
            layerName: "Layer1",
        });

        this.addComponent<TilemapCollider>(TilemapCollider, {
            tilemapRenderer: this.tilemapRenderer,
            debug: true,
        });

        this.addComponent<RigidBody>(RigidBody, {
            rigidBodyType: RigidBodyType.Static,
            layersToCollide: [],
            gravity: 0,
        });

        this.transform.scale.set(3, 3);

        this.addChild<OtherLayer>(OtherLayer).transform.innerPosition = new Vector2(0, 0);
    }
}
