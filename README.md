# dojo.unity

## Getting started

### Prerequisites

Before getting started, there are a few steps you must follow in order to get the project up and running.

#### Dojo

Ensure that you're using the latest supported Dojo [version](https://github.com/dojoengine/dojo/releases).

#### World

If you only want to experiment with the demo `dojo-starter` unity project, you must follow the instructions in the [dojo-starter](https://book.dojoengine.org/cairo/hello-dojo.html) repo.

By then, you should have Katana and Torii up and running locally, which we're going to use in the demo project. As well as your world and contract addresses.

#### Binaries

If you are using Windows or Linux, you will need to build [dojo.c](https://github.com/dojoengine/dojo.c) yourself. Make sure that you're using the latest supported version

```bash
git clone git@github.com:dojoengine/dojo.c.git
cargo build --release
```

This will generate a `.dll` or `.so` binary in the `target/release` directory, depending on your platform. You will need to copy it to the following location `Packages/Dojo/Libraries`


### Setting up the project

You can now open the project in Unity and start setting it up.

#### World Manager

You will notice a WorldManager game object in the scene. This is the main entry point for the Dojo world. Any entities from your Dojo world will be instantiated under this game object.

![worldmanager](https://media.discordapp.net/attachments/544666013707272194/1184380066776486028/image.png?ex=658bc2e4&is=65794de4&hm=04d51e234ef46f2ea9c41374da680149985afa45c3eb1611ea851c3125acb4fe&=&format=webp&quality=lossless)

You can replace the default values in the WorldManager script component by yours - like the exposed URLs for your Katana and Torii instances, as well as your world address.

#### Synchronization Master

The second component to look at is the SynchronizationMaster - this is where you can specify the number of maximum entities you want synchronized, and your models components.

![sync](https://media.discordapp.net/attachments/544666013707272194/1184380125928763412/image.png?ex=658bc2f2&is=65794df2&hm=c5dd5b2e0452f627329cf8b036e763bec84b79130cd237beac4d261f25de774b&=&format=webp&quality=lossless)

Models are the components that will be synchronized between the Dojo world and the Unity world. You can add as many as you want, but make sure that you have the same models in your Dojo world.

![models](https://media.discordapp.net/attachments/544666013707272194/1184380159478988860/image.png?ex=658bc2fa&is=65794dfa&hm=56971410358f53303c464c7c9185fd1301aa69e535ede028f7c49618a0297d89&=&format=webp&quality=lossless)
