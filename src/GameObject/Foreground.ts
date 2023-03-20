import {
    AssetManager,
    GameObject,
    RigidBody,
    RigidBodyType,
    TiledTilemapRenderer,
    TiledTilemapRendererOptions,
    TilemapCollider,
    TilemapOrientation,
    Vector2,
} from "angry-pixel";
import { LAYERS } from "../config/layers";
import TilemapData from "../tilemap/Tilemap02.json";
import { OtherLayer } from "./OtherLayer";

export class Foreground extends GameObject {
    private tilemapRenderer: TiledTilemapRenderer;

    protected init(): void {
        this.layer = LAYERS.Foreground;

        this.transform.scale.set(3, 3);

        this.tilemapRenderer = this.addComponent(TiledTilemapRenderer, {
            tileset: {
                image: AssetManager.getImage("image/tileset/tileset.png"),
                tileWidth: 16,
                tileHeight: 16,
                width: 12,
            },
            tiledData: TilemapData,
            tilemapLayer: "Layer1",
            tileWidth: 16,
            tileHeight: 16,
            orientation: TilemapOrientation.RightDown,
            smooth: false,
        } as TiledTilemapRendererOptions);

        this.addComponent<TilemapCollider>(TilemapCollider, {
            tilemapRenderer: this.tilemapRenderer,
            debug: true,
            composite: true,
        });

        this.addComponent<RigidBody>(RigidBody, {
            rigidBodyType: RigidBodyType.Static,
            gravity: 0,
        });

        this.addChild<OtherLayer>(OtherLayer).transform.innerPosition = new Vector2(0, 0);
    }
}
