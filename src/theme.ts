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
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    font-family: 'Inter', sans-serif;
  }
`
