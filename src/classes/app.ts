import WaveDataListener from "./dataListener";
import WaveStore from "./store";

class WaveApp {
    private refreshRateMs: number;
    private mountedElement?: Element;
    private nativeStore: WaveStore;
    private store: WaveStore;

    constructor(refreshRateMs: number = 10) {
        this.refreshRateMs = refreshRateMs;
        this.nativeStore = new WaveStore();
        this.store = this.nativeStore;
    };

    public mount(selector: string) {
        if (this.mountedElement)
            return console.error("Failed to mount app since it is already mounted!");

        const element = document.querySelector(selector);

        if (!element)
            return console.error("Failed to mount app since the element was not found!");

        this.mountedElement = element;
        
        this.initializeMountedElement();
    };

    public useStore(store: WaveStore) {
        if (this.mountedElement)
            return console.error("Cannot change store when the app has been mounted!");

        this.store = store;
    };

    public useNativeStore() {
        if (this.mountedElement)
            return console.error("Cannot change store when the app has been mounted!");
        
        this.store = this.nativeStore;
    };

    private initializeMountedElement() {
        if (!this.mountedElement)
            return console.error("App is not mounted!");

        const keys = Object.keys(this.store.data);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = this.store.data[key];

            const elements = this.mountedElement.getElementsByTagName("*");

            const listener = new WaveDataListener(this.store, key, this.refreshRateMs, (changedKey: string) => { this.onDataChange(changedKey); });
            this.store.dataListeners[key] = listener;
            listener.start();

            for (let j = 0; j < elements.length; j++) {
                const element = elements[j];

                if (!element.innerHTML.includes(`{{ ${key} }}`))
                    continue;

                element.innerHTML = element.innerHTML.replaceAll(`{{ ${key} }}`, `<span wave-data="${key}">${value}</span>`);
            }
        }
    };

    private onDataChange(changedKey: string) {
        if (!this.mountedElement)
            return console.error("App is not mounted!");

        const elements = this.mountedElement.querySelectorAll(`[wave-data="${changedKey}"]`);
        const value = this.store.data[changedKey];

        for (let j = 0; j < elements.length; j++)
            elements[j].innerHTML = value;
    }
};

export default WaveApp;