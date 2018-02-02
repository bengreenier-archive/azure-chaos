

## Contributing

Hey thanks! We want you to be successful in contributing back to this project! :rocket:

### Workflow

> First, clone this repo, and run `npm install` to ensure you have all dependencies.

This project uses [npm-scripts](https://docs.npmjs.com/misc/scripts) to keep things simple and easy. Here's how to leverage them:

+ `npm run linter` will run the [tslint](https://palantir.github.io/tslint/) linter
+ `npm run compile` will run the [tsc](https://www.typescriptlang.org/docs/tutorial.html) compiler, building to the `dist` folder
+ `npm run test` will compile, run the linter, and run [ava](https://github.com/avajs/ava) tests

Advanced scripts:

> ~~Tip: Using [vscode](https://code.visualstudio.com/) you can run the default `build` and `test` tasks and rely on the "Problems" window to surface issues.~~ coming soon :sparkles:

+ `npm run c-watch` will run the [tsc](https://www.typescriptlang.org/docs/tutorial.html) compiler using `--watch` mode
+ `npm run t-watch` will run the [ava](https://github.com/avajs/ava) tests using `--watch` mode