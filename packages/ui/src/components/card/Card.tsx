import {
  Box,
  Card as CardUI,
  Heading,
  Inset,
  Separator,
} from "@radix-ui/themes";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card = ({ children, title, className }: CardProps) => {
  return (
    <CardUI className={className}>
      {title && (
        <Box mb="5">
          <Heading size="4" mb="5">
            {title}
          </Heading>
          <Inset clip="padding-box">
            <Separator orientation="horizontal" size="4" />
          </Inset>
        </Box>
      )}
      {children}
    </CardUI>
  );
};
