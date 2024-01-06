import { ImageFiltering, ImageSource, Loadable, Loader, Resource, TileMap } from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';

// Import paths to work with Vite
// Note the ?url suffix
import heroPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png?url';
import tilesetPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Tilesets/Solaria Demo Update 01.png?url';
import tmxPath from '../res/first-level.tmx?url';
import tsxPath from '../res/tileset.tsx?url';
import { Player } from "./player";

export const Resources = {
    HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
    TiledMap: new TiledResource(tmxPath, {
      entityClassNameFactories: {
        player: (props) => {
          const player = new Player(props.worldPos);
          player.z = 100;
          return player;
        }
      },
      // Path map intercepts and redirects to work around vite's static bundling
      pathMap: [
        { path: 'first-level.tmx', output: tmxPath },
        { path: 'Solaria Demo Update 01.png', output: tilesetPath },
        { path: 'tileset.tsx', output: tsxPath }
      ]
    }),
    TsxResource: new Resource(tsxPath, 'text')
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}