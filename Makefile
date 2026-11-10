# ---------------------------------------------------------
# Default settings.
# ---------------------------------------------------------

.DEFAULT_GOAL := test
THEME_PROVIDER_NAME := "@deathlabs/mui-theme-provider"

# ---------------------------------------------------------
# Install the locked Node.js dependencies.
# ---------------------------------------------------------

.PHONY: setup
.SILENT: setup
setup:
	echo "[*] Installing $(THEME_PROVIDER_NAME)'s NPM dependencies"
	npm ci

# ---------------------------------------------------------
# Build the package.
# ---------------------------------------------------------

.PHONY: build
.SILENT: build
build:
	echo "[*] Building $(THEME_PROVIDER_NAME)"
	npm run build

# ---------------------------------------------------------
# Run the test suite.
# ---------------------------------------------------------

.PHONY: test
.SILENT: test
test:
	echo "[*] Testing $(THEME_PROVIDER_NAME)"
	npm test
