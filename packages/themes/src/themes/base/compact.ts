import { defineBaseTheme } from "types/base-theme.ts";

export default defineBaseTheme({
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
