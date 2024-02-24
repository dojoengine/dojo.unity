cd ./Bindings/dojo.c

build="release"

if [[ "$1" == "debug" ]]; then
    build="debug"
elif [[ "$1" == "release" ]]; then
    build="release"
else 
    target="$1"
fi

if [[ "$2" == "debug" ]]; then
    build="debug"
elif [[ "$2" == "release" ]]; then
    build="release"
else 
    target="$2"
fi

# if target specified
if [[ "$target" != "" ]]; then
    if [[ "$build" == "release" ]]; then
        cargo build --release --target "$target"
    else
        cargo build --target "$target"
    fi
else
    if [[ "$build" == "release" ]]; then
        cargo build --release
    else
        cargo build
    fi
fi
