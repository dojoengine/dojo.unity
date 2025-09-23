let wasm_bindgen;
(function() {
    const __exports = {};
    let script_src;
    if (typeof document !== 'undefined' && document.currentScript !== null) {
        script_src = new URL(document.currentScript.src, location.href).toString();
    }
    let wasm = undefined;

    let cachedUint8ArrayMemory0 = null;

    function getUint8ArrayMemory0() {
        if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
            cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachedUint8ArrayMemory0;
    }

    let cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

    if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

    function decodeText(ptr, len) {
        return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }

    function getStringFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return decodeText(ptr, len);
    }

    let WASM_VECTOR_LEN = 0;

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

    const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(
    state => {
        wasm.__wbindgen_export_7.get(state.dtor)(state.a, state.b);
    }
    );

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
                    wasm.__wbindgen_export_7.get(state.dtor)(a, state.b);
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

    function __wbg_adapter_6(arg0, arg1) {
        wasm.wasm_bindgen__convert__closures_____invoke__h48c1f7f6b2e7507f(arg0, arg1);
    }

    function __wbg_adapter_13(arg0, arg1, arg2) {
        wasm.closure974_externref_shim(arg0, arg1, arg2);
    }

    function __wbg_adapter_18(arg0, arg1) {
        wasm.wasm_bindgen__convert__closures_____invoke__ha650cbf29b909d89(arg0, arg1);
    }

    function __wbg_adapter_259(arg0, arg1, arg2, arg3) {
        wasm.closure1148_externref_shim(arg0, arg1, arg2, arg3);
    }

    const __wbindgen_enum_ReadableStreamType = ["bytes"];

    const __wbindgen_enum_ReferrerPolicy = ["", "no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "unsafe-url", "same-origin", "strict-origin", "strict-origin-when-cross-origin"];

    const __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];

    const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];

    const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];

    const __wbindgen_enum_RequestRedirect = ["follow", "error", "manual"];

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
         * @returns {bigint}
         */
        get id() {
            const ret = wasm.__wbg_get_subscription_id(this.__wbg_ptr);
            return BigInt.asUintN(64, ret);
        }
        /**
         * @param {bigint} arg0
         */
        set id(arg0) {
            wasm.__wbg_set_subscription_id(this.__wbg_ptr, arg0);
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
         * @param {ControllerQuery} query
         * @returns {Promise<Controllers>}
         */
        getControllers(query) {
            const ret = wasm.toriiclient_getControllers(this.__wbg_ptr, query);
            return ret;
        }
        /**
         * Gets contracts matching the given query
         *
         * # Parameters
         * * `query` - ContractQuery parameters
         *
         * # Returns
         * Result containing contracts or error
         * @param {ContractQuery} query
         * @returns {Promise<Contracts>}
         */
        getContracts(query) {
            const ret = wasm.toriiclient_getContracts(this.__wbg_ptr, query);
            return ret;
        }
        /**
         * Gets transactions matching the given query
         *
         * # Parameters
         * * `query` - Query parameters
         *
         * # Returns
         * Result containing transactions or error
         * @param {TransactionQuery} query
         * @returns {Promise<Transactions>}
         */
        getTransactions(query) {
            const ret = wasm.toriiclient_getTransactions(this.__wbg_ptr, query);
            return ret;
        }
        /**
         * Subscribes to transactions
         *
         * # Parameters
         * * `filter` - Filter parameters
         * * `callback` - JavaScript function to call on updates
         *
         * # Returns
         * Result containing subscription handle or error
         * @param {TransactionFilter | null | undefined} filter
         * @param {Function} callback
         * @returns {Promise<Subscription>}
         */
        onTransaction(filter, callback) {
            const ret = wasm.toriiclient_onTransaction(this.__wbg_ptr, isLikeNone(filter) ? 0 : addToExternrefTable0(filter), callback);
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
         * @param {TokenQuery} query
         * @returns {Promise<Tokens>}
         */
        getTokens(query) {
            const ret = wasm.toriiclient_getTokens(this.__wbg_ptr, query);
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
         * @returns {Promise<Subscription>}
         */
        onTokenUpdated(contract_addresses, token_ids, callback) {
            var ptr0 = isLikeNone(contract_addresses) ? 0 : passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            var ptr1 = isLikeNone(token_ids) ? 0 : passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            var len1 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onTokenUpdated(this.__wbg_ptr, ptr0, len0, ptr1, len1, callback);
            return ret;
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
         * @param {TokenBalanceQuery} query
         * @returns {Promise<TokenBalances>}
         */
        getTokenBalances(query) {
            const ret = wasm.toriiclient_getTokenBalances(this.__wbg_ptr, query);
            return ret;
        }
        /**
         * Gets token contracts for given accounts and contracts
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
         * @param {TokenContractQuery} query
         * @returns {Promise<TokenContracts>}
         */
        getTokenContracts(query) {
            const ret = wasm.toriiclient_getTokenContracts(this.__wbg_ptr, query);
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
         * @returns {Promise<Subscription>}
         */
        onEntityUpdated(clause, callback) {
            const ret = wasm.toriiclient_onEntityUpdated(this.__wbg_ptr, isLikeNone(clause) ? 0 : addToExternrefTable0(clause), callback);
            return ret;
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
         * @returns {Promise<Subscription>}
         */
        onEventMessageUpdated(clause, callback) {
            const ret = wasm.toriiclient_onEventMessageUpdated(this.__wbg_ptr, isLikeNone(clause) ? 0 : addToExternrefTable0(clause), callback);
            return ret;
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
         * @returns {Promise<Subscription>}
         */
        onStarknetEvent(clauses, callback) {
            const ptr0 = passArrayJsValueToWasm0(clauses, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onStarknetEvent(this.__wbg_ptr, ptr0, len0, callback);
            return ret;
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
         * @returns {Promise<Subscription>}
         */
        onIndexerUpdated(contract_address, callback) {
            var ptr0 = isLikeNone(contract_address) ? 0 : passStringToWasm0(contract_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onIndexerUpdated(this.__wbg_ptr, ptr0, len0, callback);
            return ret;
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
         * @returns {Promise<Subscription>}
         */
        onTokenBalanceUpdated(contract_addresses, account_addresses, token_ids, callback) {
            var ptr0 = isLikeNone(contract_addresses) ? 0 : passArrayJsValueToWasm0(contract_addresses, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            var ptr1 = isLikeNone(account_addresses) ? 0 : passArrayJsValueToWasm0(account_addresses, wasm.__wbindgen_malloc);
            var len1 = WASM_VECTOR_LEN;
            var ptr2 = isLikeNone(token_ids) ? 0 : passArrayJsValueToWasm0(token_ids, wasm.__wbindgen_malloc);
            var len2 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_onTokenBalanceUpdated(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, callback);
            return ret;
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
         * Result containing entity id of the offchain message or error
         * @param {Message} message
         * @returns {Promise<string>}
         */
        publishMessage(message) {
            const ret = wasm.toriiclient_publishMessage(this.__wbg_ptr, message);
            return ret;
        }
        /**
         * Publishes multiple messages to the network
         *
         * # Parameters
         * * `messages` - Array of Message objects, each containing message and signature fields
         *
         * # Returns
         * Result containing array of entity ids of the offchain messages or error
         * @param {Message[]} messages
         * @returns {Promise<string[]>}
         */
        publishMessageBatch(messages) {
            const ptr0 = passArrayJsValueToWasm0(messages, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.toriiclient_publishMessageBatch(this.__wbg_ptr, ptr0, len0);
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

    const EXPECTED_RESPONSE_TYPES = new Set(['basic', 'cors', 'default']);

    async function __wbg_load(module, imports) {
        if (typeof Response === 'function' && module instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                try {
                    return await WebAssembly.instantiateStreaming(module, imports);

                } catch (e) {
                    const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

                    if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
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
        imports.wbg.__wbg_Error_1f3748b298f99708 = function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_Number_577a493fc95ea223 = function(arg0) {
            const ret = Number(arg0);
            return ret;
        };
        imports.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_abort_6665281623826052 = function(arg0) {
            arg0.abort();
        };
        imports.wbg.__wbg_abort_c11a5d245a242912 = function(arg0, arg1) {
            arg0.abort(arg1);
        };
        imports.wbg.__wbg_account_new = function(arg0) {
            const ret = Account.__wrap(arg0);
            return ret;
        };
        imports.wbg.__wbg_append_3e86b0cd6215edd8 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments) };
        imports.wbg.__wbg_body_be60ee806470b990 = function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_buffer_1f897e9f3ed6b41d = function(arg0) {
            const ret = arg0.buffer;
            return ret;
        };
        imports.wbg.__wbg_byobRequest_ba853121442653bf = function(arg0) {
            const ret = arg0.byobRequest;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_byteLength_7029fecd0c136e6d = function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        };
        imports.wbg.__wbg_byteOffset_8161a341c0d72844 = function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        };
        imports.wbg.__wbg_call_2f8d426a20a307fe = function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_call_f53f0647ceb9c567 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_cancel_8fc34c38a41c5d07 = function(arg0) {
            const ret = arg0.cancel();
            return ret;
        };
        imports.wbg.__wbg_catch_70a1618b6f59db8a = function(arg0, arg1) {
            const ret = arg0.catch(arg1);
            return ret;
        };
        imports.wbg.__wbg_clearTimeout_5a54f8841c30079a = function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        };
        imports.wbg.__wbg_clearTimeout_6222fede17abcb1a = function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        };
        imports.wbg.__wbg_close_a90439b2444e47b4 = function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments) };
        imports.wbg.__wbg_close_f602227805f17f95 = function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments) };
        imports.wbg.__wbg_crypto_574e78ad8b13b65f = function(arg0) {
            const ret = arg0.crypto;
            return ret;
        };
        imports.wbg.__wbg_done_4a7743b6f942c9f3 = function(arg0) {
            const ret = arg0.done;
            return ret;
        };
        imports.wbg.__wbg_enqueue_1e58bed4477a141f = function() { return handleError(function (arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments) };
        imports.wbg.__wbg_entries_17f7acbc2d691c0d = function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        };
        imports.wbg.__wbg_fetch_4fae101547df73b6 = function(arg0, arg1, arg2) {
            const ret = arg0.fetch(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_fetch_769f3df592e37b75 = function(arg0, arg1) {
            const ret = fetch(arg0, arg1);
            return ret;
        };
        imports.wbg.__wbg_fetch_9885d2e26ad251bb = function(arg0, arg1) {
            const ret = arg0.fetch(arg1);
            return ret;
        };
        imports.wbg.__wbg_fetch_f156d10be9a5c88a = function(arg0) {
            const ret = fetch(arg0);
            return ret;
        };
        imports.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments) };
        imports.wbg.__wbg_getReader_48e00749fe3f6089 = function() { return handleError(function (arg0) {
            const ret = arg0.getReader();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_get_27b4bcbec57323ca = function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_get_59c6316d15f9f1d0 = function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        };
        imports.wbg.__wbg_getdone_8d12e2c5bfa23fbd = function(arg0) {
            const ret = arg0.done;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        };
        imports.wbg.__wbg_getvalue_8d746ccec318477b = function(arg0) {
            const ret = arg0.value;
            return ret;
        };
        imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        };
        imports.wbg.__wbg_has_85abdd8aeb8edebf = function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_headers_177bc880a5823968 = function(arg0) {
            const ret = arg0.headers;
            return ret;
        };
        imports.wbg.__wbg_instanceof_ArrayBuffer_59339a3a6f0c10ea = function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Response_0ab386c6818f788a = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Uint8Array_91f3c5adee7e6672 = function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_isArray_bc2498eba6fcb71f = function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        };
        imports.wbg.__wbg_isSafeInteger_6091d6e3ee1b65fd = function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        };
        imports.wbg.__wbg_iterator_96378c3c9a17347c = function() {
            const ret = Symbol.iterator;
            return ret;
        };
        imports.wbg.__wbg_length_246fa1f85a0dea5b = function(arg0) {
            const ret = arg0.length;
            return ret;
        };
        imports.wbg.__wbg_length_904c0910ed998bf3 = function(arg0) {
            const ret = arg0.length;
            return ret;
        };
        imports.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        };
        imports.wbg.__wbg_new_12588505388d0897 = function() { return handleError(function () {
            const ret = new Headers();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_new_1930cbb8d9ffc31b = function() {
            const ret = new Object();
            return ret;
        };
        imports.wbg.__wbg_new_56407f99198feff7 = function() {
            const ret = new Map();
            return ret;
        };
        imports.wbg.__wbg_new_6a8b180049d9484e = function() { return handleError(function () {
            const ret = new AbortController();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_new_9190433fb67ed635 = function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        };
        imports.wbg.__wbg_new_97ddeb994a38bb69 = function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_new_d5e3800b120e37e1 = function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_259(a, state0.b, arg0, arg1);
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
        imports.wbg.__wbg_new_e969dc3f68d25093 = function() {
            const ret = new Array();
            return ret;
        };
        imports.wbg.__wbg_newfromslice_d0d56929c6d9c842 = function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_newnoargs_a81330f6e05d8aca = function(arg0, arg1) {
            const ret = new Function(getStringFromWasm0(arg0, arg1));
            return ret;
        };
        imports.wbg.__wbg_newwithbyteoffsetandlength_9aade108cd45cf37 = function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_newwithlength_ed0ee6c1edca86fc = function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_newwithstrandinit_e8e22e9851f3c2fe = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_next_2e6b37020ac5fe58 = function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_next_3de8f2669431a3ff = function(arg0) {
            const ret = arg0.next;
            return ret;
        };
        imports.wbg.__wbg_node_905d3e251edff8a2 = function(arg0) {
            const ret = arg0.node;
            return ret;
        };
        imports.wbg.__wbg_parse_0eaa937cfd6388c4 = function() { return handleError(function (arg0, arg1) {
            const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments) };
        imports.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(arg0) {
            const ret = arg0.process;
            return ret;
        };
        imports.wbg.__wbg_prototypesetcall_c5f74efd31aea86b = function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        };
        imports.wbg.__wbg_push_cd3ac7d5b094565d = function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        };
        imports.wbg.__wbg_queueMicrotask_bcc6e26d899696db = function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        };
        imports.wbg.__wbg_queueMicrotask_f24a794d09c42640 = function(arg0) {
            queueMicrotask(arg0);
        };
        imports.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments) };
        imports.wbg.__wbg_read_dc3d89b58ce2ae65 = function(arg0) {
            const ret = arg0.read();
            return ret;
        };
        imports.wbg.__wbg_releaseLock_fbec365467db2e6c = function(arg0) {
            arg0.releaseLock();
        };
        imports.wbg.__wbg_require_60cc747a6bc5215a = function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments) };
        imports.wbg.__wbg_resolve_5775c0ef9222f556 = function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        };
        imports.wbg.__wbg_respond_0003f7c68aa35ef6 = function() { return handleError(function (arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments) };
        imports.wbg.__wbg_setTimeout_2b339866a2aa3789 = function(arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        };
        imports.wbg.__wbg_setTimeout_db2dbaeefb6f39c7 = function() { return handleError(function (arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_set_1d5fe1e3f51a48d8 = function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        };
        imports.wbg.__wbg_set_31197016f65a6a19 = function(arg0, arg1, arg2) {
            const ret = arg0.set(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        };
        imports.wbg.__wbg_set_b33e7a98099eed58 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_set_d636a0463acf1dbc = function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        };
        imports.wbg.__wbg_setbody_e324371c31597f2a = function(arg0, arg1) {
            arg0.body = arg1;
        };
        imports.wbg.__wbg_setcache_7c95e3469a5bfb76 = function(arg0, arg1) {
            arg0.cache = __wbindgen_enum_RequestCache[arg1];
        };
        imports.wbg.__wbg_setcredentials_55a9317ed2777533 = function(arg0, arg1) {
            arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
        };
        imports.wbg.__wbg_setheaders_ac0b1e4890a949cd = function(arg0, arg1) {
            arg0.headers = arg1;
        };
        imports.wbg.__wbg_setintegrity_b99a69a0174d6d2d = function(arg0, arg1, arg2) {
            arg0.integrity = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setmethod_9ce6e95af1ae0eaf = function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setmode_b89d1784e7e7f118 = function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_RequestMode[arg1];
        };
        imports.wbg.__wbg_setredirect_4017ceebe5aecf8c = function(arg0, arg1) {
            arg0.redirect = __wbindgen_enum_RequestRedirect[arg1];
        };
        imports.wbg.__wbg_setreferrer_4625041984f4c279 = function(arg0, arg1, arg2) {
            arg0.referrer = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_setreferrerpolicy_16cc29e0e528b435 = function(arg0, arg1) {
            arg0.referrerPolicy = __wbindgen_enum_ReferrerPolicy[arg1];
        };
        imports.wbg.__wbg_setsignal_e663c6d962763cd5 = function(arg0, arg1) {
            arg0.signal = arg1;
        };
        imports.wbg.__wbg_signal_bdb003fe19e53a13 = function(arg0) {
            const ret = arg0.signal;
            return ret;
        };
        imports.wbg.__wbg_static_accessor_GLOBAL_1f13249cc3acc96d = function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_static_accessor_GLOBAL_THIS_df7ae94b1e0ed6a3 = function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_static_accessor_SELF_6265471db3b3c228 = function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_static_accessor_WINDOW_16fb482f8ec52863 = function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_status_31874648c8651949 = function(arg0) {
            const ret = arg0.status;
            return ret;
        };
        imports.wbg.__wbg_stringify_1f41b6198e0932e0 = function() { return handleError(function (arg0) {
            const ret = JSON.stringify(arg0);
            return ret;
        }, arguments) };
        imports.wbg.__wbg_subarray_a219824899e59712 = function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        };
        imports.wbg.__wbg_subscription_new = function(arg0) {
            const ret = Subscription.__wrap(arg0);
            return ret;
        };
        imports.wbg.__wbg_text_42c080764c927da6 = function() { return handleError(function (arg0) {
            const ret = arg0.text();
            return ret;
        }, arguments) };
        imports.wbg.__wbg_then_8d2fcccde5380a03 = function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        };
        imports.wbg.__wbg_then_9cc266be2bf537b6 = function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        };
        imports.wbg.__wbg_toString_1144ec2f872e8cf3 = function(arg0) {
            const ret = arg0.toString();
            return ret;
        };
        imports.wbg.__wbg_toriiclient_new = function(arg0) {
            const ret = ToriiClient.__wrap(arg0);
            return ret;
        };
        imports.wbg.__wbg_url_d5273b9e10503471 = function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_value_09d0b4eaab48b91d = function(arg0) {
            const ret = arg0.value;
            return ret;
        };
        imports.wbg.__wbg_versions_c01dfd4722a88165 = function(arg0) {
            const ret = arg0.versions;
            return ret;
        };
        imports.wbg.__wbg_view_d36d28552eb70661 = function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        };
        imports.wbg.__wbg_wbindgenbigintgetasi64_7637cb1a7fb9a81e = function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        };
        imports.wbg.__wbg_wbindgenbooleanget_59f830b1a70d2530 = function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        };
        imports.wbg.__wbg_wbindgencbdrop_a85ed476c6a370b9 = function(arg0) {
            const obj = arg0.original;
            if (obj.cnt-- == 1) {
                obj.a = 0;
                return true;
            }
            const ret = false;
            return ret;
        };
        imports.wbg.__wbg_wbindgendebugstring_bb652b1bc2061b6d = function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_wbindgenin_192b210aa1c401e9 = function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        };
        imports.wbg.__wbg_wbindgenisbigint_7d76a1ca6454e439 = function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        };
        imports.wbg.__wbg_wbindgenisfunction_ea72b9d66a0e1705 = function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        };
        imports.wbg.__wbg_wbindgenisobject_dfe064a121d87553 = function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        };
        imports.wbg.__wbg_wbindgenisstring_4b74e4111ba029e6 = function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        };
        imports.wbg.__wbg_wbindgenisundefined_71f08a6ade4354e7 = function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        };
        imports.wbg.__wbg_wbindgenjsvaleq_f27272c0a890df7f = function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        };
        imports.wbg.__wbg_wbindgenjsvallooseeq_9dd7bb4b95ac195c = function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        };
        imports.wbg.__wbg_wbindgennumberget_d855f947247a3fbc = function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        };
        imports.wbg.__wbg_wbindgenstringget_43fe05afe34b0cb1 = function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        };
        imports.wbg.__wbg_wbindgenthrow_4c11a24fca429ccf = function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        };
        imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        };
        imports.wbg.__wbindgen_cast_25a0a844437d0e92 = function(arg0, arg1) {
            var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 4, 4);
            // Cast intrinsic for `Vector(NamedExternref("string")) -> Externref`.
            const ret = v0;
            return ret;
        };
        imports.wbg.__wbindgen_cast_3f095b8139316065 = function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 625, function: Function { arguments: [], shim_idx: 626, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, 625, __wbg_adapter_6);
            return ret;
        };
        imports.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        };
        imports.wbg.__wbindgen_cast_571913e56af74cc3 = function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 953, function: Function { arguments: [], shim_idx: 954, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, 953, __wbg_adapter_18);
            return ret;
        };
        imports.wbg.__wbindgen_cast_708ec70d61ede8c8 = function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 973, function: Function { arguments: [Externref], shim_idx: 974, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, 973, __wbg_adapter_13);
            return ret;
        };
        imports.wbg.__wbindgen_cast_9ae0607507abb057 = function(arg0) {
            // Cast intrinsic for `I64 -> Externref`.
            const ret = arg0;
            return ret;
        };
        imports.wbg.__wbindgen_cast_cb9088102bce6b30 = function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        };
        imports.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
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
