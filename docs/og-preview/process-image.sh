#!/bin/bash
# Usage: ./process-image.sh <input-path> <output-filename>
# Example: ./process-image.sh ~/Downloads/gpt-image.png chapter-3.jpg
#
# Resizes to 1600px wide, converts to JPG quality 82,
# saves to public/images/journal/your-hdb-looks-young-inside-its-old/

set -e

if [ $# -lt 2 ]; then
  echo "Usage: $0 <input-path> <output-filename>"
  echo "Example: $0 ~/Downloads/gpt-image.png chapter-3.jpg"
  exit 1
fi

INPUT="$1"
OUTPUT_NAME="$2"
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUTDIR="$REPO_ROOT/public/images/journal/your-hdb-looks-young-inside-its-old"
OUTPUT="$OUTDIR/$OUTPUT_NAME"

mkdir -p "$OUTDIR"

# Copy to a temp location first (sips modifies in place)
TMP="/tmp/$(basename "$INPUT")"
cp "$INPUT" "$TMP"

# Resize to 1600px max width, preserving aspect ratio
sips --resampleWidth 1600 "$TMP" --out "$OUTPUT.tmp" > /dev/null

# Convert to JPG at quality 82 (sips quality scale is 0-1, so 0.82)
sips -s format jpeg -s formatOptions 82 "$OUTPUT.tmp" --out "$OUTPUT" > /dev/null

rm -f "$TMP" "$OUTPUT.tmp"

echo "✓ Saved: $OUTPUT"
echo "  Dimensions: $(sips -g pixelWidth -g pixelHeight "$OUTPUT" | grep -E 'pixel(Width|Height)' | awk '{print $2}' | paste -sd 'x' -)"
echo "  File size: $(du -h "$OUTPUT" | awk '{print $1}')"
