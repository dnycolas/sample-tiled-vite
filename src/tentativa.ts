import { ImageFiltering, ImageSource, Loader } from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';


// ----------------------------------------------------------
import tsxChaoEntradaLab from "./maps/blocos_Myd.tsx?url"
import tsxblocosdesconhecidos from "./maps/tileset_5_Classroom_and_library_32x32.tsx?url"
import tsxParedeEntradaLab from "./maps/14_Basement_32x32.tsx?url"
import tsxsombras from "./maps/sombras_Bloocos_Myd.tsx?url"
import tsxgerador from "./maps/Hidden_Code_Gerador.tsx?url"
import tsxLogo from "./maps/logo_Hidden_Code.tsx?url"

import tmxMapaEntrada from "./maps/entrada_lab.tmx?url"
// ----------------------------------------------------------


export const Arquivos = {
  EntradaLaboratorio: new TiledResource(tmxMapaEntrada, {
    pathMap: [
      { path: "entrada_lab.tmx", output: tmxMapaEntrada },
      { path: "blocos_Myd.tsx", output: tsxChaoEntradaLab },
      { path: "tileset_5_Classroom_and_library_32x32.tsx", output: tsxblocosdesconhecidos },
      { path: "14_Basement_32x32.tsx", output: tsxParedeEntradaLab },
      { path: "sombras_Bloocos_Myd.tsx", output: tsxsombras },
      { path: "Hidden_Code_Gerador.tsx", output: tsxgerador },
      { path: "logo_Hidden_Code.tsx", output: tsxLogo }
    ]
  }),
} as const;

export const carregador = new Loader();
for (const arq of Object.values(Arquivos)) {
  carregador.addResource(arq);
}
