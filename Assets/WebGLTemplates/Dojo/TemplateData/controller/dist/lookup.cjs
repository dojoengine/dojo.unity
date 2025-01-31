'use strict';

var starknet = require('starknet');

// src/lookup.ts

// src/constants.ts
var API_URL = "https://api.cartridge.gg";

// src/lookup.ts
var cache = /* @__PURE__ */ new Map();
async function lookup(request) {
  if (!request.addresses?.length && !request.usernames?.length) {
    return { results: [] };
  }
  const response = await fetch(`${API_URL}/lookup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
async function lookupUsernames(usernames) {
  const uncachedUsernames = usernames.filter((name) => !cache.has(name));
  if (uncachedUsernames.length > 0) {
    const response = await lookup({ usernames: uncachedUsernames });
    response.results.forEach((result) => {
      cache.set(result.username, result.addresses[0]);
    });
  }
  return new Map(
    usernames.map((name) => [name, cache.get(name)]).filter((entry) => entry[1] !== void 0)
  );
}
async function lookupAddresses(addresses) {
  addresses = addresses.map(starknet.num.toHex);
  const uncachedAddresses = addresses.filter((addr) => !cache.has(addr));
  if (uncachedAddresses.length > 0) {
    const response = await lookup({
      addresses: uncachedAddresses
    });
    response.results.forEach((result) => {
      cache.set(result.addresses[0], result.username);
    });
  }
  return new Map(
    addresses.map((addr) => [addr, cache.get(addr)]).filter((entry) => entry[1] !== void 0)
  );
}

exports.lookupAddresses = lookupAddresses;
exports.lookupUsernames = lookupUsernames;
//# sourceMappingURL=lookup.cjs.map
//# sourceMappingURL=lookup.cjs.map