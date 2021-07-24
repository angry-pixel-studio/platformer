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

    constructor(sprite: HTMLImageElement) {
        super();

        this.layer = "Foreground";

        this.tilemapRenderer = this.addComponent(
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
                    layerName: "Layer1",
                })
        );

        this.addComponent<TilemapCollider>(
            () =>
                new TilemapCollider({
                    tilemapRenderer: this.tilemapRenderer,
                    debug: true,
                })
        );

        this.addComponent<RigidBody>(
            () =>
                new RigidBody({
                    rigidBodyType: RigidBodyType.Static,
                    layersToCollide: [],
                    gravity: 0,
                })
        );

        this.transform.scale.set(3, 3);
    }

    protected start(): void {
        this.addChild<OtherLayer>(
            () => new OtherLayer(AssetManager.getImage("image/tileset/tileset.png")),
            "OtherLayer"
        ).transform.innerPosition = new Vector2(0, 0);
    }
}
