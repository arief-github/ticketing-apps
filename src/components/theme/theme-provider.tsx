// Theme Provider is used for wrapping all entire apps
// for setting theme mode

import { ThemeProvider as BaseThemeProvider } from 'next-themes'

type ThemeProviderProps = {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </BaseThemeProvider>
    )
}

export { ThemeProvider }