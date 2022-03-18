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
1. Run local server with auto reload
```
bundle exec jekyll serve --livereload
```

2. Webpack watch
```
npm run watch
```

## Deployment
1. Dev branch pull requests are merged into main.
2. Main is merged into prod
3. Npm build command is run in prod `npm run build`
4. Dist folder is pushed to prod
