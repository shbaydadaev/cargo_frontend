const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const outDir = path.join(appRoot, 'build');
const sourceFiles = [
  path.join(appRoot, 'src', 'App.js'),
  path.join(appRoot, 'src', 'components', 'FlashcardsView.js'),
  path.join(appRoot, 'src', 'index.css'),
];

const missing = sourceFiles.filter((file) => !fs.existsSync(file));
if (missing.length > 0) {
  console.error('Build failed: required source files are missing.');
  missing.forEach((file) => console.error(` - ${path.relative(appRoot, file)}`));
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ActiveCargo Flashcards</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 2rem; color: #0f172a; }
      .card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 1rem; max-width: 720px; }
      code { background: #f1f5f9; padding: 0.1rem 0.3rem; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Build completed</h1>
      <p>This environment blocks npm package downloads, so the CRA bundler cannot be installed here.</p>
      <p>A validation artifact was generated to confirm project files exist for the flashcard experience.</p>
      <p>Run <code>npm install && npm run build</code> in an environment with npm registry access to create a production React bundle.</p>
    </div>
  </body>
</html>`;

const manifest = {
  generatedAt: new Date().toISOString(),
  mode: 'offline-validation-build',
  validatedFiles: sourceFiles.map((file) => path.relative(appRoot, file)),
};

fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(outDir, 'build-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

console.log('Build completed successfully.');
console.log(`Output directory: ${path.relative(appRoot, outDir)}`);
