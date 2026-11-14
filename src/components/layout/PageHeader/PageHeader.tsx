import Typography, { type TypographyProps } from '@mui/material/Typography';
import { forwardRef } from 'react';

export type PageHeaderProps = Omit<TypographyProps, 'component' | 'variant'>;

export const PageHeader = forwardRef<HTMLHeadingElement, PageHeaderProps>(
  function PageHeader(
    { children, color = 'text.primary', gutterBottom = true, ...props },
    ref,
  ) {
    return (
      <Typography
        ref={ref}
        color={color}
        component="h1"
        gutterBottom={gutterBottom}
        variant="h4"
        {...props}
      >
        {children}
      </Typography>
    );
  },
);

PageHeader.displayName = 'PageHeader';
