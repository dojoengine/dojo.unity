# dojo.unity

## Usage

First, install [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

Second, install clang 
![alt text]("images/vs-clang-install.png" "vs-clang-install")
or via LLVM




Then install c2cs:

```sh
dotnet tool install bottlenoselabs.c2cs.tool --global
dotnet tool install bottlenoselabs.castffi.tool -g
```


You will then have to navigate to your libclang.dll which we installed earlier 
and place it 

```sh
dotnet\tools\.store\bottlenoselabs.castffi.tool\1.4.0\bottlenoselabs.castffi.tool\1.4.0\tools\net7.0\any\
```
Finally, run bindgen:

```sh
scripts/bindgen.sh

or 

scripts/binddojo.bat [windows]
```
