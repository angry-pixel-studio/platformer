import {
    AssetManager,
    EdgeCollider,
    GameObject,
    RigidBody,
    RigidBodyType,
    TiledTilemapRenderer,
    TiledTilemapRendererOptions,
    Vector2,
} from "angry-pixel";
import TilemapData from "../../Tilemap/Tilemap02.json";

export class Hills extends GameObject {
    protected init(): void {
        this.layer = "Hills";

        this.addComponent(TiledTilemapRenderer, {
            tileset: {
                image: AssetManager.getImage("image/tileset/brinstar-tiles.png"),
                tileWidth: 16,
                tileHeight: 16,
                width: 64,
                height: 45,
            },
            tiledData: TilemapData,
            tilemapLayer: "Hills",
            tileWidth: 16,
            tileHeight: 16,
        } as TiledTilemapRendererOptions);

        this.addComponent(EdgeCollider, {
            vertexModel: [
                new Vector2(-128, -32),
                new Vector2(-64, 0),
                new Vector2(0, -32),
                new Vector2(16, -32),
                new Vector2(80, 0),
                new Vector2(144, -32),
            ],
            debug: true,
            offsetX: 464,
            offsetY: -192,
        });

        this.addComponent(RigidBody, {
            rigidBodyType: RigidBodyType.Static,
        });

        this.transform.scale.set(3, 3);
    }
}
