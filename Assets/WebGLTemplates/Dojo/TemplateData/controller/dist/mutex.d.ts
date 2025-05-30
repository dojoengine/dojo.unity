/**
 * A simple mutual exclusion lock. It allows you to obtain and release a lock,
 *  ensuring that only one task can access a critical section at a time.
 */
export declare class Mutex {
    private m_lastPromise;
    /**
     * Acquire lock
     * @param [bypass=false] option to skip lock acquisition
     */
    obtain(bypass?: boolean): Promise<() => void>;
}
