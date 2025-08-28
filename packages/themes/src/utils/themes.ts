// Use Vite's import.meta.glob to dynamically import all theme files
const themeFiles = import.meta.glob("../themes/**/*.ts", { 
  eager: true
});

const themes: any[] = [];

// Aggregate themes from all imported files
for (const [path, moduleExports] of Object.entries(themeFiles)) {
  // Skip index files to avoid duplicates
  if (path.includes('index.ts')) continue;
  
  const mod = moduleExports as any;
  
  if (Array.isArray(mod.default)) {
    themes.push(...mod.default);
  } else if (mod.default) {
    themes.push(mod.default);
  }
}

export function getAllThemes() {
  return themes;
}

export function getColorThemes() {
  return themes.filter((theme) => theme.type === "color");
}

export function getBaseThemes() {
  return themes.filter((theme) => theme.type === "base");
}

export function getFlairThemes() {
  return themes.filter((theme) => theme.type === "flair");
}
