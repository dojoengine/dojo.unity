mergeInto(LibraryManager.library, {
    NewController: (policies, options) => {
        policies = JSON.parse(UTF8ToString(policies));
        options = JSON.parse(UTF8ToString(options));

        window.controller = controller = new Controller(policies, options);
    },
    ControllerConnect: async (cb) => {
        let result = {
            success: false,
        };

        try {
            await controller.connect();
            result.success = true;
        }
        catch (error) {
            result.error = error;
        }

        const resultStr = JSON.stringify(result);
        const bufferSize = lengthBytesUTF8(resultStr) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(resultStr, buffer, bufferSize);
        dynCall_vi(cb, buffer);
    },
    ControllerDisconnect: async (cb) => {
        let result = {
            success: false,
        };

        try {
            await controller.disconnect();
            result.success = true;
        }
        catch (error) {
            result.error = error;
        }

        const resultStr = JSON.stringify(result);
        const bufferSize = lengthBytesUTF8(resultStr) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(resultStr, buffer, bufferSize);
        dynCall_vi(cb, buffer);
    },
    ControllerRevoke: async (origin, policy, cb) => {
        let result = {
            success: false,
        };

        try {
            await controller.revoke(origin, policy);
            result.success = true;
        } catch (error) {
            result.error = error;
        }

        const resultStr = JSON.stringify(result);
        const bufferSize = lengthBytesUTF8(resultStr) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(resultStr, buffer, bufferSize);
        dynCall_vi(cb, buffer);
    },
    ControllerUsername: async (cb) => {
        let result = {
            success: false,
        };

        try {
            const username = await controller.username();
            result.success = true;
            result.result = username;
        } catch (error) {
            result.error = error;
        }

        const resultStr = JSON.stringify(result);
        const bufferSize = lengthBytesUTF8(resultStr) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(resultStr, buffer, bufferSize);
        dynCall_vi(cb, buffer);
    }
});