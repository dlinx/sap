import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../theme/theme';
import { StyledEngineProvider } from '@mui/material/styles';

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <ThemeProvider theme={getTheme('light')}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render }; 