import WaveStore from "./store";

class WaveDataListener {
    private store: WaveStore;
    private key: string;
    private refreshRateMs: number;
    private onDataChanged: WaveDataListenerCallback;
    private interval?: number;
    private previousValue: any;

    constructor(store: WaveStore, key: string, refreshRateMs: number, onDataChanged: WaveDataListenerCallback) {
        this.store = store;
        this.key = key;
        this.refreshRateMs = refreshRateMs;
        this.onDataChanged = onDataChanged;
    };

    public start(): void {
        if (this.interval !== undefined)
            return console.error("Failed to start WaveDataListener since it is already running!");

        this.interval = setInterval(this.verifyChanges, this.refreshRateMs);
    };

    public stop(): void {
        if (this.interval === undefined)
            return console.error("Failed to stop WaveDataListener since it is not running!");

        clearInterval(this.interval);
    };

    private async verifyChanges() {
        const actualValue = this.store.data[this.key];

        if (this.previousValue === actualValue)
            return;

        const proxy = this.store.proxies[this.key];

        if (proxy) {
            this.store.data[this.key] = this.previousValue;

            const result = await proxy(actualValue);

            if (result) {
                this.store.data[this.key] = actualValue;
                this.onDataChanged(this.store, this.key);
                this.previousValue = actualValue;
            }

            return;
        }

        this.onDataChanged(this.store, this.key);
        this.previousValue = actualValue;
    };
 };

export default WaveDataListener;