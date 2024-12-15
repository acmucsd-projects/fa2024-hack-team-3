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
              value: { _light: "{colors.white}", _dark: "#141414" }, // Custom dark background
            },
            subtle: {
              value: { _light: "{#FFFFFF}", _dark: "#1a1a1a" }, // Custom dark subtle background
            },
            textbg: {
                value: { _light: "{#FFFFFF}", _dark: "#F5F0E6" }, // Custom dark subtle background
              },
            muted: {
              value: { _light: "{colors.gray.100}", _dark: "#262626" }, // Custom dark muted background
            },
            red: {
              value: {_light: "{colors.red.0}", _dark: "#00000"},
            },
            ucsdaccent: {
              value: { _light: "{#182B49}", _dark: "#F5F0E6" },
            },
            buttons: {
              value: { _light: "#182B49", _dark: "{blue.600}" },
            }
          },
        },
    }
  },
})

  
// console.log(deepmerge(defaultConfig, config)); // Debugging file
export default createSystem(deepmerge(defaultConfig, config))