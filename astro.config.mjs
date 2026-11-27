// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://staplett.xyz',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
        'upgrade-insecure-requests',
      ],
      // Scripts stay hash-locked. Styles allow inline because per-project
      // view-transition-name values are set with style attributes.
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
});
