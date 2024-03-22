import WaveErrors from "../extra/errors";
import WaveParser from "../extra/parser";
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
            return console.error(WaveErrors.alreadyMounted);

        const element = document.querySelector(selector);

        if (!element)
            return console.error(WaveErrors.unknownElement);

        this.mountedElement = element;
        
        this.initializeMountedElement();
        this.updateConditionals();
    };

    public unmount() {
        if (!this.mountedElement)
            return console.error(WaveErrors.notMounted);

        const keys = Object.keys(this.store.data);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const elements = this.mountedElement.querySelectorAll(`[wave-data="${key}"]`);

            for (let j = 0; j < elements.length; j++)
                elements[j].outerHTML = `{{ ${key} }}`;

            const listener = this.store.dataListeners[key];

            if (!listener)
                continue;

            listener.stop();
            delete this.store.dataListeners[key];
        }

        const conditionElements = this.mountedElement.querySelectorAll("[wave-condition]");

        for (let i = 0; i < conditionElements.length; i++) {
            const element = conditionElements[i] as HTMLElement;
            element.style.display = "";
        }

        this.mountedElement = undefined;
    };

    public useStore(store: WaveStore) {
        if (this.mountedElement)
            return console.error(WaveErrors.alreadyMounted);

        this.store = store;
    };

    public useNativeStore() {
        if (this.mountedElement)
            return console.error(WaveErrors.alreadyMounted);
        
        this.store = this.nativeStore;
    };

    private initializeMountedElement() {
        if (!this.mountedElement)
            return console.error(WaveErrors.notMounted);

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
            return console.error(WaveErrors.notMounted);

        const elements = this.mountedElement.querySelectorAll(`[wave-data="${changedKey}"]`);
        const value = this.store.data[changedKey];

        for (let j = 0; j < elements.length; j++)
            elements[j].innerHTML = value;

        this.updateConditionals();
    };

    private updateConditionals() {
        if (!this.mountedElement)
            return console.error(WaveErrors.notMounted);

        const elements = this.mountedElement.querySelectorAll("[wave-condition]");

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            const attribute = element.getAttribute("wave-condition");

            if (!attribute)
                continue;

            const conditionsMet = WaveParser.parseCondition(attribute, this.store);

            element.style.display = conditionsMet ? "" : "none";
        }
    };
};

export default WaveApp;