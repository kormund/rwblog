import { DefaultTheme, createGlobalStyle } from 'styled-components'

export const defaultTheme: DefaultTheme = {
  background: '#EBEEF3',
  heading: 'rgba(0, 0, 0, 0.85)',
  text: 'rgba(0, 0, 0, 0.75)',
  textSecondary: 'rgba(0, 0, 0, 0.5)',
  disabled: 'rgba(0, 0, 0, 0.35)',
  dividers: 'rgba(0, 0, 0, 0.09)',
  tableHeader: 'rgba(0, 0, 0, 0.02)',
  primary: '#1890FF',
  success: '#52C41A',
  processing: '#1890FF',
  error: '#F5222D',
  warning: '#FAAD14',
  normal: '#D9D9D9',
  baseBg: '#FFFFFF',
  lightText: '#8C8C8C',
}

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-weight: lighter;
    box-sizing: border-box;
  },
  h1 {
    font-size: 44px;
    line-height: 76px;
  },
  h2 {
    font-size: 56px;
    line-height: 64px;
  },
  h3 {
    font-size: 30px;
    line-height: 36px;
  },
  h4 {
    font-size: 24px;
    line-height: 32px;
  },
  h5 {
    font-size: 20px;
    line-height: 28px;
  },
  
  h6 {
    font-size: 18px;
    line-height: 28px;
  }
`
