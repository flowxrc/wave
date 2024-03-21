class WaveApp {
    private refreshRateMs: number;
    private mountedElement?: Element;

    constructor(refreshRateMs: number = 10) {
        this.refreshRateMs = refreshRateMs;
    };

    public mount(selector: string) {
        const element = document.querySelector(selector);

        if (!element)
            return console.error("Failed to mount app since the element was not found");

        
    };
};

export default WaveApp;