# dojo.unity

## Getting started

### Prerequisites

Before getting started, there are a few steps you must follow in order to get the project up and running.

#### Dojo

Ensure that you're using the latest supported Dojo [version](https://github.com/dojoengine/dojo/releases).

#### World

First of all, if you only want to experiment with the demo `dojo-starter` unity project, you must follow the instructions in the [dojo-starter](https://book.dojoengine.org/cairo/hello-dojo.html) repo.

By then, you should have Katana and Torii up and running locally, which we're going to use in the demo project. As well as your world and contract addresses.

#### Binaries

If you are using Windows or Linux, you will need to build [dojo.c](https://github.com/dojoengine/dojo.c) yourself. Make sure that you're using the latest supported version

```bash
git clone git@github.com:Larkooo/dojo.c.git
cargo build --release
```

This will generate a `.dll` or `.so` binary in the `target/release` directory, depending on your platform. You will need to copy it to the following location `Packages/Dojo/Libraries`


### Setting up the project

You can now open the project in Unity and start setting it up.
You will notice a WorldManager game object in the scene. This is the main entry point for the Dojo world.

![worldmanager](https://media.discordapp.net/attachments/544666013707272194/1184378211468066846/image.png?ex=658bc12a&is=65794c2a&hm=885b02517cdbf463f169accf4ea8d1052d8a09ad62873e79781c36a6c379faad&=&format=webp&quality=lossless&width=318&height=595)

You can replace the default values in the WorldManager script component by yours - like the exposed URLs for your Katana and Torii instances, as well as your world address.

The second component to look at is the SynchronizationMaster - this is where you can specify the number of maximum entities you want synchronized, and, optionally, your models component.
