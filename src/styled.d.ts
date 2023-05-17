import 'styled-components'

type color = string

declare module 'styled-components' {
  export interface DefaultTheme {
    background: color
    heading: color
    text: color
    textSecondary: color
    disabled: color
    dividers: color
    tableHeader: color
    primary: color
    success: color
    processing: color
    error: color
    warning: color
    normal: color
    baseBg: color
    lightText: color
  }
}
