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

    function _assertClass(instance, klass) {
        if (!(instance instanceof klass)) {
            throw new Error(`expected instance of ${klass.name}`);
        }
    }

    function passArrayJsValueToWasm0(array, malloc) {
        const ptr = malloc(array.length * 4, 4) >>> 0;
        for (let i = 0; i < array.length; i++) {
            const add = addToExternrefTable0(array[i]);
            getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
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
     * @param {string[]} constructor_calldata
     * @param {string} deployer_address
     * @returns {string}
     */
    __exports.getContractAddress = function(class_hash, salt, constructor_calldata, deployer_address) {
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
            const ret = wasm.getContractAddress(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
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
     * Computes a Poseidon hash of the inputs
     *
     * # Parameters
     * * `inputs` - Array of field elements as hex strings
     *
     * # Returns
     * Result containing hash as hex string or error
     * @param {string[]} inputs
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

    function __wbg_adapter_52(arg0, arg1) {
        wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h25a2d6c0cac360bc(arg0, arg1);
    }

    function __wbg_adapter_55(arg0, arg1, arg2) {
        wasm.closure1136_externref_shim(arg0, arg1, arg2);
    }

    function __wbg_adapter_62(arg0, arg1, arg2) {
        wasm.closure1161_externref_shim(arg0, arg1, arg2);
    }

    function __wbg_adapter_69(arg0, arg1) {
        wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfd0262bcce7a58a4(arg0, arg1);
    }

    function __wbg_adapter_72(arg0, arg1, arg2) {
        wasm.closure2502_externref_shim(arg0, arg1, arg2);
    }

    function __wbg_adapter_436(arg0, arg1, arg2, arg3) {
        wasm.closure2678_externref_shim(arg0, arg1, arg2, arg3);
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
         * Creates a new account instance with the given private key and address
         *
         * # Parameters
         * * `provider` - Provider instance
         * * `private_key` - Private key as hex string
         * * `address` - Account address as hex string
         *
         * # Returns
         * Result containing Account instance or error
         * @param {Provider} provider
         * @param {string} private_key
         * @param {string} address
         */
        constructor(provider, private_key, address) {
            _assertClass(provider, Provider);
            const ptr0 = passStringToWasm0(private_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.account_new(provider.__wbg_ptr, ptr0, len0, ptr1, len1);
            return ret;
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
         * @param {Call[]} calldata
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
        /**
         * Gets the provider of the account
         *
         * # Returns
         * Result containing provider as hex string or error
         * @returns {Provider}
         */
        provider() {
            const ret = wasm.account_provider(this.__wbg_ptr);
            return Provider.__wrap(ret);
        }
    }
    __exports.Account = Account;

    const ByteArrayFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_bytearray_free(ptr >>> 0, 1));

    class ByteArray {

        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(ByteArray.prototype);
            obj.__wbg_ptr = ptr;
            ByteArrayFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ByteArrayFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_bytearray_free(ptr, 0);
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
         */
        constructor(str) {
            const ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.bytearray_new(ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            ByteArrayFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        /**
         * Serializes a Cairo byte array into a vector of field elements as hex strings
         *
         * # Returns
         * Result containing vector of field elements as hex strings or error
         * @returns {string[]}
         */
        toRaw() {
            const ret = wasm.bytearray_toRaw(this.__wbg_ptr);
            if (ret[3]) {
                throw takeFromExternrefTable0(ret[2]);
            }
            var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
            return v1;
        }
        /**
         * Deserializes a Cairo byte array into a string
         *
         * # Parameters
         * * `felts` - Array of field elements as hex strings
         *
         * # Returns
         * Result containing deserialized string or error
         * @param {string[]} felts
         * @returns {ByteArray}
         */
        static fromRaw(felts) {
            const ptr0 = passArrayJsValueToWasm0(felts, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.bytearray_fromRaw(ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ByteArray.__wrap(ret[0]);
        }
        /**
         * Converts a Cairo byte array to a string
         *
         * # Returns
         * Result containing string representation of the byte array or error
         * @returns {string}
         */
        toString() {
            let deferred2_0;
            let deferred2_1;
            try {
                const ret = wasm.bytearray_toString(this.__wbg_ptr);
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
    }
    __exports.ByteArray = ByteArray;

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
         * Creates a new Starknet provider instance for a given RPC URL
         *
         * # Parameters
         * * `rpc_url` - URL of the RPC endpoint
         *
         * # Returns
         * Result containing Provider instance or error
         * @param {string} rpc_url
         */
        constructor(rpc_url) {
            const ptr0 = passStringToWasm0(rpc_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.provider_new(ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            ProviderFinalization.register(this, this.__wbg_ptr, this);
            return this;
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
        /**
         * Gets the chain id of the provider
         *
         * # Returns
         * Result containing chain id as hex string or error
         * @returns {Promise<string>}
         */
        chainId() {
            const ret = wasm.provider_chainId(this.__wbg_ptr);
            return ret;
        }
    }
    __exports.Provider = Provider;

    const SigningKeyFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_signingkey_free(ptr >>> 0, 1));

    class SigningKey {

        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(SigningKey.prototype);
            obj.__wbg_ptr = ptr;
            SigningKeyFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            SigningKeyFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_signingkey_free(ptr, 0);
        }
        /**
         * Generates a new random signing key
         *
         * # Returns
         * Private key as hex string
         * @param {string} secret_scalar
         */
        constructor(secret_scalar) {
            const ptr0 = passStringToWasm0(secret_scalar, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.signingkey_new(ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            SigningKeyFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        /**
         * Initializes a new signing key from a secret scalar
         *
         * # Parameters
         * * `secret_scalar` - Secret scalar as hex string
         *
         * # Returns
         * Result containing signing key or error
         * @returns {SigningKey}
         */
        static fromRandom() {
            const ret = wasm.signingkey_fromRandom();
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return SigningKey.__wrap(ret[0]);
        }
        /**
         * Returns the secret scalar of the signing key
         *
         * # Returns
         * Result containing secret scalar as hex string or error
         * @returns {string}
         */
        secretScalar() {
            let deferred2_0;
            let deferred2_1;
            try {
                const ret = wasm.signingkey_secretScalar(this.__wbg_ptr);
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
         * Signs a message hash with a private key
         *
         * # Parameters
         * * `private_key` - Private key as hex string
         * * `hash` - Message hash as hex string
         *
         * # Returns
         * Result containing signature or error
         * @param {string} hash
         * @returns {Signature}
         */
        sign(hash) {
            const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.signingkey_sign(this.__wbg_ptr, ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        /**
         * Returns the verifying key of the signing key
         *
         * # Returns
         * Result containing verifying key or error
         * @returns {VerifyingKey}
         */
        verifyingKey() {
            const ret = wasm.signingkey_verifyingKey(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return VerifyingKey.__wrap(ret[0]);
        }
    }
    __exports.SigningKey = SigningKey;

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
         * Creates a new Torii client with the given configuration
         *
         * # Parameters
         * * `config` - Client configuration including URLs and world address
         *
         * # Returns
         * Result containing ToriiClient instance or error
         * @param {ClientConfig} config
         */
        constructor(config) {
            const ret = wasm.toriiclient_new(config);
            return ret;
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
         * @param {string[]} contract_addresses
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
         * * `token_ids` - Array of token ids
         * * `limit` - Maximum number of tokens to return
         * * `cursor` - Cursor to start from
         *
         * # Returns
         * Result containing token information or error
         * @param {string[] | null} [contract_addresses]
         * @param {WasmU256[] | null} [token_ids]
         * @param {number | null} [limit]
         * @param {string | null} [cursor]
         * @returns {Promise<Tokens>}
         */
        getTokens(contract_addresses, token_ids, limit, cursor) {
            var ptr0 = isLikeNone(contract_addresses) ? 0 : passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            var ptr1 = isLikeNone(token_ids) ? 0 : passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            var len1 = WASM_VECTOR_LEN;
            var ptr2 = isLikeNone(cursor) ? 0 : passStringToWasm0(cursor, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len2 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_getTokens(this.__wbg_ptr, ptr0, len0, ptr1, len1, isLikeNone(limit) ? 0x100000001 : (limit) >>> 0, ptr2, len2);
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
         * @param {string[] | null | undefined} contract_addresses
         * @param {WasmU256[] | null | undefined} token_ids
         * @param {Function} callback
         * @returns {Subscription}
         */
        onTokenUpdated(contract_addresses, token_ids, callback) {
            var ptr0 = isLikeNone(contract_addresses) ? 0 : passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            var ptr1 = isLikeNone(token_ids) ? 0 : passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            var len1 = WASM_VECTOR_LEN;
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
         * * `token_ids` - Array of token ids
         * * `limit` - Maximum number of token balances to return
         * * `cursor` - Cursor to start from
         *
         * # Returns
         * Result containing token balances or error
         * @param {string[] | null} [contract_addresses]
         * @param {string[] | null} [account_addresses]
         * @param {WasmU256[] | null} [token_ids]
         * @param {number | null} [limit]
         * @param {string | null} [cursor]
         * @returns {Promise<TokenBalances>}
         */
        getTokenBalances(contract_addresses, account_addresses, token_ids, limit, cursor) {
            var ptr0 = isLikeNone(contract_addresses) ? 0 : passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            var ptr1 = isLikeNone(account_addresses) ? 0 : passArrayJsValueToWasm0(account_addresses, wasm.__wbindgen_malloc);
            var len1 = WASM_VECTOR_LEN;
            var ptr2 = isLikeNone(token_ids) ? 0 : passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            var len2 = WASM_VECTOR_LEN;
            var ptr3 = isLikeNone(cursor) ? 0 : passStringToWasm0(cursor, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len3 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_getTokenBalances(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, isLikeNone(limit) ? 0x100000001 : (limit) >>> 0, ptr3, len3);
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
         * @returns {Promise<Entities>}
         */
        getEntities(query) {
            const ret = wasm.toriiclient_getEntities(this.__wbg_ptr, query);
            return ret;
        }
        /**
         * Gets all entities with pagination
         *
         * # Parameters
         * * `limit` - Maximum number of entities to return
         * * `cursor` - Cursor to start from
         *
         * # Returns
         * Result containing paginated entities or error
         * @param {number} limit
         * @param {string | null} [cursor]
         * @returns {Promise<Entities>}
         */
        getAllEntities(limit, cursor) {
            var ptr0 = isLikeNone(cursor) ? 0 : passStringToWasm0(cursor, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_getAllEntities(this.__wbg_ptr, limit, ptr0, len0);
            return ret;
        }
        /**
         * Gets event messages based on query parameters
         *
         * # Parameters
         * * `query` - Query parameters for filtering messages
         *
         * # Returns
         * Result containing matching event messages or error
         * @param {Query} query
         * @returns {Promise<Entities>}
         */
        getEventMessages(query) {
            const ret = wasm.toriiclient_getEventMessages(this.__wbg_ptr, query);
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
         * @param {Clause | null | undefined} clause
         * @param {Function} callback
         * @returns {Subscription}
         */
        onEntityUpdated(clause, callback) {
            const ret = wasm.toriiclient_onEntityUpdated(this.__wbg_ptr, isLikeNone(clause) ? 0 : addToExternrefTable0(clause), callback);
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
         * @param {Clause | null} [clause]
         * @returns {Promise<void>}
         */
        updateEntitySubscription(subscription, clause) {
            _assertClass(subscription, Subscription);
            const ret = wasm.toriiclient_updateEntitySubscription(this.__wbg_ptr, subscription.__wbg_ptr, isLikeNone(clause) ? 0 : addToExternrefTable0(clause));
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
         * @param {Clause | null | undefined} clause
         * @param {Function} callback
         * @returns {Subscription}
         */
        onEventMessageUpdated(clause, callback) {
            const ret = wasm.toriiclient_onEventMessageUpdated(this.__wbg_ptr, isLikeNone(clause) ? 0 : addToExternrefTable0(clause), callback);
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
         * @param {Clause | null} [clause]
         * @returns {Promise<void>}
         */
        updateEventMessageSubscription(subscription, clause) {
            _assertClass(subscription, Subscription);
            const ret = wasm.toriiclient_updateEventMessageSubscription(this.__wbg_ptr, subscription.__wbg_ptr, isLikeNone(clause) ? 0 : addToExternrefTable0(clause));
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
         * @param {KeysClause[]} clauses
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
         * @param {string | null | undefined} contract_address
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
         * @param {string[] | null | undefined} contract_addresses
         * @param {string[] | null | undefined} account_addresses
         * @param {WasmU256[] | null | undefined} token_ids
         * @param {Function} callback
         * @returns {Subscription}
         */
        onTokenBalanceUpdated(contract_addresses, account_addresses, token_ids, callback) {
            var ptr0 = isLikeNone(contract_addresses) ? 0 : passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            var ptr1 = isLikeNone(account_addresses) ? 0 : passArrayJsValueToWasm0(account_addresses, wasm.__wbindgen_malloc);
            var len1 = WASM_VECTOR_LEN;
            var ptr2 = isLikeNone(token_ids) ? 0 : passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            var len2 = WASM_VECTOR_LEN;
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
         * @param {string[]} contract_addresses
         * @param {string[]} account_addresses
         * @param {WasmU256[]} token_ids
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
         * @param {string[]} signature
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

    const TypedDataFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_typeddata_free(ptr >>> 0, 1));

    class TypedData {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            TypedDataFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_typeddata_free(ptr, 0);
        }
        /**
         * @param {string} typed_data
         */
        constructor(typed_data) {
            const ptr0 = passStringToWasm0(typed_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.typeddata_new(ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            TypedDataFinalization.register(this, this.__wbg_ptr, this);
            return this;
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
         * @param {string} address
         * @returns {string}
         */
        encode(address) {
            let deferred3_0;
            let deferred3_1;
            try {
                const ptr0 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                const len0 = WASM_VECTOR_LEN;
                const ret = wasm.typeddata_encode(this.__wbg_ptr, ptr0, len0);
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
        }
    }
    __exports.TypedData = TypedData;

    const VerifyingKeyFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_verifyingkey_free(ptr >>> 0, 1));

    class VerifyingKey {

        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(VerifyingKey.prototype);
            obj.__wbg_ptr = ptr;
            VerifyingKeyFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            VerifyingKeyFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_verifyingkey_free(ptr, 0);
        }
        /**
         * Initializes a new verifying key from a scalar
         *
         * # Parameters
         * * `verifying_key` - Verifying key as hex string
         *
         * # Returns
         * Result containing verifying key or error
         * @param {string} verifying_key
         */
        constructor(verifying_key) {
            const ptr0 = passStringToWasm0(verifying_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.verifyingkey_new(ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            VerifyingKeyFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        /**
         * Returns the scalar of the verifying key
         *
         * # Returns
         * Result containing scalar as hex string or error
         * @returns {string}
         */
        scalar() {
            let deferred2_0;
            let deferred2_1;
            try {
                const ret = wasm.verifyingkey_scalar(this.__wbg_ptr);
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
         * Verifies a signature against a message hash using a verifying key
         *
         * # Parameters
         * * `verifying_key` - Verifying key as hex string
         * * `hash` - Message hash as hex string
         * * `signature` - Signature to verify
         *
         * # Returns
         * Result containing verification success boolean or error
         * @param {string} hash
         * @param {Signature} signature
         * @returns {boolean}
         */
        verify(hash, signature) {
            const ptr = this.__destroy_into_raw();
            const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.verifyingkey_verify(ptr, ptr0, len0, signature);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ret[0] !== 0;
        }
    }
    __exports.VerifyingKey = VerifyingKey;

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
        imports.wbg.__wbg_WorkerGlobalScope_68dbbc2404209578 = function(arg0) {
            const ret = arg0.WorkerGlobalScope;
            return ret;
        };
        imports.wbg.__wbg_abort_775ef1d17fc65868 = function(arg0) {
            arg0.abort();
        };
        imports.wbg.__wbg_account_new = function(arg0) {
            const ret = Account.__wrap(arg0);
            return ret;
        };
        imports.wbg.__wbg_append_8c7dd8d641a5f01b = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments) };
        imports.wbg.__wbg_body_0b8fd1fe671660df = function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_buffer_09165b52af8c5237 = function(arg0) {
            const ret = arg0.buffer;
            return ret;
        };
        imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
            const ret = arg0.buffer;
            return ret;
        };
        imports.wbg.__wbg_bufferedAmount_6b59755afc54484e = function(arg0) {
            const ret = arg0.bufferedAmount;
            return ret;
        };
        imports.wbg.__wbg_bufferedAmount_a482960ac51b25e8 = function(arg0) {
            const ret = arg0.bufferedAmount;
            return ret;
        };
        imports.wbg.__wbg_byobRequest_77d9adf63337edfb = function(arg0) {
            const ret = arg0.byobRequest;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_byteLength_e674b853d9c77e1d = function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        };
        imports.wbg.__wbg_byteOffset_fd862df290ef848d = function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        };
        imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_cancel_8a308660caa6cadf = function(arg0) {
            const ret = arg0.cancel();
            return ret;
        };
        imports.wbg.__wbg_catch_a6e601879b2610e9 = function(arg0, arg1) {
            const ret = arg0.catch(arg1);
            return ret;
        };
        imports.wbg.__wbg_channel_41464286836ce76f = function(arg0) {
            const ret = arg0.channel;
            return ret;
        };
        imports.wbg.__wbg_clearInterval_ad2594253cc39c4b = function(arg0, arg1) {
            arg0.clearInterval(arg1);
        };
        imports.wbg.__wbg_clearInterval_eba67734fd13a7f1 = function(arg0, arg1) {
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
        imports.wbg.__wbg_close_304cc1fef3466669 = function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments) };
        imports.wbg.__wbg_close_314acc3eb034fb66 = function(arg0) {
            arg0.close();
        };
        imports.wbg.__wbg_close_5ce03e29be453811 = function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments) };
        imports.wbg.__wbg_close_7dcca1557b5bd08b = function(arg0) {
            arg0.close();
        };
        imports.wbg.__wbg_close_e1253d480ed93ce3 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.close(arg1, getStringFromWasm0(arg2, arg3));
        }, arguments) };
        imports.wbg.__wbg_close_fa50b16598acbea1 = function(arg0) {
            const ret = arg0.close();
            return ret;
        };
        imports.wbg.__wbg_closed_2934f4ed093a9d95 = function(arg0) {
            const ret = arg0.closed;
            return ret;
        };
        imports.wbg.__wbg_closed_e969addb486e4f10 = function(arg0) {
            const ret = arg0.closed;
            return ret;
        };
        imports.wbg.__wbg_createBidirectionalStream_2b56e05ee223119c = function(arg0) {
            const ret = arg0.createBidirectionalStream();
            return ret;
        };
        imports.wbg.__wbg_createDataChannel_284b1e73e52d8464 = function(arg0, arg1, arg2, arg3) {
            const ret = arg0.createDataChannel(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        };
        imports.wbg.__wbg_createDataChannel_8cc608b38b33eba9 = function(arg0, arg1, arg2) {
            const ret = arg0.createDataChannel(getStringFromWasm0(arg1, arg2));
            return ret;
        };
        imports.wbg.__wbg_createOffer_088a2617590d462a = function(arg0) {
            const ret = arg0.createOffer();
            return ret;
        };
        imports.wbg.__wbg_crypto_574e78ad8b13b65f = function(arg0) {
            const ret = arg0.crypto;
            return ret;
        };
        imports.wbg.__wbg_data_432d9c3df2630942 = function(arg0) {
            const ret = arg0.data;
            return ret;
        };
        imports.wbg.__wbg_desiredSize_5f5e5285daee0299 = function() { return handleError(function (arg0, arg1) {
            const ret = arg1.desiredSize;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        }, arguments) };
        imports.wbg.__wbg_document_d249400bd7bd996d = function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_done_769e5ede4b31c67b = function(arg0) {
            const ret = arg0.done;
            return ret;
        };
        imports.wbg.__wbg_enqueue_bb16ba72f537dc9e = function() { return handleError(function (arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments) };
        imports.wbg.__wbg_entries_3265d4158b33e5dc = function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        };
        imports.wbg.__wbg_fetch_07cd86dd296a5a63 = function(arg0, arg1, arg2) {
            const ret = arg0.fetch(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_fetch_509096533071c657 = function(arg0, arg1) {
            const ret = arg0.fetch(arg1);
            return ret;
        };
        imports.wbg.__wbg_fetch_769f3df592e37b75 = function(arg0, arg1) {
            const ret = fetch(arg0, arg1);
            return ret;
        };
        imports.wbg.__wbg_fetch_f1856afdb49415d1 = function(arg0) {
            const ret = fetch(arg0);
            return ret;
        };
        imports.wbg.__wbg_generateCertificate_9e84bb7f7662375c = function() { return handleError(function (arg0) {
            const ret = RTCPeerConnection.generateCertificate(arg0);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments) };
        imports.wbg.__wbg_getReader_48e00749fe3f6089 = function() { return handleError(function (arg0) {
            const ret = arg0.getReader();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_getReader_be0d36e5873a525b = function(arg0) {
            const ret = arg0.getReader();
            return ret;
        };
        imports.wbg.__wbg_getWriter_6ce182d0adc3f96b = function() { return handleError(function (arg0) {
            const ret = arg0.getWriter();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        };
        imports.wbg.__wbg_getdone_d47073731acd3e74 = function(arg0) {
            const ret = arg0.done;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        };
        imports.wbg.__wbg_getvalue_009dcd63692bee1f = function(arg0) {
            const ret = arg0.value;
            return ret;
        };
        imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        };
        imports.wbg.__wbg_has_a5ea9117f258a0ec = function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_headers_9cb51cfd2ac780a4 = function(arg0) {
            const ret = arg0.headers;
            return ret;
        };
        imports.wbg.__wbg_hostname_8d7204884eb7378b = function() { return handleError(function (arg0, arg1) {
            const ret = arg1.hostname;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments) };
        imports.wbg.__wbg_incomingBidirectionalStreams_ed7915830e8f8998 = function(arg0) {
            const ret = arg0.incomingBidirectionalStreams;
            return ret;
        };
        imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Error_4d54113b22d20306 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Error;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_ReadableStreamDefaultReader_056dcea99b3557aa = function(arg0) {
            let result;
            try {
                result = arg0 instanceof ReadableStreamDefaultReader;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Response_f2cc20d9f7dfd644 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_WebTransportBidirectionalStream_65ff63c49f91f97a = function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebTransportBidirectionalStream;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        };
        imports.wbg.__wbg_isSafeInteger_343e2beeeece1bb0 = function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        };
        imports.wbg.__wbg_iterator_9a24c88df860dc65 = function() {
            const ret = Symbol.iterator;
            return ret;
        };
        imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
            const ret = arg0.length;
            return ret;
        };
        imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
            const ret = arg0.length;
            return ret;
        };
        imports.wbg.__wbg_localDescription_0719e580c5d51318 = function(arg0) {
            const ret = arg0.localDescription;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_location_70ef68aa4c9b8339 = function(arg0) {
            const ret = arg0.location;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        };
        imports.wbg.__wbg_navigator_1577371c070c8947 = function(arg0) {
            const ret = arg0.navigator;
            return ret;
        };
        imports.wbg.__wbg_new_018dcc2d6c8c2f6a = function() { return handleError(function () {
            const ret = new Headers();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_new_23a2665fac83c611 = function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_436(a, state0.b, arg0, arg1);
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
        imports.wbg.__wbg_new_405e22f390576ce2 = function() {
            const ret = new Object();
            return ret;
        };
        imports.wbg.__wbg_new_5e0be73521bc8c17 = function() {
            const ret = new Map();
            return ret;
        };
        imports.wbg.__wbg_new_78feb108b6472713 = function() {
            const ret = new Array();
            return ret;
        };
        imports.wbg.__wbg_new_92c54fc74574ef55 = function() { return handleError(function (arg0, arg1) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments) };
        imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        };
        imports.wbg.__wbg_new_c68d7209be747379 = function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_new_d85e20a34917132b = function() { return handleError(function (arg0, arg1) {
            const ret = new WebTransport(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments) };
        imports.wbg.__wbg_new_e25e5aab09ff45db = function() { return handleError(function () {
            const ret = new AbortController();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
            const ret = new Function(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_newwithconfiguration_d716d1bf0ec3af80 = function() { return handleError(function (arg0) {
            const ret = new RTCPeerConnection(arg0);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_newwithoptions_1ba541b69f220543 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new WebTransport(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_newwithstrandinit_06c535e0a867c635 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_next_25feadfc0913fea9 = function(arg0) {
            const ret = arg0.next;
            return ret;
        };
        imports.wbg.__wbg_next_6574e1a8a62d1055 = function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_node_905d3e251edff8a2 = function(arg0) {
            const ret = arg0.node;
            return ret;
        };
        imports.wbg.__wbg_now_2c95c9de01293173 = function(arg0) {
            const ret = arg0.now();
            return ret;
        };
        imports.wbg.__wbg_now_807e54c39636c349 = function() {
            const ret = Date.now();
            return ret;
        };
        imports.wbg.__wbg_performance_7a3ffd0b17f663ad = function(arg0) {
            const ret = arg0.performance;
            return ret;
        };
        imports.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(arg0) {
            const ret = arg0.process;
            return ret;
        };
        imports.wbg.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        };
        imports.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(arg0) {
            queueMicrotask(arg0);
        };
        imports.wbg.__wbg_queueMicrotask_d3219def82552485 = function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        };
        imports.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments) };
        imports.wbg.__wbg_read_a2434af1186cb56c = function(arg0) {
            const ret = arg0.read();
            return ret;
        };
        imports.wbg.__wbg_readable_e39b6396dce1aa98 = function(arg0) {
            const ret = arg0.readable;
            return ret;
        };
        imports.wbg.__wbg_readyState_7ef6e63c349899ed = function(arg0) {
            const ret = arg0.readyState;
            return ret;
        };
        imports.wbg.__wbg_readyState_a41b94d7ac899955 = function(arg0) {
            const ret = arg0.readyState;
            return (__wbindgen_enum_RtcDataChannelState.indexOf(ret) + 1 || 5) - 1;
        };
        imports.wbg.__wbg_ready_480b0e63c18378c7 = function(arg0) {
            const ret = arg0.ready;
            return ret;
        };
        imports.wbg.__wbg_ready_a8d2b97e1fe33dcb = function(arg0) {
            const ret = arg0.ready;
            return ret;
        };
        imports.wbg.__wbg_releaseLock_091899af97991d2e = function(arg0) {
            arg0.releaseLock();
        };
        imports.wbg.__wbg_require_60cc747a6bc5215a = function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments) };
        imports.wbg.__wbg_resolve_4851785c9c5f573d = function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        };
        imports.wbg.__wbg_respond_1f279fa9f8edcb1c = function() { return handleError(function (arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments) };
        imports.wbg.__wbg_sdp_cd7b4172b2883698 = function(arg0, arg1) {
            const ret = arg1.sdp;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_send_48418c7374637896 = function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getArrayU8FromWasm0(arg1, arg2));
        }, arguments) };
        imports.wbg.__wbg_send_fc0c204e8a1757f4 = function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getArrayU8FromWasm0(arg1, arg2));
        }, arguments) };
        imports.wbg.__wbg_setInterval_83d54331ceeda644 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, ...arg3);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_setInterval_d4f8bdcc1d5b1da9 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, ...arg3);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_setLocalDescription_3b7809adf05c8170 = function(arg0, arg1) {
            const ret = arg0.setLocalDescription(arg1);
            return ret;
        };
        imports.wbg.__wbg_setRemoteDescription_2bd5c020ee5cf31f = function(arg0, arg1) {
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
        imports.wbg.__wbg_set_37837023f3d740e8 = function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        };
        imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        };
        imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        };
        imports.wbg.__wbg_set_8fc6bf8a5b1071d1 = function(arg0, arg1, arg2) {
            const ret = arg0.set(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_setbinaryType_92fa1ffd873b327c = function(arg0, arg1) {
            arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
        };
        imports.wbg.__wbg_setbinaryType_9726f9bccd08c19f = function(arg0, arg1) {
            arg0.binaryType = __wbindgen_enum_RtcDataChannelType[arg1];
        };
        imports.wbg.__wbg_setbody_5923b78a95eedf29 = function(arg0, arg1) {
            arg0.body = arg1;
        };
        imports.wbg.__wbg_setbufferedAmountLowThreshold_0904e3b5738411eb = function(arg0, arg1) {
            arg0.bufferedAmountLowThreshold = arg1 >>> 0;
        };
        imports.wbg.__wbg_setcache_12f17c3a980650e4 = function(arg0, arg1) {
            arg0.cache = __wbindgen_enum_RequestCache[arg1];
        };
        imports.wbg.__wbg_setcertificates_99001bae4e102fe8 = function(arg0, arg1) {
            arg0.certificates = arg1;
        };
        imports.wbg.__wbg_setcredentials_c3a22f1cd105a2c6 = function(arg0, arg1) {
            arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
        };
        imports.wbg.__wbg_setheaders_834c0bdb6a8949ad = function(arg0, arg1) {
            arg0.headers = arg1;
        };
        imports.wbg.__wbg_setid_69c7a6a10123dc92 = function(arg0, arg1) {
            arg0.id = arg1;
        };
        imports.wbg.__wbg_setintegrity_564a2397cf837760 = function(arg0, arg1, arg2) {
            arg0.integrity = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setmethod_3c5280fe5d890842 = function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setmode_5dc300b865044b65 = function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_RequestMode[arg1];
        };
        imports.wbg.__wbg_setnegotiated_09517bfd67caa14c = function(arg0, arg1) {
            arg0.negotiated = arg1 !== 0;
        };
        imports.wbg.__wbg_setonbufferedamountlow_430d774a0d830d1e = function(arg0, arg1) {
            arg0.onbufferedamountlow = arg1;
        };
        imports.wbg.__wbg_setonclose_14fc475a49d488fc = function(arg0, arg1) {
            arg0.onclose = arg1;
        };
        imports.wbg.__wbg_setonclose_65cd7b87ba8a9ac7 = function(arg0, arg1) {
            arg0.onclose = arg1;
        };
        imports.wbg.__wbg_setondatachannel_7d81fb6dd97cd4bb = function(arg0, arg1) {
            arg0.ondatachannel = arg1;
        };
        imports.wbg.__wbg_setonerror_8639efe354b947cd = function(arg0, arg1) {
            arg0.onerror = arg1;
        };
        imports.wbg.__wbg_setonmessage_6cfa79abe114a189 = function(arg0, arg1) {
            arg0.onmessage = arg1;
        };
        imports.wbg.__wbg_setonmessage_6eccab530a8fb4c7 = function(arg0, arg1) {
            arg0.onmessage = arg1;
        };
        imports.wbg.__wbg_setonopen_2da654e1f39745d5 = function(arg0, arg1) {
            arg0.onopen = arg1;
        };
        imports.wbg.__wbg_setonopen_64765262b192af8a = function(arg0, arg1) {
            arg0.onopen = arg1;
        };
        imports.wbg.__wbg_setredirect_40e6a7f717a2f86a = function(arg0, arg1) {
            arg0.redirect = __wbindgen_enum_RequestRedirect[arg1];
        };
        imports.wbg.__wbg_setreferrer_fea46c1230e5e29a = function(arg0, arg1, arg2) {
            arg0.referrer = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setreferrerpolicy_b73612479f761b6f = function(arg0, arg1) {
            arg0.referrerPolicy = __wbindgen_enum_ReferrerPolicy[arg1];
        };
        imports.wbg.__wbg_setsdp_ac3f34abbbed4f34 = function(arg0, arg1, arg2) {
            arg0.sdp = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setsignal_75b21ef3a81de905 = function(arg0, arg1) {
            arg0.signal = arg1;
        };
        imports.wbg.__wbg_settype_0c7017dfd63b2ace = function(arg0, arg1) {
            arg0.type = __wbindgen_enum_RtcSdpType[arg1];
        };
        imports.wbg.__wbg_signal_aaf9ad74119f20a4 = function(arg0) {
            const ret = arg0.signal;
            return ret;
        };
        imports.wbg.__wbg_slice_9272f90890997145 = function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_status_f6360336ca686bf0 = function(arg0) {
            const ret = arg0.status;
            return ret;
        };
        imports.wbg.__wbg_stringify_f7ed6987935b4a24 = function() { return handleError(function (arg0) {
            const ret = JSON.stringify(arg0);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_text_7805bea50de2af49 = function() { return handleError(function (arg0) {
            const ret = arg0.text();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_then_44b73946d2fb3e7d = function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        };
        imports.wbg.__wbg_then_48b406749878a531 = function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_toString_5285597960676b7b = function(arg0) {
            const ret = arg0.toString();
            return ret;
        };
        imports.wbg.__wbg_toString_c813bbd34d063839 = function(arg0) {
            const ret = arg0.toString();
            return ret;
        };
        imports.wbg.__wbg_toriiclient_new = function(arg0) {
            const ret = ToriiClient.__wrap(arg0);
            return ret;
        };
        imports.wbg.__wbg_url_ae10c34ca209681d = function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_userAgent_12e9d8e62297563f = function() { return handleError(function (arg0, arg1) {
            const ret = arg1.userAgent;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments) };
        imports.wbg.__wbg_value_cd1ffa7b1ab794f1 = function(arg0) {
            const ret = arg0.value;
            return ret;
        };
        imports.wbg.__wbg_versions_c01dfd4722a88165 = function(arg0) {
            const ret = arg0.versions;
            return ret;
        };
        imports.wbg.__wbg_view_fd8a56e8983f448d = function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_writable_4f9d2cae62a7c0cb = function(arg0) {
            const ret = arg0.writable;
            return ret;
        };
        imports.wbg.__wbg_write_311434e30ee214e5 = function(arg0, arg1) {
            const ret = arg0.write(arg1);
            return ret;
        };
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
        imports.wbg.__wbindgen_closure_wrapper2080 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 679, __wbg_adapter_52);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper3079 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1137, __wbg_adapter_55);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper3080 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1137, __wbg_adapter_55);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper3081 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1137, __wbg_adapter_55);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper3123 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1162, __wbg_adapter_62);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper3124 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1162, __wbg_adapter_62);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper3125 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1162, __wbg_adapter_62);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper5027 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 1934, __wbg_adapter_69);
            return ret;
        };
        imports.wbg.__wbindgen_closure_wrapper6331 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 2503, __wbg_adapter_72);
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
