'use client'

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

import {Switch} from './switch';
import {Icon} from '@chakra-ui/react';
import {FaSun, FaMoon} from 'react-icons/fa';

export function ColorModeProvider(props) {
  return (
    <ThemeProvider 
      attribute='class' 
      disableTransitionOnChange 
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      {...props} />
  )
}

export function useColorMode() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: resolvedTheme || theme,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'light' ? <LuSun /> : <LuMoon />
}

export const ColorModeButton = React.forwardRef(
  function ColorModeButton(props, ref) {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <ClientOnly fallback={<Skeleton boxSize='8' />}>
        {/* <IconButton
          onClick={toggleColorMode}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5',
            },
          }}
        >
          <ColorModeIcon />
        </IconButton> */}
        <Switch
            colorPalette="blue"
            size="lg"
            checked={colorMode === 'light'}
            onChange={toggleColorMode}
            trackLabel={{
                off: (
                  <Icon color="gray.400">
                    <FaMoon />
                  </Icon>
                ),
                on: (
                  <Icon color="yellow.400">
                    <FaSun />
                  </Icon>
                ),
            }}
        />
      </ClientOnly>
    )
  },
)
