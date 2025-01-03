import { createSystem, defineConfig } from "@chakra-ui/react"
import { defaultConfig } from "@chakra-ui/react"
import deepmerge from '@bundled-es-modules/deepmerge';

/*
  * This is how we are customizing the colors. This allows for dark mode
  * integration! :DDD
*/
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
              value: { _light: "{colors.white}", _dark: "#000000" }, // Custom dark background
            },
            subtle: {
              value: { _light: "{colors.gray.100}", _dark: "#2a2a2a" }, // Custom dark subtle background _light:#FFFFFF
            },
            textbg: {
                value: { _light: "{#FFFFFF}", _dark: "#1a1a1a" }, // Custom dark subtle background
              },
            muted: {
              value: { _light: "{#FFFFFF}", _dark: "#262626" }, // Custom dark muted background
            },
            red: {
              value: {_light: "{colors.red.0}", _dark: "#00000"},
            },
            ucsdaccent: {
              value: { _light: "{#182B49}", _dark: "#F5F0E6" },
            },
            buttons: {
              value: { _light: "#093a80", _dark: "{#093a80}" },
            },
            tags: {
              value: { _light: "#d9e2e8", _dark: "{colors.blue.700}" },
            },
            text: {
              value: { _light: "{colors.black}", _dark: "{colors.gray.100}" },
            },
            menu: {
              value: { _light: "{colors.gray.100}", _dark: "#2a2a2a" },
            }

          },
          fg: {
            
          }
        },
    }
  },
})

  
// console.log(deepmerge(defaultConfig, config)); // Debugging file
export default createSystem(deepmerge(defaultConfig, config))