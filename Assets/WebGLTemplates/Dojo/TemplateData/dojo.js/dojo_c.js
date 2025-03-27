let wasm_bindgen;
(function() {
    const __exports = {};
    let script_src;
    if (typeof document !== 'undefined' && document.currentScript !== null) {
        script_src = new URL(document.currentScript.src, location.href).toString();
    }
    let wasm = undefined;

    let WASM_VECTOR_LEN = 0;

    let cachedUint8ArrayMemory0 = null;

    function getUint8ArrayMemory0() {
        if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
            cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachedUint8ArrayMemory0;
    }

    const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

    const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
        ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
        : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });

    function passStringToWasm0(arg, malloc, realloc) {

        if (realloc === undefined) {
            const buf = cachedTextEncoder.encode(arg);
            const ptr = malloc(buf.length, 1) >>> 0;
            getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
            WASM_VECTOR_LEN = buf.length;
            return ptr;
        }

        let len = arg.length;
        let ptr = malloc(len, 1) >>> 0;

        const mem = getUint8ArrayMemory0();

        let offset = 0;

        for (; offset < len; offset++) {
            const code = arg.charCodeAt(offset);
            if (code > 0x7F) break;
            mem[ptr + offset] = code;
        }

        if (offset !== len) {
            if (offset !== 0) {
                arg = arg.slice(offset);
            }
            ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
            const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
            const ret = encodeString(arg, view);

            offset += ret.written;
            ptr = realloc(ptr, len, offset, 1) >>> 0;
        }

        WASM_VECTOR_LEN = offset;
        return ptr;
    }

    let cachedDataViewMemory0 = null;

    function getDataViewMemory0() {
        if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
            cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
        }
        return cachedDataViewMemory0;
    }

    const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

    if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

    function getStringFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }

    function addToExternrefTable0(obj) {
        const idx = wasm.__externref_table_alloc();
        wasm.__wbindgen_export_4.set(idx, obj);
        return idx;
    }

    function handleError(f, args) {
        try {
            return f.apply(this, args);
        } catch (e) {
            const idx = addToExternrefTable0(e);
            wasm.__wbindgen_exn_store(idx);
        }
    }

    function isLikeNone(x) {
        return x === undefined || x === null;
    }

    function getArrayU8FromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
    }

    const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(state => {
        wasm.__wbindgen_export_5.get(state.dtor)(state.a, state.b)
    });

    function makeMutClosure(arg0, arg1, dtor, f) {
        const state = { a: arg0, b: arg1, cnt: 1, dtor };
        const real = (...args) => {
            // First up with a closure we increment the internal reference
            // count. This ensures that the Rust closure environment won't
            // be deallocated while we're invoking it.
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return f(a, state.b, ...args);
            } finally {
                if (--state.cnt === 0) {
                    wasm.__wbindgen_export_5.get(state.dtor)(a, state.b);
                    CLOSURE_DTORS.unregister(state);
                } else {
                    state.a = a;
                }
            }
        };
        real.original = state;
        CLOSURE_DTORS.register(real, state, state);
        return real;
    }

    function debugString(val) {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debugString(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debugString(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches && builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
            return `${val.name}: ${val.message}\n${val.stack}`;
        }
        // TODO we could test for more things here, like `Set`s and `Map`s.
        return className;
    }

    function takeFromExternrefTable0(idx) {
        const value = wasm.__wbindgen_export_4.get(idx);
        wasm.__externref_table_dealloc(idx);
        return value;
    }
    /**
     * Encodes typed data according to Starknet's typed data specification
     *
     * # Parameters
     * * `typed_data` - JSON string containing the typed data
     * * `address` - Address as hex string
     *
     * # Returns
     * Result containing encoded data as hex string or error
     * @param {string} typed_data
     * @param {string} address
     * @returns {string}
     */
    __exports.typedDataEncode = function(typed_data, address) {
        let deferred4_0;
        let deferred4_1;
        try {
            const ptr0 = passStringToWasm0(typed_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.typedDataEncode(ptr0, len0, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    };

    /**
     * Generates a new random signing key
     *
     * # Returns
     * Private key as hex string
     * @returns {string}
     */
    __exports.signingKeyNew = function() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signingKeyNew();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    };

    /**
     * Signs a message hash with a private key
     *
     * # Parameters
     * * `private_key` - Private key as hex string
     * * `hash` - Message hash as hex string
     *
     * # Returns
     * Result containing signature or error
     * @param {string} private_key
     * @param {string} hash
     * @returns {Signature}
     */
    __exports.signingKeySign = function(private_key, hash) {
        const ptr0 = passStringToWasm0(private_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.signingKeySign(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };

    /**
     * Derives a verifying (public) key from a signing (private) key
     *
     * # Parameters
     * * `signing_key` - Signing key as hex string
     *
     * # Returns
     * Result containing verifying key as hex string or error
     * @param {string} signing_key
     * @returns {string}
     */
    __exports.verifyingKeyNew = function(signing_key) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(signing_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.verifyingKeyNew(ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    };

    /**
     * Verifies a signature against a message hash using a verifying key
     *
     * # Parameters
     * * `verifying_key` - Verifying key as hex string
     * * `hash` - Message hash as hex string
     * * `signature` - Signature to verify
     *
     * # Returns
     * Result containing verification success boolean or error
     * @param {string} verifying_key
     * @param {string} hash
     * @param {Signature} signature
     * @returns {boolean}
     */
    __exports.verifyingKeyVerify = function(verifying_key, hash, signature) {
        const ptr0 = passStringToWasm0(verifying_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.verifyingKeyVerify(ptr0, len0, ptr1, len1, signature);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    };

    /**
     * Creates a new Starknet provider instance for a given RPC URL
     *
     * # Parameters
     * * `rpc_url` - URL of the RPC endpoint
     *
     * # Returns
     * Result containing Provider instance or error
     * @param {string} rpc_url
     * @returns {Provider}
     */
    __exports.createProvider = function(rpc_url) {
        const ptr0 = passStringToWasm0(rpc_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.createProvider(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Provider.__wrap(ret[0]);
    };

    function passArrayJsValueToWasm0(array, malloc) {
        const ptr = malloc(array.length * 4, 4) >>> 0;
        const mem = getDataViewMemory0();
        for (let i = 0; i < array.length; i++) {
            mem.setUint32(ptr + 4 * i, addToExternrefTable0(array[i]), true);
        }
        WASM_VECTOR_LEN = array.length;
        return ptr;
    }
    /**
     * Computes a contract address from deployment parameters
     *
     * # Parameters
     * * `class_hash` - Contract class hash as hex string
     * * `salt` - Salt value as hex string
     * * `constructor_calldata` - Array of constructor parameters as hex strings
     * * `deployer_address` - Address of deployer as hex string
     *
     * # Returns
     * Result containing computed contract address as hex string or error
     * @param {string} class_hash
     * @param {string} salt
     * @param {(string)[]} constructor_calldata
     * @param {string} deployer_address
     * @returns {string}
     */
    __exports.hashGetContractAddress = function(class_hash, salt, constructor_calldata, deployer_address) {
        let deferred6_0;
        let deferred6_1;
        try {
            const ptr0 = passStringToWasm0(class_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(salt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passArrayJsValueToWasm0(constructor_calldata, wasm.__wbindgen_malloc);
            const len2 = WASM_VECTOR_LEN;
            const ptr3 = passStringToWasm0(deployer_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len3 = WASM_VECTOR_LEN;
            const ret = wasm.hashGetContractAddress(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
            var ptr5 = ret[0];
            var len5 = ret[1];
            if (ret[3]) {
                ptr5 = 0; len5 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred6_0 = ptr5;
            deferred6_1 = len5;
            return getStringFromWasm0(ptr5, len5);
        } finally {
            wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
        }
    };

    /**
     * Computes a selector from a tag string
     *
     * # Parameters
     * * `tag` - Tag string to compute selector from
     *
     * # Returns
     * Selector as hex string
     * @param {string} tag
     * @returns {string}
     */
    __exports.getSelectorFromTag = function(tag) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(tag, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.getSelectorFromTag(ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    };

    function getArrayJsValueFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        const mem = getDataViewMemory0();
        const result = [];
        for (let i = ptr; i < ptr + 4 * len; i += 4) {
            result.push(wasm.__wbindgen_export_4.get(mem.getUint32(i, true)));
        }
        wasm.__externref_drop_slice(ptr, len);
        return result;
    }
    /**
     * Serializes a string into a Cairo byte array
     *
     * # Parameters
     * * `str` - String to serialize
     *
     * # Returns
     * Result containing array of field elements as hex strings or error
     * @param {string} str
     * @returns {(string)[]}
     */
    __exports.byteArraySerialize = function(str) {
        const ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.byteArraySerialize(ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    };

    /**
     * Deserializes a Cairo byte array into a string
     *
     * # Parameters
     * * `felts` - Array of field elements as hex strings
     *
     * # Returns
     * Result containing deserialized string or error
     * @param {(string)[]} felts
     * @returns {string}
     */
    __exports.byteArrayDeserialize = function(felts) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passArrayJsValueToWasm0(felts, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.byteArrayDeserialize(ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    };

    /**
     * Computes a Poseidon hash of the inputs
     *
     * # Parameters
     * * `inputs` - Array of field elements as hex strings
     *
     * # Returns
     * Result containing hash as hex string or error
     * @param {(string)[]} inputs
     * @returns {string}
     */
    __exports.poseidonHash = function(inputs) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passArrayJsValueToWasm0(inputs, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.poseidonHash(ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    };

    /**
     * Gets a selector from a function name
     *
     * # Parameters
     * * `name` - Function name to compute selector from
     *
     * # Returns
     * Result containing selector as hex string or error
     * @param {string} name
     * @returns {string}
     */
    __exports.getSelectorFromName = function(name) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.getSelectorFromName(ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    };

    /**
     * Computes the Starknet variant of Keccak hash
     *
     * # Parameters
     * * `inputs` - Byte array to hash
     *
     * # Returns
     * Result containing hash as hex string or error
     * @param {Uint8Array} inputs
     * @returns {string}
     */
    __exports.starknetKeccak = function(inputs) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.starknetKeccak(inputs);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    };

    /**
     * Converts a short string to a Cairo field element
     *
     * # Parameters
     * * `str` - String to convert
     *
     * # Returns
     * Result containing field element as hex string or error
     * @param {string} str
     * @returns {string}
     */
    __exports.cairoShortStringToFelt = function(str) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.cairoShortStringToFelt(ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    };

    /**
     * Parses a Cairo field element into a short string
     *
     * # Parameters
     * * `str` - Field element as hex string
     *
     * # Returns
     * Result containing parsed string or error
     * @param {string} str
     * @returns {string}
     */
    __exports.parseCairoShortString = function(str) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.parseCairoShortString(ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    };

    function _assertClass(instance, klass) {
        if (!(instance instanceof klass)) {
            throw new Error(`expected instance of ${klass.name}`);
        }
    }
    /**
     * Creates a new Torii client with the given configuration
     *
     * # Parameters
     * * `config` - Client configuration including URLs and world address
     *
     * # Returns
     * Result containing ToriiClient instance or error
     * @param {ClientConfig} config
     * @returns {Promise<ToriiClient>}
     */
    __exports.createClient = function(config) {
        const ret = wasm.createClient(config);
        return ret;
    };

    function __wbg_adapter_52(arg0, arg1) {
        wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h634291d4c998af85(arg0, arg1);
    }

    function __wbg_adapter_55(arg0, arg1, arg2) {
        wasm.closure1030_externref_shim(arg0, arg1, arg2);
    }

    function __wbg_adapter_62(arg0, arg1, arg2) {
        wasm.closure1055_externref_shim(arg0, arg1, arg2);
    }

    function __wbg_adapter_69(arg0, arg1) {
        wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h460ada3bb74aca3e(arg0, arg1);
    }

    function __wbg_adapter_72(arg0, arg1, arg2) {
        wasm.closure2303_externref_shim(arg0, arg1, arg2);
    }

    function __wbg_adapter_396(arg0, arg1, arg2, arg3) {
        wasm.closure2475_externref_shim(arg0, arg1, arg2, arg3);
    }

    const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];

    const __wbindgen_enum_ReadableStreamType = ["bytes"];

    const __wbindgen_enum_ReferrerPolicy = ["", "no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "unsafe-url", "same-origin", "strict-origin", "strict-origin-when-cross-origin"];

    const __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];

    const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];

    const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];

    const __wbindgen_enum_RequestRedirect = ["follow", "error", "manual"];

    const __wbindgen_enum_RtcDataChannelState = ["connecting", "open", "closing", "closed"];

    const __wbindgen_enum_RtcDataChannelType = ["arraybuffer", "blob"];

    const __wbindgen_enum_RtcSdpType = ["offer", "pranswer", "answer", "rollback"];

    const AccountFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_account_free(ptr >>> 0, 1));

    class Account {

        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(Account.prototype);
            obj.__wbg_ptr = ptr;
            AccountFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            AccountFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_account_free(ptr, 0);
        }
        /**
         * Returns the account's address
         *
         * # Returns
         * Result containing address as hex string or error
         * @returns {string}
         */
        address() {
            let deferred2_0;
            let deferred2_1;
            try {
                const ret = wasm.account_address(this.__wbg_ptr);
                var ptr1 = ret[0];
                var len1 = ret[1];
                if (ret[3]) {
                    ptr1 = 0; len1 = 0;
                    throw takeFromExternrefTable0(ret[2]);
                }
                deferred2_0 = ptr1;
                deferred2_1 = len1;
                return getStringFromWasm0(ptr1, len1);
            } finally {
                wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
            }
        }
        /**
         * Returns the account's chain ID
         *
         * # Returns
         * Result containing chain ID as hex string or error
         * @returns {string}
         */
        chainId() {
            let deferred2_0;
            let deferred2_1;
            try {
                const ret = wasm.account_chainId(this.__wbg_ptr);
                var ptr1 = ret[0];
                var len1 = ret[1];
                if (ret[3]) {
                    ptr1 = 0; len1 = 0;
                    throw takeFromExternrefTable0(ret[2]);
                }
                deferred2_0 = ptr1;
                deferred2_1 = len1;
                return getStringFromWasm0(ptr1, len1);
            } finally {
                wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
            }
        }
        /**
         * Sets the block ID for subsequent operations
         *
         * # Parameters
         * * `block_id` - Block ID as hex string
         *
         * # Returns
         * Result containing unit or error
         * @param {string} block_id
         */
        setBlockId(block_id) {
            const ptr0 = passStringToWasm0(block_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.account_setBlockId(this.__wbg_ptr, ptr0, len0);
            if (ret[1]) {
                throw takeFromExternrefTable0(ret[0]);
            }
        }
        /**
         * Executes a raw transaction
         *
         * # Parameters
         * * `calldata` - Array of contract calls to execute
         *
         * # Returns
         * Result containing transaction hash as hex string or error
         * @param {(Call)[]} calldata
         * @returns {Promise<string>}
         */
        executeRaw(calldata) {
            const ptr0 = passArrayJsValueToWasm0(calldata, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.account_executeRaw(this.__wbg_ptr, ptr0, len0);
            return ret;
        }
        /**
         * Deploys a burner wallet
         *
         * # Parameters
         * * `private_key` - Private key for the burner wallet as hex string
         *
         * # Returns
         * Result containing new Account instance or error
         * @param {string} private_key
         * @returns {Promise<Account>}
         */
        deployBurner(private_key) {
            const ptr0 = passStringToWasm0(private_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.account_deployBurner(this.__wbg_ptr, ptr0, len0);
            return ret;
        }
        /**
         * Gets the current nonce for the account
         *
         * # Returns
         * Result containing nonce as hex string or error
         * @returns {Promise<string>}
         */
        nonce() {
            const ret = wasm.account_nonce(this.__wbg_ptr);
            return ret;
        }
    }
    __exports.Account = Account;

    const ClientConfigFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_clientconfig_free(ptr >>> 0, 1));

    class ClientConfig {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ClientConfigFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_clientconfig_free(ptr, 0);
        }
        /**
         * @param {string} torii_url
         * @param {string} relay_url
         * @param {string} world_address
         */
        constructor(torii_url, relay_url, world_address) {
            const ptr0 = passStringToWasm0(torii_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(relay_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(world_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            const ret = wasm.clientconfig_new(ptr0, len0, ptr1, len1, ptr2, len2);
            return ret;
        }
    }
    __exports.ClientConfig = ClientConfig;

    const ControllerAccountFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_controlleraccount_free(ptr >>> 0, 1));

    class ControllerAccount {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ControllerAccountFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_controlleraccount_free(ptr, 0);
        }
    }
    __exports.ControllerAccount = ControllerAccount;

    const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));

    class IntoUnderlyingByteSource {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            IntoUnderlyingByteSourceFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
        }
        /**
         * @returns {ReadableStreamType}
         */
        get type() {
            const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
            return __wbindgen_enum_ReadableStreamType[ret];
        }
        /**
         * @returns {number}
         */
        get autoAllocateChunkSize() {
            const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @param {ReadableByteStreamController} controller
         */
        start(controller) {
            wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
        }
        /**
         * @param {ReadableByteStreamController} controller
         * @returns {Promise<any>}
         */
        pull(controller) {
            const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
            return ret;
        }
        cancel() {
            const ptr = this.__destroy_into_raw();
            wasm.intounderlyingbytesource_cancel(ptr);
        }
    }
    __exports.IntoUnderlyingByteSource = IntoUnderlyingByteSource;

    const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));

    class IntoUnderlyingSink {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            IntoUnderlyingSinkFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_intounderlyingsink_free(ptr, 0);
        }
        /**
         * @param {any} chunk
         * @returns {Promise<any>}
         */
        write(chunk) {
            const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
            return ret;
        }
        /**
         * @returns {Promise<any>}
         */
        close() {
            const ptr = this.__destroy_into_raw();
            const ret = wasm.intounderlyingsink_close(ptr);
            return ret;
        }
        /**
         * @param {any} reason
         * @returns {Promise<any>}
         */
        abort(reason) {
            const ptr = this.__destroy_into_raw();
            const ret = wasm.intounderlyingsink_abort(ptr, reason);
            return ret;
        }
    }
    __exports.IntoUnderlyingSink = IntoUnderlyingSink;

    const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));

    class IntoUnderlyingSource {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            IntoUnderlyingSourceFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_intounderlyingsource_free(ptr, 0);
        }
        /**
         * @param {ReadableStreamDefaultController} controller
         * @returns {Promise<any>}
         */
        pull(controller) {
            const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
            return ret;
        }
        cancel() {
            const ptr = this.__destroy_into_raw();
            wasm.intounderlyingsource_cancel(ptr);
        }
    }
    __exports.IntoUnderlyingSource = IntoUnderlyingSource;

    const ProviderFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_provider_free(ptr >>> 0, 1));

    class Provider {

        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(Provider.prototype);
            obj.__wbg_ptr = ptr;
            ProviderFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ProviderFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_provider_free(ptr, 0);
        }
        /**
         * Creates a new account instance with the given private key and address
         *
         * # Parameters
         * * `private_key` - Private key as hex string
         * * `address` - Account address as hex string
         *
         * # Returns
         * Result containing Account instance or error
         * @param {string} private_key
         * @param {string} address
         * @returns {Promise<Account>}
         */
        createAccount(private_key, address) {
            const ptr0 = passStringToWasm0(private_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.provider_createAccount(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            return ret;
        }
        /**
         * Calls a Starknet contract view function
         *
         * # Parameters
         * * `call` - Call parameters including contract address and function
         * * `block_id` - Block identifier for the call
         *
         * # Returns
         * Result containing array of field elements or error
         * @param {Call} call
         * @param {BlockId} block_id
         * @returns {Promise<Array<any>>}
         */
        call(call, block_id) {
            const ret = wasm.provider_call(this.__wbg_ptr, call, block_id);
            return ret;
        }
        /**
         * Waits for a transaction to be confirmed
         *
         * # Parameters
         * * `txn_hash` - Transaction hash as hex string
         *
         * # Returns
         * Result containing success boolean or error
         * @param {string} txn_hash
         * @returns {Promise<boolean>}
         */
        waitForTransaction(txn_hash) {
            const ptr0 = passStringToWasm0(txn_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.provider_waitForTransaction(this.__wbg_ptr, ptr0, len0);
            return ret;
        }
    }
    __exports.Provider = Provider;

    const SubscriptionFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_subscription_free(ptr >>> 0, 1));

    class Subscription {

        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(Subscription.prototype);
            obj.__wbg_ptr = ptr;
            SubscriptionFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            SubscriptionFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_subscription_free(ptr, 0);
        }
        /**
         * Cancels an active subscription
         */
        cancel() {
            const ptr = this.__destroy_into_raw();
            wasm.subscription_cancel(ptr);
        }
    }
    __exports.Subscription = Subscription;

    const ToriiClientFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_toriiclient_free(ptr >>> 0, 1));

    class ToriiClient {

        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(ToriiClient.prototype);
            obj.__wbg_ptr = ptr;
            ToriiClientFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ToriiClientFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_toriiclient_free(ptr, 0);
        }
        /**
         * Gets controllers along with their usernames for the given contract addresses
         *
         * # Parameters
         * * `contract_addresses` - Array of contract addresses as hex strings. If empty, all
         *   controllers will be returned.
         *
         * # Returns
         * Result containing controllers or error
         * @param {(string)[]} contract_addresses
         * @returns {Promise<Controllers>}
         */
        getControllers(contract_addresses) {
            const ptr0 = passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_getControllers(this.__wbg_ptr, ptr0, len0);
            return ret;
        }
        /**
         * Gets token information for the given contract addresses
         *
         * # Parameters
         * * `contract_addresses` - Array of contract addresses as hex strings
         *
         * # Returns
         * Result containing token information or error
         * @param {(string)[]} contract_addresses
         * @param {(WasmU256)[]} token_ids
         * @returns {Promise<Tokens>}
         */
        getTokens(contract_addresses, token_ids) {
            const ptr0 = passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_getTokens(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            return ret;
        }
        /**
         * Subscribes to token updates
         *
         * # Parameters
         * * `contract_addresses` - Array of contract addresses as hex strings
         * * `callback` - JavaScript function to call on updates
         *
         * # Returns
         * Result containing subscription handle or error
         * @param {(string)[]} contract_addresses
         * @param {(WasmU256)[]} token_ids
         * @param {Function} callback
         * @returns {Subscription}
         */
        onTokenUpdated(contract_addresses, token_ids, callback) {
            const ptr0 = passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onTokenUpdated(this.__wbg_ptr, ptr0, len0, ptr1, len1, callback);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return Subscription.__wrap(ret[0]);
        }
        /**
         * Gets token balances for given accounts and contracts
         *
         * # Parameters
         * * `contract_addresses` - Array of contract addresses as hex strings
         * * `account_addresses` - Array of account addresses as hex strings
         *
         * # Returns
         * Result containing token balances or error
         * @param {(string)[]} contract_addresses
         * @param {(string)[]} account_addresses
         * @param {(WasmU256)[]} token_ids
         * @returns {Promise<TokenBalances>}
         */
        getTokenBalances(contract_addresses, account_addresses, token_ids) {
            const ptr0 = passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayJsValueToWasm0(account_addresses, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            const len2 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_getTokenBalances(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
            return ret;
        }
        /**
         * Queries entities based on the provided query parameters
         *
         * # Parameters
         * * `query` - Query parameters for filtering entities
         *
         * # Returns
         * Result containing matching entities or error
         * @param {Query} query
         * @param {boolean} historical
         * @returns {Promise<Entities>}
         */
        getEntities(query, historical) {
            const ret = wasm.toriiclient_getEntities(this.__wbg_ptr, query, historical);
            return ret;
        }
        /**
         * Gets all entities with pagination
         *
         * # Parameters
         * * `limit` - Maximum number of entities to return
         * * `offset` - Number of entities to skip
         *
         * # Returns
         * Result containing paginated entities or error
         * @param {number} limit
         * @param {number} offset
         * @param {boolean} historical
         * @returns {Promise<Entities>}
         */
        getAllEntities(limit, offset, historical) {
            const ret = wasm.toriiclient_getAllEntities(this.__wbg_ptr, limit, offset, historical);
            return ret;
        }
        /**
         * Gets event messages based on query parameters
         *
         * # Parameters
         * * `query` - Query parameters for filtering messages
         * * `historical` - Whether to include historical messages
         *
         * # Returns
         * Result containing matching event messages or error
         * @param {Query} query
         * @param {boolean} historical
         * @returns {Promise<Entities>}
         */
        getEventMessages(query, historical) {
            const ret = wasm.toriiclient_getEventMessages(this.__wbg_ptr, query, historical);
            return ret;
        }
        /**
         * Subscribes to entity updates
         *
         * # Parameters
         * * `clauses` - Array of key clauses for filtering updates
         * * `callback` - JavaScript function to call on updates
         *
         * # Returns
         * Result containing subscription handle or error
         * @param {(EntityKeysClause)[]} clauses
         * @param {Function} callback
         * @returns {Subscription}
         */
        onEntityUpdated(clauses, callback) {
            const ptr0 = passArrayJsValueToWasm0(clauses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onEntityUpdated(this.__wbg_ptr, ptr0, len0, callback);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return Subscription.__wrap(ret[0]);
        }
        /**
         * Updates an existing entity subscription
         *
         * # Parameters
         * * `subscription` - Existing subscription to update
         * * `clauses` - New array of key clauses for filtering
         *
         * # Returns
         * Result containing unit or error
         * @param {Subscription} subscription
         * @param {(EntityKeysClause)[]} clauses
         * @returns {Promise<void>}
         */
        updateEntitySubscription(subscription, clauses) {
            _assertClass(subscription, Subscription);
            const ptr0 = passArrayJsValueToWasm0(clauses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_updateEntitySubscription(this.__wbg_ptr, subscription.__wbg_ptr, ptr0, len0);
            return ret;
        }
        /**
         * Subscribes to event message updates
         *
         * # Parameters
         * * `clauses` - Array of key clauses for filtering updates
         * * `callback` - JavaScript function to call on updates
         *
         * # Returns
         * Result containing subscription handle or error
         * @param {(EntityKeysClause)[]} clauses
         * @param {Function} callback
         * @returns {Subscription}
         */
        onEventMessageUpdated(clauses, callback) {
            const ptr0 = passArrayJsValueToWasm0(clauses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onEventMessageUpdated(this.__wbg_ptr, ptr0, len0, callback);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return Subscription.__wrap(ret[0]);
        }
        /**
         * Updates an existing event message subscription
         *
         * # Parameters
         * * `subscription` - Existing subscription to update
         * * `clauses` - New array of key clauses for filtering
         *
         * # Returns
         * Result containing unit or error
         * @param {Subscription} subscription
         * @param {(EntityKeysClause)[]} clauses
         * @returns {Promise<void>}
         */
        updateEventMessageSubscription(subscription, clauses) {
            _assertClass(subscription, Subscription);
            const ptr0 = passArrayJsValueToWasm0(clauses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_updateEventMessageSubscription(this.__wbg_ptr, subscription.__wbg_ptr, ptr0, len0);
            return ret;
        }
        /**
         * Subscribes to Starknet events
         *
         * # Parameters
         * * `clauses` - Array of key clauses for filtering events
         * * `callback` - JavaScript function to call on events
         *
         * # Returns
         * Result containing subscription handle or error
         * @param {(EntityKeysClause)[]} clauses
         * @param {Function} callback
         * @returns {Subscription}
         */
        onStarknetEvent(clauses, callback) {
            const ptr0 = passArrayJsValueToWasm0(clauses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onStarknetEvent(this.__wbg_ptr, ptr0, len0, callback);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return Subscription.__wrap(ret[0]);
        }
        /**
         * Subscribes to indexer updates
         *
         * # Parameters
         * * `contract_address` - Optional contract address to filter updates
         * * `callback` - JavaScript function to call on updates
         *
         * # Returns
         * Result containing subscription handle or error
         * @param {string | undefined} contract_address
         * @param {Function} callback
         * @returns {Subscription}
         */
        onIndexerUpdated(contract_address, callback) {
            var ptr0 = isLikeNone(contract_address) ? 0 : passStringToWasm0(contract_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onIndexerUpdated(this.__wbg_ptr, ptr0, len0, callback);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return Subscription.__wrap(ret[0]);
        }
        /**
         * Subscribes to token balance updates
         *
         * # Parameters
         * * `contract_addresses` - Array of contract addresses to filter (empty for all)
         * * `account_addresses` - Array of account addresses to filter (empty for all)
         * * `callback` - JavaScript function to call on updates
         *
         * # Returns
         * Result containing subscription handle or error
         * @param {(string)[]} contract_addresses
         * @param {(string)[]} account_addresses
         * @param {(WasmU256)[]} token_ids
         * @param {Function} callback
         * @returns {Subscription}
         */
        onTokenBalanceUpdated(contract_addresses, account_addresses, token_ids, callback) {
            const ptr0 = passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayJsValueToWasm0(account_addresses, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            const len2 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onTokenBalanceUpdated(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, callback);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return Subscription.__wrap(ret[0]);
        }
        /**
         * Updates an existing token balance subscription
         *
         * # Parameters
         * * `subscription` - Existing subscription to update
         * * `contract_addresses` - New array of contract addresses to filter
         * * `account_addresses` - New array of account addresses to filter
         *
         * # Returns
         * Result containing unit or error
         * @param {Subscription} subscription
         * @param {(string)[]} contract_addresses
         * @param {(string)[]} account_addresses
         * @param {(WasmU256)[]} token_ids
         * @returns {Promise<void>}
         */
        updateTokenBalanceSubscription(subscription, contract_addresses, account_addresses, token_ids) {
            _assertClass(subscription, Subscription);
            const ptr0 = passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayJsValueToWasm0(account_addresses, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            const len2 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_updateTokenBalanceSubscription(this.__wbg_ptr, subscription.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
            return ret;
        }
        /**
         * Publishes a message to the network
         *
         * # Parameters
         * * `message` - Message to publish as JSON string
         * * `signature` - Array of signature field elements as hex strings
         *
         * # Returns
         * Result containing message ID as byte array or error
         * @param {string} message
         * @param {(string)[]} signature
         * @returns {Promise<Uint8Array>}
         */
        publishMessage(message, signature) {
            const ptr0 = passStringToWasm0(message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayJsValueToWasm0(signature, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_publishMessage(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            return ret;
        }
    }
    __exports.ToriiClient = ToriiClient;

    async function __wbg_load(module, imports) {
        if (typeof Response === 'function' && module instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                try {
                    return await WebAssembly.instantiateStreaming(module, imports);

                } catch (e) {
                    if (module.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                    } else {
                        throw e;
                    }
                }
            }

            const bytes = await module.arrayBuffer();
            return await WebAssembly.instantiate(bytes, imports);

        } else {
            const instance = await WebAssembly.instantiate(module, imports);

            if (instance instanceof WebAssembly.Instance) {
                return { instance, module };

            } else {
                return instance;
            }
        }
    }

    function __wbg_get_imports() {
        const imports = {};
        imports.wbg = {};
        imports.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_WorkerGlobalScope_4cdac01f57bb97d1 = function(arg0) {
            const ret = arg0.WorkerGlobalScope;
            return ret;
        };
        imports.wbg.__wbg_abort_19de2f828ee0874a = function(arg0) {
            arg0.abort();
        };
        imports.wbg.__wbg_account_new = function(arg0) {
            const ret = Account.__wrap(arg0);
            return ret;
        };
        imports.wbg.__wbg_append_daea8d1dbe91d314 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments) };
        imports.wbg.__wbg_body_b5c1c38bbbabe863 = function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_buffer_6e1d53ff183194fc = function(arg0) {
            const ret = arg0.buffer;
            return ret;
        };
        imports.wbg.__wbg_buffer_ffdeb2ee67420f9e = function(arg0) {
            const ret = arg0.buffer;
            return ret;
        };
        imports.wbg.__wbg_bufferedAmount_3ce05e34eba94344 = function(arg0) {
            const ret = arg0.bufferedAmount;
            return ret;
        };
        imports.wbg.__wbg_bufferedAmount_ee5f3d464214e678 = function(arg0) {
            const ret = arg0.bufferedAmount;
            return ret;
        };
        imports.wbg.__wbg_byobRequest_abf2b52392debdbf = function(arg0) {
            const ret = arg0.byobRequest;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_byteLength_3c7a1d3824c799bc = function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        };
        imports.wbg.__wbg_byteOffset_a70d5fcb161e681f = function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        };
        imports.wbg.__wbg_call_0411c0c3c424db9a = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_call_3114932863209ca6 = function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_call_326027b375864cc8 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.call(arg1, arg2, arg3);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_cancel_bac01e9c4f33a801 = function(arg0) {
            const ret = arg0.cancel();
            return ret;
        };
        imports.wbg.__wbg_catch_9da7d002aa356f1d = function(arg0, arg1) {
            const ret = arg0.catch(arg1);
            return ret;
        };
        imports.wbg.__wbg_channel_c7673b922cae8ebd = function(arg0) {
            const ret = arg0.channel;
            return ret;
        };
        imports.wbg.__wbg_clearInterval_5bbcdf9491cea345 = function(arg0, arg1) {
            arg0.clearInterval(arg1);
        };
        imports.wbg.__wbg_clearInterval_b4e165e64357b104 = function(arg0, arg1) {
            arg0.clearInterval(arg1);
        };
        imports.wbg.__wbg_clearTimeout_5a54f8841c30079a = function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        };
        imports.wbg.__wbg_clearTimeout_96804de0ab838f26 = function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        };
        imports.wbg.__wbg_close_12c7fd3fdec126e6 = function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments) };
        imports.wbg.__wbg_close_390354f70a3f15a7 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.close(arg1, getStringFromWasm0(arg2, arg3));
        }, arguments) };
        imports.wbg.__wbg_close_dc1db87296f49895 = function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments) };
        imports.wbg.__wbg_close_df466f42f1b99ed6 = function(arg0) {
            arg0.close();
        };
        imports.wbg.__wbg_createDataChannel_561e3fbf4e6e923b = function(arg0, arg1, arg2) {
            const ret = arg0.createDataChannel(getStringFromWasm0(arg1, arg2));
            return ret;
        };
        imports.wbg.__wbg_createDataChannel_d6ae1b920a43bd2a = function(arg0, arg1, arg2, arg3) {
            const ret = arg0.createDataChannel(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        };
        imports.wbg.__wbg_createOffer_0c57279991063850 = function(arg0) {
            const ret = arg0.createOffer();
            return ret;
        };
        imports.wbg.__wbg_crypto_ed58b8e10a292839 = function(arg0) {
            const ret = arg0.crypto;
            return ret;
        };
        imports.wbg.__wbg_data_6f313bee9ecc3082 = function(arg0) {
            const ret = arg0.data;
            return ret;
        };
        imports.wbg.__wbg_document_c488ca7509cc6938 = function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_done_adfd3f40364def50 = function(arg0) {
            const ret = arg0.done;
            return ret;
        };
        imports.wbg.__wbg_enqueue_f8729596ff44cd84 = function() { return handleError(function (arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments) };
        imports.wbg.__wbg_entries_ce82e236f8300a53 = function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        };
        imports.wbg.__wbg_fetch_2367a4a7762e7c4a = function(arg0, arg1) {
            const ret = arg0.fetch(arg1);
            return ret;
        };
        imports.wbg.__wbg_fetch_3079ee47bab2b144 = function(arg0, arg1) {
            const ret = fetch(arg0, arg1);
            return ret;
        };
        imports.wbg.__wbg_fetch_7a1c041adecfa541 = function(arg0, arg1, arg2) {
            const ret = arg0.fetch(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_fetch_f1856afdb49415d1 = function(arg0) {
            const ret = fetch(arg0);
            return ret;
        };
        imports.wbg.__wbg_generateCertificate_1f88e0545dbba642 = function() { return handleError(function (arg0) {
            const ret = RTCPeerConnection.generateCertificate(arg0);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments) };
        imports.wbg.__wbg_getReader_48e00749fe3f6089 = function() { return handleError(function (arg0) {
            const ret = arg0.getReader();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_get_68aa371864aa301a = function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        };
        imports.wbg.__wbg_get_92a4780a3beb5fe9 = function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_getdone_59fffbeb89db6293 = function(arg0) {
            const ret = arg0.done;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        };
        imports.wbg.__wbg_getvalue_55d5c7ba9ea0358e = function(arg0) {
            const ret = arg0.value;
            return ret;
        };
        imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        };
        imports.wbg.__wbg_globalThis_1e2ac1d6eee845b3 = function() { return handleError(function () {
            const ret = globalThis.globalThis;
            return ret;
        }, arguments) };
        imports.wbg.__wbg_global_f25a574ae080367c = function() { return handleError(function () {
            const ret = global.global;
            return ret;
        }, arguments) };
        imports.wbg.__wbg_has_38b228962f492b9b = function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_headers_a5edfea2425875b2 = function(arg0) {
            const ret = arg0.headers;
            return ret;
        };
        imports.wbg.__wbg_hostname_dce7b3f0f39588c4 = function() { return handleError(function (arg0, arg1) {
            const ret = arg1.hostname;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments) };
        imports.wbg.__wbg_instanceof_ArrayBuffer_435fcead703e2827 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Error_5c7749b0124e9db4 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Error;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Response_0ec26bd2f8a75ca2 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Uint8Array_9b67296cab48238f = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Window_a959820eb267fe22 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_isArray_fcd559a3bcfde1e9 = function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        };
        imports.wbg.__wbg_isSafeInteger_4de146aa53f6e470 = function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        };
        imports.wbg.__wbg_iterator_7a20c20ce22add0f = function() {
            const ret = Symbol.iterator;
            return ret;
        };
        imports.wbg.__wbg_length_2e63ba34c4121df5 = function(arg0) {
            const ret = arg0.length;
            return ret;
        };
        imports.wbg.__wbg_length_e74df4881604f1d9 = function(arg0) {
            const ret = arg0.length;
            return ret;
        };
        imports.wbg.__wbg_localDescription_b9d4e2db14efab5a = function(arg0) {
            const ret = arg0.localDescription;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_location_f188a2c8e79bff74 = function(arg0) {
            const ret = arg0.location;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        };
        imports.wbg.__wbg_navigator_da495c9e52e160b1 = function(arg0) {
            const ret = arg0.navigator;
            return ret;
        };
        imports.wbg.__wbg_new_076cac58bb698dd4 = function() {
            const ret = new Object();
            return ret;
        };
        imports.wbg.__wbg_new_0c28e72025e00594 = function() {
            const ret = new Array();
            return ret;
        };
        imports.wbg.__wbg_new_1e8ca58d170d6ad0 = function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_396(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = state0.b = 0;
            }
        };
        imports.wbg.__wbg_new_23362fa370a0a372 = function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        };
        imports.wbg.__wbg_new_3f616ed16821b4c5 = function() {
            const ret = new Map();
            return ret;
        };
        imports.wbg.__wbg_new_4d81617a04bc1b5b = function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_new_789d26a8cd0beaf6 = function() { return handleError(function (arg0, arg1) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments) };
        imports.wbg.__wbg_new_93cf40e4f48fe902 = function() { return handleError(function () {
            const ret = new AbortController();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_new_e2ec18a02bb844cb = function() { return handleError(function () {
            const ret = new Headers();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_newnoargs_19a249f4eceaaac3 = function(arg0, arg1) {
            const ret = new Function(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_newwithbyteoffsetandlength_ee8def7000b7b2be = function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_newwithconfiguration_3dff10acdaf443a1 = function() { return handleError(function (arg0) {
            const ret = new RTCPeerConnection(arg0);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_newwithlength_91de49dea5643c87 = function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_newwithstrandinit_ee1418802d8d481c = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_next_c591766a7286b02a = function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_next_f387ecc56a94ba00 = function(arg0) {
            const ret = arg0.next;
            return ret;
        };
        imports.wbg.__wbg_node_02999533c4ea02e3 = function(arg0) {
            const ret = arg0.node;
            return ret;
        };
        imports.wbg.__wbg_now_2c95c9de01293173 = function(arg0) {
            const ret = arg0.now();
            return ret;
        };
        imports.wbg.__wbg_now_5b0cbad8de553ec4 = function(arg0) {
            const ret = arg0.now();
            return ret;
        };
        imports.wbg.__wbg_now_5cf792f3426feb88 = function() {
            const ret = Date.now();
            return ret;
        };
        imports.wbg.__wbg_performance_7a3ffd0b17f663ad = function(arg0) {
            const ret = arg0.performance;
            return ret;
        };
        imports.wbg.__wbg_process_5c1d670bc53614b8 = function(arg0) {
            const ret = arg0.process;
            return ret;
        };
        imports.wbg.__wbg_push_3e9ce81246ef1d1b = function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        };
        imports.wbg.__wbg_queueMicrotask_3d422e1ba49c2500 = function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        };
        imports.wbg.__wbg_queueMicrotask_f301663ccadbb7d0 = function(arg0) {
            queueMicrotask(arg0);
        };
        imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments) };
        imports.wbg.__wbg_read_861538b94ca97320 = function(arg0) {
            const ret = arg0.read();
            return ret;
        };
        imports.wbg.__wbg_readyState_1155934e711e0ee2 = function(arg0) {
            const ret = arg0.readyState;
            return (__wbindgen_enum_RtcDataChannelState.indexOf(ret) + 1 || 5) - 1;
        };
        imports.wbg.__wbg_readyState_bb59e8f3ca88bf33 = function(arg0) {
            const ret = arg0.readyState;
            return ret;
        };
        imports.wbg.__wbg_releaseLock_2070d41a0dbbceef = function(arg0) {
            arg0.releaseLock();
        };
        imports.wbg.__wbg_require_79b1e9274cde3c87 = function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments) };
        imports.wbg.__wbg_resolve_6a311e8bb26423ab = function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        };
        imports.wbg.__wbg_respond_4a3be1265da3b14c = function() { return handleError(function (arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments) };
        imports.wbg.__wbg_sdp_2383bb0e4433b368 = function(arg0, arg1) {
            const ret = arg1.sdp;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_self_ac4343e4047b83cc = function() { return handleError(function () {
            const ret = self.self;
            return ret;
        }, arguments) };
        imports.wbg.__wbg_send_14e34a9aad9fca36 = function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getArrayU8FromWasm0(arg1, arg2));
        }, arguments) };
        imports.wbg.__wbg_send_c7dc9a93fb67d64a = function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getArrayU8FromWasm0(arg1, arg2));
        }, arguments) };
        imports.wbg.__wbg_setInterval_ee98dc1e6d169e47 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, ...arg3);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_setInterval_fff3494d956a67e1 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, ...arg3);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_setLocalDescription_9e2c69509663ee2c = function(arg0, arg1) {
            const ret = arg0.setLocalDescription(arg1);
            return ret;
        };
        imports.wbg.__wbg_setRemoteDescription_ef2a7ac209e8e526 = function(arg0, arg1) {
            const ret = arg0.setRemoteDescription(arg1);
            return ret;
        };
        imports.wbg.__wbg_setTimeout_db2dbaeefb6f39c7 = function() { return handleError(function (arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_setTimeout_eefe7f4c234b0c6b = function() { return handleError(function (arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_set_1d975b42d95fd6c6 = function(arg0, arg1, arg2) {
            const ret = arg0.set(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        };
        imports.wbg.__wbg_set_421385e996a16e02 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_set_7b70226104a82921 = function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        };
        imports.wbg.__wbg_set_a1fb6291729caffb = function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        };
        imports.wbg.__wbg_setbinaryType_852841feb0d9e646 = function(arg0, arg1) {
            arg0.binaryType = __wbindgen_enum_RtcDataChannelType[arg1];
        };
        imports.wbg.__wbg_setbinaryType_a14c2d713cda3a76 = function(arg0, arg1) {
            arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
        };
        imports.wbg.__wbg_setbody_a548052400c35526 = function(arg0, arg1) {
            arg0.body = arg1;
        };
        imports.wbg.__wbg_setbufferedAmountLowThreshold_3512cb183284f481 = function(arg0, arg1) {
            arg0.bufferedAmountLowThreshold = arg1 >>> 0;
        };
        imports.wbg.__wbg_setcache_f30c14a4770df5d6 = function(arg0, arg1) {
            arg0.cache = __wbindgen_enum_RequestCache[arg1];
        };
        imports.wbg.__wbg_setcertificates_6b767b68c6b0a506 = function(arg0, arg1) {
            arg0.certificates = arg1;
        };
        imports.wbg.__wbg_setcredentials_6ae5f65d7ad22ffc = function(arg0, arg1) {
            arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
        };
        imports.wbg.__wbg_setheaders_1f2d4c08004f4227 = function(arg0, arg1) {
            arg0.headers = arg1;
        };
        imports.wbg.__wbg_setid_f473b9c0eef5c53c = function(arg0, arg1) {
            arg0.id = arg1;
        };
        imports.wbg.__wbg_setintegrity_22548f7449e65a0d = function(arg0, arg1, arg2) {
            arg0.integrity = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setmethod_c704d56d480d8580 = function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setmode_26f3e7a9f55ddb2d = function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_RequestMode[arg1];
        };
        imports.wbg.__wbg_setnegotiated_0b236383e1c1faf3 = function(arg0, arg1) {
            arg0.negotiated = arg1 !== 0;
        };
        imports.wbg.__wbg_setonbufferedamountlow_4622e0c786988971 = function(arg0, arg1) {
            arg0.onbufferedamountlow = arg1;
        };
        imports.wbg.__wbg_setonclose_56cab8b0dca39584 = function(arg0, arg1) {
            arg0.onclose = arg1;
        };
        imports.wbg.__wbg_setonclose_d97409711303b675 = function(arg0, arg1) {
            arg0.onclose = arg1;
        };
        imports.wbg.__wbg_setondatachannel_0a161f0d3eef5351 = function(arg0, arg1) {
            arg0.ondatachannel = arg1;
        };
        imports.wbg.__wbg_setonerror_b89f06e280aad698 = function(arg0, arg1) {
            arg0.onerror = arg1;
        };
        imports.wbg.__wbg_setonmessage_0096de047fd76d58 = function(arg0, arg1) {
            arg0.onmessage = arg1;
        };
        imports.wbg.__wbg_setonmessage_64d739bfb6ddb3a0 = function(arg0, arg1) {
            arg0.onmessage = arg1;
        };
        imports.wbg.__wbg_setonopen_027cab001d09f6a8 = function(arg0, arg1) {
            arg0.onopen = arg1;
        };
        imports.wbg.__wbg_setonopen_6c6165ad0e263db7 = function(arg0, arg1) {
            arg0.onopen = arg1;
        };
        imports.wbg.__wbg_setredirect_a876aa887f1b4e2f = function(arg0, arg1) {
            arg0.redirect = __wbindgen_enum_RequestRedirect[arg1];
        };
        imports.wbg.__wbg_setreferrer_acd03e3fa2e740c0 = function(arg0, arg1, arg2) {
            arg0.referrer = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setreferrerpolicy_4069bb580566f922 = function(arg0, arg1) {
            arg0.referrerPolicy = __wbindgen_enum_ReferrerPolicy[arg1];
        };
        imports.wbg.__wbg_setsdp_8c1ecf691fdb2777 = function(arg0, arg1, arg2) {
            arg0.sdp = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setsignal_de26efe32c2e413d = function(arg0, arg1) {
            arg0.signal = arg1;
        };
        imports.wbg.__wbg_settype_99b4982cabf87c2d = function(arg0, arg1) {
            arg0.type = __wbindgen_enum_RtcSdpType[arg1];
        };
        imports.wbg.__wbg_signal_fd2d6d0644f16ad8 = function(arg0) {
            const ret = arg0.signal;
            return ret;
        };
        imports.wbg.__wbg_status_5f9868b7ed8dd175 = function(arg0) {
            const ret = arg0.status;
            return ret;
        };
        imports.wbg.__wbg_stringify_f5476f15b5654a07 = function() { return handleError(function (arg0) {
            const ret = JSON.stringify(arg0);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_subarray_b4e9772c34a7f5ba = function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_text_693c6c8a197588c7 = function() { return handleError(function (arg0) {
            const ret = arg0.text();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_then_5c6469c1e1da9e59 = function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        };
        imports.wbg.__wbg_then_faeb8aed8c1629b7 = function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_toString_4ee42c50d3399a53 = function(arg0) {
            const ret = arg0.toString();
            return ret;
        };
        imports.wbg.__wbg_toString_de21a47cfd5e84a2 = function(arg0) {
            const ret = arg0.toString();
            return ret;
        };
        imports.wbg.__wbg_toriiclient_new = function(arg0) {
            const ret = ToriiClient.__wrap(arg0);
            return ret;
        };
        imports.wbg.__wbg_url_ba6c16bbafb59895 = function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_userAgent_bfd54e5c60738678 = function() { return handleError(function (arg0, arg1) {
            const ret = arg1.userAgent;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments) };
        imports.wbg.__wbg_value_30db1d77772f3236 = function(arg0) {
            const ret = arg0.value;
            return ret;
        };
        imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function(arg0) {
            const ret = arg0.versions;
            return ret;
        };
        imports.wbg.__wbg_view_6bb52da916e0c6a9 = function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_window_1a23defd102c72f4 = function() { return handleError(function () {
            const ret = window.window;
            return ret;
        }, arguments) };
        imports.wbg.__wbindgen_as_number = function(arg0) {
            const ret = +arg0;
            return ret;
        };
        imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
            const ret = arg0;
            return ret;
        };
        imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        };
        imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        };
        imports.wbg.__wbindgen_boolean_get = function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
            return ret;
        };
        imports.wbg.__wbindgen_cb_drop = function(arg0) {
            const obj = arg0.original;
            if (obj.cnt-- == 1) {
                obj.a = 0;
                return true;
            }
            const ret = false;
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper1977 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 655, __wbg_adapter_52);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper2864 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1031, __wbg_adapter_55);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper2865 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1031, __wbg_adapter_55);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper2866 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1031, __wbg_adapter_55);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper2908 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1056, __wbg_adapter_62);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper2909 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1056, __wbg_adapter_62);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper2910 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1056, __wbg_adapter_62);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper4578 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1733, __wbg_adapter_69);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper5885 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 2304, __wbg_adapter_72);
            return ret;
        };
        imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbindgen_in = function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        };
        imports.wbg.__wbindgen_init_externref_table = function() {
            const table = wasm.__wbindgen_export_4;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
            ;
        };
        imports.wbg.__wbindgen_is_bigint = function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        };
        imports.wbg.__wbindgen_is_function = function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        };
        imports.wbg.__wbindgen_is_object = function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        };
        imports.wbg.__wbindgen_is_string = function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        };
        imports.wbg.__wbindgen_is_undefined = function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        };
        imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        };
        imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        };
        imports.wbg.__wbindgen_memory = function() {
            const ret = wasm.memory;
            return ret;
        };
        imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        };
        imports.wbg.__wbindgen_number_new = function(arg0) {
            const ret = arg0;
            return ret;
        };
        imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        };
        imports.wbg.__wbindgen_throw = function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        };

        return imports;
    }

    function __wbg_init_memory(imports, memory) {

    }

    function __wbg_finalize_init(instance, module) {
        wasm = instance.exports;
        __wbg_init.__wbindgen_wasm_module = module;
        cachedDataViewMemory0 = null;
        cachedUint8ArrayMemory0 = null;


        wasm.__wbindgen_start();
        return wasm;
    }

    function initSync(module) {
        if (wasm !== undefined) return wasm;


        if (typeof module !== 'undefined') {
            if (Object.getPrototypeOf(module) === Object.prototype) {
                ({module} = module)
            } else {
                console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
            }
        }

        const imports = __wbg_get_imports();

        __wbg_init_memory(imports);

        if (!(module instanceof WebAssembly.Module)) {
            module = new WebAssembly.Module(module);
        }

        const instance = new WebAssembly.Instance(module, imports);

        return __wbg_finalize_init(instance, module);
    }

    async function __wbg_init(module_or_path) {
        if (wasm !== undefined) return wasm;


        if (typeof module_or_path !== 'undefined') {
            if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
                ({module_or_path} = module_or_path)
            } else {
                console.warn('using deprecated parameters for the initialization function; pass a single object instead')
            }
        }

        if (typeof module_or_path === 'undefined' && typeof script_src !== 'undefined') {
            module_or_path = script_src.replace(/\.js$/, '_bg.wasm');
        }
        const imports = __wbg_get_imports();

        if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
            module_or_path = fetch(module_or_path);
        }

        __wbg_init_memory(imports);

        const { instance, module } = await __wbg_load(await module_or_path, imports);

        return __wbg_finalize_init(instance, module);
    }

    wasm_bindgen = Object.assign(__wbg_init, { initSync }, __exports);

})();
