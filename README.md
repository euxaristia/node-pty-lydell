# @lydell/node-pty

Smaller distribution of [microsoft/node-pty](https://github.com/microsoft/node-pty).

- microsoft/node-pty ships with prebuilt binaries for multiple platforms. @lydell/node-pty only installs the prebuilt binaries needed for the current platform (depends on your package manager).
- microsoft/node-pty supports compiling using node-gyp on unsupported platforms, which requires more source files (about two and a half megabytes). @lydell/node-pty only works on platforms with prebuilt binaries and never calls node-gyp.
- microsoft/node-pty ships with unneeded files, such as source code TypeScript files, source maps and test files. @lydell/node-pty removes those (about half a megabyte).
- microsoft/node-pty is tens of megabytes. @lydell/node-pty is way less than one megabyte on macOS and Linux, and around half of microsoft/node-pty on Windows. The thing that takes the most space is microsoft/node-pty are the two Windows binaries it ships.

@lydell/node-pty is built like this:

1. Download the original node-pty npm package.
2. Make one copy of it per supported platform.
3. For each copy, only include relevant files.
4. Make the @lydell/node-pty wrapper package, which depends on all the platform-specific packages using `"optionalDependencies"` in package.json, allowing package managers to only install the platform-specific package matching the current platform. The wrapper package only re-exports everything from the correct platform-specific package.

## pty.js

microsoft/node-pty is forked from [chjj/pty.js](https://github.com/chjj/pty.js) with the primary goals being to provide better support for later Node.js versions and Windows.

## License

Copyright (c) 2012-2015, Christopher Jeffrey (MIT License).<br>
Copyright (c) 2016, Daniel Imms (MIT License).<br>
Copyright (c) 2018, Microsoft Corporation (MIT License).
