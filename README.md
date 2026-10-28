# timefy: YouTube playlist duration summary

timefy is a JavaScript browser-extension prototype that aggregates loaded thumbnail timestamps on YouTube playlist pages and adds a duration summary beside the page statistics.

## 1. How it works

The content script reads thumbnail timestamps in `mm:ss` or `hh:mm:ss` format, converts them into seconds, and adds the values together. It inserts a padded duration label into `#stats` and uses a tooltip to show the raw total in seconds.

Scrolling triggers recalculation so newly loaded entries can contribute. An existing summary element is updated rather than duplicated. The extension counts timestamp elements already present in the page; playlist loading remains the page's responsibility.

## 2. Structure

- `manifest.json`: Manifest V2 declaration, YouTube playlist URL matching, content scripts, and icons.
- `timefy.js`: timestamp parsing, aggregation, scroll handling, and display updates.
- `thirdParty/jquery-3.5.1.slim.min.js`: bundled jQuery dependency.

The extension loads its scripts directly. The repository has no package installation or build script.

## 3. Local loading workflow

In a development environment that supports this Manifest V2 format:

1. Load the repository folder as a temporary or unpacked extension.
2. Open a YouTube playlist page matched by the manifest.
3. Inspect the duration summary beside the playlist statistics and its seconds tooltip.
4. Scroll to let the page load more entries and trigger recalculation.

Compatibility depends on browser manifest support and the page structure expected by the selectors.

## 4. Learning and limitations

The project connects DOM inspection, timestamp conversion, aggregation, and synchronization between a changing page and an injected summary.

- A partially loaded playlist produces a partial total; the script does not fetch all entries independently.
- The timestamp selector is page-wide, so matching thumbnails outside the playlist list can also affect the sum.
- The initial timestamp-discovery loop has no timeout.
- Scroll events trigger a full recount without throttling or debouncing.
- The formatter can leave `60` in the minutes field near whole-hour boundaries because it reduces minutes only while `m > 60`.
- Timestamp parsing expects numeric `mm:ss` or `hh:mm:ss` values; live and unavailable-video labels receive no explicit handling.
- Manifest V2, historical thumbnail selectors, and the `#stats` insertion point constrain compatibility. Single-page navigation is not handled explicitly.

## 5. License

MIT. See `LICENSE`.
