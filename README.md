# New Tab Toast

New Tab Toast is a browser extension that shows in-browser toast notifications when links are opened in background tabs.

## Features

- Displays toast notifications for new background tabs.
- Customizable toast appearance.

## Installation

1. Clone the repository or download the source code.
2. Open your browser and navigate to the extensions page (e.g., `chrome://extensions/` for Chrome or `about:addons` for Firefox).
3. Enable "Developer mode" if required.
4. Click on "Load unpacked" and select the directory containing the source code.

## Usage

Once installed, the extension will automatically show toast notifications when links are opened in background tabs.

## Files

- `background.js`: Handles background tasks and message passing.
- `toast.js`: Manages the creation and display of toast notifications.
- `toast.css`: Styles for the toast notifications.
- `manifest.json`: Extension manifest file.

## Development

To modify the extension, edit the source files and reload the extension in your browser.

### `background.js`

Handles background tasks such as message queueing and tab events.

### `toast.js`

Manages the creation and display of toast notifications.

### `toast.css`

Contains styles for the toast notifications.

### `manifest.json`

Defines the extension's metadata and permissions.

## License

This project is licensed under the MIT License.

## Author

Nemanja Djurcic