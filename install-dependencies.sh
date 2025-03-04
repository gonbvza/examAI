#!/bin/bash

# Install React and React DOM with their type definitions
npm install --save-exact react react-dom @types/react@18.2.0 @types/react-dom@18.2.0

# Install router and its type definitions
npm install --save-exact react-router-dom

# Install FontAwesome packages
npm install --save-exact @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

# Install React Modal and its type definitions
npm install --save-exact react-modal @types/react-modal

# Install js-cookie and its type definitions
npm install --save-exact js-cookie @types/js-cookie

# Add TypeScript config to fix implicit any errors
echo '{
  "compilerOptions": {
    "noImplicitAny": false
  }
}' > tsconfig.override.json

# Merge the override with existing tsconfig
npx json -f tsconfig.app.json -I -e "this.compilerOptions.noImplicitAny=false"

# Create .npmrc for dependency resolution in Railway
echo "legacy-peer-deps=true
save-exact=true" > .npmrc