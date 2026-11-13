#!/bin/sh

set -eu

# Use the default example when no path is supplied.
example_path="${1:-examples/vite-react-ts}"

# Start the example application from its configured directory.
echo "[*] Starting the example application"
cd "$example_path"
exec npm run dev
