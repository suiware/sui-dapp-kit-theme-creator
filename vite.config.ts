import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv, Plugin } from "vite";

// Strips the Umami analytics snippet from index.html unless
// VITE_ENABLE_ANALYTICS is explicitly set to "true".
const analyticsHtmlPlugin = (env: Record<string, string>): Plugin => ({
  name: "html-analytics-toggle",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      if (env.VITE_ENABLE_ANALYTICS === "true") {
        return html;
      }
      return html.replace(
        /[ \t]*<!-- umami:start[\s\S]*?<!-- umami:end -->\n?/,
        ""
      );
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (not just VITE_-prefixed) so the plugin can read the flag.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "~~": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react(), analyticsHtmlPlugin(env)],
  };
});
