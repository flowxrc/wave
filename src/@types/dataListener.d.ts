import WaveStore from "../classes/store";

declare global {
    type WaveDataListenerCallback = (changedKey: string) => void;
}