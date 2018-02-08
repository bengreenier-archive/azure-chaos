# azure-chaos

a tool for introducing chaos into the Azure PaaS using configurable extensions :gear: :cloud:

![readme logo](https://github.com/bengreenier/azure-chaos/raw/master/readme_logo.gif)

`azchaos` is a lightweight tool for running extensions that implements a [given API](https://rebilly.github.io/ReDoc/?url=https://raw.githubusercontent.com/bengreenier/azure-chaos/master/swagger.yml) with
the expectation that they introduce chaos into Azure.

To install, use `npm i -g azure-chaos`. Then use `azchaos` to invoke.

```
λ azchaos --help
azchaos [command] [args]

Commands:
  azchaos.js register <name> <uri> [desc]         register a chaos extension
  azchaos.js resgen <subId> [resGroup] [resName]  create a properly formatted resource identifier
  azchaos.js start <extension> [key]              starts some chaos
  azchaos.js stop <extension> [key]               stops some chaos
  azchaos.js unregister <name>                    unregister a chaos extension

Options:
  --version   Show version number                                                       [boolean]
  -h, --help  Show help                                                                 [boolean]

Learn more @ https://github.com/bengreenier/azure-chaos
```

To learn more about authoring extensions, take a look at these resources:

+ [expected API](https://rebilly.github.io/ReDoc/?url=https://raw.githubusercontent.com/bengreenier/azure-chaos/master/swagger.yml) - the OpenAPI doc for extensions
+ [azure-chaos-fn](https://github.com/bengreenier/azure-chaos-fn) - javascript sdk to make extension development easier
+ [azure-chaos-fn-webapp-startstop](https://github.com/trstringer/azure-chaos-fn-webapp-startstop) - a simple extension written in javascript

## register

Creates and/or updates a `.chaos-extensions.json` file in the working directory. This file represents
all the extensions the tool is aware of and able to run. Use __register__ to add new extensions:

```
azchaos register myextension https://myextension.com "a description of my extension"
```

## unregister

Updates a `.chaos-extensions.json` file in the working directory. This file represents
all the extensions the tool is aware of and able to run. Use __unregister__ to remove extensions:

```
azchaos unregister myextension
```

## start

__Start__ is a registered chaos extension, effectively enabling a chaotic event. This command requires
that a `--resources` argument is given, accepting an array of comma-separated resource identifier strings.
Optionally, the `--accessToken` argument may be provided, accepting an Azure access token in the form of `Bearer <token>`.
If `--accessToken` is not provided, the caller will be prompted to login interactively.

```
azchaos start myextension --resources "subId/resGroupName/resName","subId/resGroupName/resName2"
```

## stop

__Stop__ is a registered chaos extension, effectively disabling a chaotic event. This command requires
that a `--resources` argument is given, accepting an array of comma-separated resource identifier strings.
Optionally, the `--accessToken` argument may be provided, accepting an Azure access token in the form of `Bearer <token>`.
If `--accessToken` is not provided, the caller will be prompted to login interactively.

```
azchaos stop myextension --resources "subId/resGroupName/resName","subId/resGroupName/resName2"
```

## resgen

Generates a resource identifier string given an Azure subscription id, optionally an Azure resource group name,
and (still optionally) an Azure resource name. The resulting tri-part string (in the form of `subId/resGroupName/resName`)
will be output to `stdout`.

```
azchaos resGen mySubId myResGroupName myResName
```

## License

MIT