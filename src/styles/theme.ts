import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const colors = {
  gold: {
    50: "#fff8e1",
    100: "#ffecb3",
    200: "#ffe082",
    300: "#ffd54f",
    400: "#ffca28",
    500: "#ffc107",
    600: "#ffb300",
    700: "#ffa000",
    800: "#ff8f00",
    900: "#ff6f00",
  },
  // Additional colors if needed
};

const config: ThemeConfig = {
  initialColorMode: "light", // Starting theme
  useSystemColorMode: false,
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: "gray.900",
      color: "whiteAlpha.900",
    },
  }),
};

const components = {
  Button: {
    variants: {
      gold: (props: any) => ({
        bg: "gold.500", 
        color: "gray.900",
        _hover: {
          bg: "gold.600",
        },
      }),
    },
  },
  Input: {
    variants: {
      filled: (props: any) => ({
        field: {
          bg: "gray.700",
          _hover: {
            bg: "gray.600",
          },
          _focus: {
            bg: "gray.600",
            borderColor: "gold.500",
          },
        },
      }),
    },
  },
  Checkbox: {
    baseStyle: (props: any) => ({
      control: {
        _checked: {
          bg: "gold.500",
          borderColor: "gold.500",
          _hover: {
            bg: "gold.600",
            borderColor: "gold.600",
          },
        },
      },
    }),
  },
  Radio: {
    baseStyle: (props: any) => ({
      control: {
        _checked: {
          bg: "gold.500",
          borderColor: "gold.500",
          _hover: {
            bg: "gold.600",
            borderColor: "gold.600",
          },
        },
      },
    }),
  },
  Heading: {
    baseStyle: (props: any) => ({
      color: "gold.400",
    }),
  },
  FormLabel: {
    baseStyle: (props: any) => ({
      color: "gold.300",
    }),
  },
};

const theme = extendTheme({
  config,
  colors,
  styles,
  components,
});

export default theme;
