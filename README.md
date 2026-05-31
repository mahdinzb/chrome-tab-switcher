# Auto Tab Switcher for Chrome

A simple and lightweight Chrome extension designed for monitoring setups (like dashboards, Grafana, Kibana). It automatically cycles through your **pinned tabs** at a user-defined interval.

## Why this extension?
If you have a monitor displaying multiple dashboards, you often need to switch between them manually. This extension automates that process for you. By specifically targeting **pinned tabs**, it ensures that your non-pinned tabs (e.g., other tools or static pages) remain unaffected and stay in place.

## Features
- **Pinned Tab Targeting:** Only switches between tabs that are pinned, allowing you to keep other tabs fixed.
- **Customizable Interval:** Set your desired switching speed in seconds via a simple popup interface.
- **Easy Control:** Start and stop the cycle whenever you want with a single click.
- **Lightweight:** Built with Manifest V3 for modern Chrome compatibility and performance.

## How to Install
1. Download or clone this repository to your local machine.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click on **Load unpacked** and select the folder where you saved the files.
5. Click the extension icon in your browser toolbar, enter your desired interval, and hit **Start**!

## How to use for Monitoring
1. Open a Chrome window on your dedicated monitor.
2. Open your dashboards (e.g., Grafana, Kibana, etc.).
3. **Pin** the tabs you want to include in the cycle (Right-click the tab > Pin).
4. Do **not** pin the tabs that you want to keep static.
5. Start the extension, and it will only cycle through the pinned tabs.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
