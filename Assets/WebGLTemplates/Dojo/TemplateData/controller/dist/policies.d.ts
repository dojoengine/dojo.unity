import { ContractPolicy, Method, SessionPolicies, SignMessagePolicy } from '@cartridge/presets';
export type ParsedSessionPolicies = {
    verified: boolean;
    contracts?: SessionContracts;
    messages?: SessionMessages;
};
export type SessionContracts = Record<string, Omit<ContractPolicy, "methods"> & {
    methods: (Method & {
        authorized?: boolean;
    })[];
}>;
export type SessionMessages = (SignMessagePolicy & {
    authorized?: boolean;
})[];
export declare function parsePolicies(policies: SessionPolicies): ParsedSessionPolicies;
