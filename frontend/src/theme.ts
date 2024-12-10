import { createSystem, defineConfig } from "@chakra-ui/react"
import { defaultConfig } from "@chakra-ui/react"
import deepmerge from '@bundled-es-modules/deepmerge';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
      },
    },
    semanticTokens: {
        colors: {
          bg: {
            DEFAULT: {
              value: { _light: "{colors.white}", _dark: "#141414" }, // Custom dark background
            },
            subtle: {
              value: { _light: "{#FFFFFF}", _dark: "#1a1a1a" }, // Custom dark subtle background
            },
            muted: {
              value: { _light: "{colors.gray.100}", _dark: "#262626" }, // Custom dark muted background
            },
            red: {
              value: {_light: "{colors.red.0}", _dark: "#00000"},
            }
          },
        },
    }
  },
})

  
console.log(deepmerge(defaultConfig, config));
export default createSystem(deepmerge(defaultConfig, config))