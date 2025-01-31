import { ContractPolicy, Method, SignMessagePolicy } from '@cartridge/presets';

declare class NotReadyToConnect extends Error {
    constructor();
}

type ParsedSessionPolicies = {
    verified: boolean;
    contracts?: SessionContracts;
    messages?: SessionMessages;
};
type SessionContracts = Record<string, Omit<ContractPolicy, "methods"> & {
    methods: (Method & {
        authorized?: boolean;
    })[];
}>;
type SessionMessages = (SignMessagePolicy & {
    authorized?: boolean;
})[];

export { NotReadyToConnect as N, type ParsedSessionPolicies as P };
