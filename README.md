# dojo.unity

## Usage

First, install [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

Second, refer to C2CS [Prerequisites](github.com/bottlenoselabs/c2cs/blob/main/docs/README.md#prerequisites)


Then install c2cs:

```sh
dotnet tool install bottlenoselabs.c2cs.tool --global
dotnet tool install bottlenoselabs.castffi.tool -g
```

Finally, run bindgen:

```sh
scripts/bindgen.sh

or 

scripts/binddojo.bat [windows]
```
