import Box, { type BoxProps } from "@mui/material/Box";
import Portal from "@mui/material/Portal";

export const CLASSIFICATION_BANNER_HEIGHT = 24;

export type Classification =
  | "UNCLASSIFIED"
  | "CUI"
  | "CONFIDENTIAL"
  | "SECRET"
  | "TOP SECRET"
  | "TOP SECRET // SCI";

export interface ClassificationBannerProps extends Omit<BoxProps, "children"> {
  classification: Classification;
}

const classificationColors: Record<
  Classification,
  { backgroundColor: string; color: string }
> = {
  UNCLASSIFIED: { backgroundColor: "#007A33", color: "#FFFFFF" },
  CUI: { backgroundColor: "#502B85", color: "#FFFFFF" },
  CONFIDENTIAL: { backgroundColor: "#0033A0", color: "#FFFFFF" },
  SECRET: { backgroundColor: "#C8102E", color: "#FFFFFF" },
  "TOP SECRET": { backgroundColor: "#FF8C00", color: "#101112" },
  "TOP SECRET // SCI": { backgroundColor: "#FCE83A", color: "#101112" },
};

export function ClassificationBanner({
  classification,
  sx,
  ref,
  ...rest
}: ClassificationBannerProps) {
  const banner = (
    <Box
      aria-label={`Classification: ${classification}`}
      ref={ref}
      role="note"
      sx={[
        {
          alignItems: "center",
          display: "flex",
          fontSize: "0.75rem",
          fontWeight: 700,
          height: CLASSIFICATION_BANNER_HEIGHT,
          justifyContent: "center",
          left: 0,
          letterSpacing: "0.04em",
          position: "fixed",
          right: 0,
          top: 0,
          zIndex: (theme) => theme.zIndex.tooltip + 1,
          ...classificationColors[classification],
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {classification}
    </Box>
  );

  return typeof document === "undefined" ? banner : <Portal>{banner}</Portal>;
}

ClassificationBanner.displayName = "ClassificationBanner";
