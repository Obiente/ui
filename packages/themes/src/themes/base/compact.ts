import { defineTheme } from "../../types/theme";

export default defineTheme({
  id: "compact",
  name: "Compact",
  type: "base",
  description:
    "Compact theme with reduced spacing and sizing, suitable for dense UIs.",
  spacing: 0.7,
  sizing: 0.85,
  radius: 0.7,
  typography: 0.95,
  elevation: 0.8,
});
