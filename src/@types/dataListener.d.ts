import WaveStore from "../classes/store";

declare global {
    type WaveDataListenerCallback = (changedStore: WaveStore, changedKey: string) => void;
}