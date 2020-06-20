## Commands to know about

### `yarn install`

Gives you what you need

### `yarn start-app`

Runs the main React App in development mode

### `yarn start-storybook`

Runs the storybook in development mode

### `yarn build-app` and `yarn build-storybook`

Bundle the app / storybook for release.

### `yarn lint`

Runs the linter. If the code doesn't lint correctly it will fail in CI. When you
want the linter to automatically fix boring errors, you can do `yarn lint
--fix`. Also, feel free to update the linting rules in `tslint.json` if they're
too lame.

### `yarn typecheck`

Runs the typechecker. If the code doesn't typecheck correctly it will fail in
CI.

### `yarn cleanup`

This is automatically run before the parcel steps. It removes the parcel cache
and build folder. It's a bit lame but prevents wasting time when you can't work
out why changes to your environment variables aren't getting picked up...

## Development flow

Make sure your code always lints and typechecks correctly. Because we want a
very fast UI development feedback loop the `yarn start-app` / `yarn
start-storybook` commands do not do typechecking/linting. So it's recommended to
always have the linting / typechecking running on file-changes in seperate
processes.  E.g. in a couple of terminal panes run:

    yarn typecheck --watch

and (if you happen to use `entr`, which is an excellent tool)

    while true; do find src stories | entr -d yarn lint; done

Make sure you regularly check this output.

Alternatively, your editor may be able to help with that kind of thing.

## SVGs

SVGR is used to convert .svg files into React components: https://github.com/smooth-code/svgr

We use a custom template to ensure Typescript compatibility.
Options are set in app/.svgrrc.js

From the app folder run

    npx @svgr/cli ./src/assets/svg/button-audio-play.svg > ./src/components/svg/play.tsx