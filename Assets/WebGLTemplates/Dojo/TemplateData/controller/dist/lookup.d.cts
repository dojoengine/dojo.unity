declare function lookupUsernames(usernames: string[]): Promise<Map<string, string>>;
declare function lookupAddresses(addresses: string[]): Promise<Map<string, string>>;

export { lookupAddresses, lookupUsernames };
