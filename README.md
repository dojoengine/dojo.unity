# dojo.unity

## Usage

First, install [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

Then build c2cs:

```sh
# install castffi
dotnet tool install bottlenoselabs.castffi.tool -g
dotnet build c2cs/src/cs
```

Finally, run bindgen:

```sh
scripts/bindgen.sh
```

## Updating the bindings

You can refer to [dojo.c](https://github.com/dojoengine/dojo.c) to get the latest version of the C bindings. You can then get the header file and replace the one in `Dojo/bindings/dojo.h` by it and update the dylib `libtorii_c.dylib`.

Once that's done, you can run `scripts/bindgen.sh` to generate the new C# bindings.
