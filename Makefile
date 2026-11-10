# ---------------------------------------------------------
# Set default value.
# ---------------------------------------------------------

.DEFAULT_GOAL := build
DEMO_DIR := demo
GRYPE_FAILURE_THRESHOLD ?= medium
SBOM_PATH ?= mui-theme-provider-sbom.json
THEME_PROVIDER_NAME := "@deathlabs/mui-theme-provider"

# ---------------------------------------------------------
# Install dependencies.
# ---------------------------------------------------------

.PHONY: setup
.SILENT: setup
setup:
	echo "[*] Installing $(THEME_PROVIDER_NAME)'s NPM dependencies"
	npm ci
	cd "$(DEMO_DIR)" && npm ci

# ---------------------------------------------------------
# Format the provider source files.
# ---------------------------------------------------------

.PHONY: format
.SILENT: format
format:
	echo "[*] Formatting $(THEME_PROVIDER_NAME)"
	npm run format

# ---------------------------------------------------------
# Check the provider source files.
# ---------------------------------------------------------

.PHONY: check
.SILENT: check
check:
	echo "[*] Checking $(THEME_PROVIDER_NAME)"
	npm run check

# ---------------------------------------------------------
# Build the provider.
# ---------------------------------------------------------

.PHONY: build
.SILENT: build
build:
	echo "[*] Building $(THEME_PROVIDER_NAME)"
	npm run build

# ---------------------------------------------------------
# Test the provider.
# ---------------------------------------------------------

.PHONY: test
.SILENT: test
test: build
	echo "[*] Testing $(THEME_PROVIDER_NAME)"
	npm test

# ---------------------------------------------------------
# Generate an SBOM for the provider.
# ---------------------------------------------------------

.PHONY: sbom
.SILENT: sbom
sbom:
	echo "[*] Generating $(THEME_PROVIDER_NAME)'s SBOM"
	syft dir:. \
		--select-catalogers +javascript-package-cataloger \
		-o cyclonedx-json="$(SBOM_PATH)"

# ---------------------------------------------------------
# Check the provider's SBOM for third-party vulnerabilities.
# ---------------------------------------------------------

.PHONY: dependency-scan
.SILENT: dependency-scan
dependency-scan: sbom
	echo "[*] Updating the Grype vulnerability database"
	grype db update
	echo "[*] Checking $(THEME_PROVIDER_NAME)'s SBOM for third-party vulnerabilities"
	grype sbom:"$(SBOM_PATH)" --fail-on "$(GRYPE_FAILURE_THRESHOLD)"

# ---------------------------------------------------------
# Start the local demo.
# ---------------------------------------------------------

.PHONY: dev
.SILENT: dev
dev:
	cd "$(DEMO_DIR)" && npm run dev
