# See, Also website
## Git repository structure
- Production (.gitignore does not contain /dist/)
- ↑ Main
  - ↑ Dist
    - ↑ Feature

## Requirements
- Jekyll
- Npm

## Setup
1. `git clone git@github.com:see-also-studio/see-also-website.git`
2. `npm install`
3. ``
## Local development
### 1. Run local server with auto reload
```
bundle exec jekyll serve --livereload
```

### 2. Webpack watch
```
npm run watch
```

### 3. Image resize
#### Requirements
Imagemagick `brew install imagemagick`
Resize all images in assets folder ready for srcset using Gulp
```npm run images```

## Deployment
1. Dev branch pull requests are merged into main.
2. Main is merged into prod
3. Npm build command is run in prod `npm run build`. Creates dist/ directory.
4. Push newly created dist/ directory to prod.
