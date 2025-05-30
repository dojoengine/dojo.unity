import { AsyncMethodReturns } from '@cartridge/penpal';
import { ControllerOptions, Modal } from '../types';
export type IFrameOptions<CallSender> = Omit<ConstructorParameters<typeof IFrame>[0], "id" | "url" | "onConnect"> & {
    url?: string;
    onConnect: (child: AsyncMethodReturns<CallSender>) => void;
};
export declare class IFrame<CallSender extends {}> implements Modal {
    url?: URL;
    private iframe?;
    private container?;
    private onClose?;
    constructor({ id, url, preset, onClose, onConnect, methods, }: Pick<ControllerOptions, "preset"> & {
        id: string;
        url: URL;
        onClose?: () => void;
        onConnect: (child: AsyncMethodReturns<CallSender>) => void;
        methods?: {
            [key: string]: (...args: any[]) => void;
        };
    });
    open(): void;
    close(): void;
    sendBackward(): void;
    sendForward(): void;
    private resize;
}
