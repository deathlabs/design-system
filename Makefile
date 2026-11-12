# ---------------------------------------------------------
# Set default value.
# ---------------------------------------------------------

.DEFAULT_GOAL := build
EXAMPLE_DIR := examples/web
WEB_DIR := web
GRYPE_FAILURE_THRESHOLD ?= medium
SBOM_PATH ?= design-system-sbom.json
DESIGN_SYSTEM_NAME := "@deathlabs/design-system"

# ---------------------------------------------------------
# Install dependencies.
# ---------------------------------------------------------

.PHONY: setup
.SILENT: setup
setup:
	echo "[*] Installing $(DESIGN_SYSTEM_NAME)'s dependencies"
	cd "$(WEB_DIR)" && npm ci
	cd "$(EXAMPLE_DIR)" && npm ci

# ---------------------------------------------------------
# Format the source code.
# ---------------------------------------------------------

.PHONY: format
.SILENT: format
format:
	echo "[*] Formatting $(DESIGN_SYSTEM_NAME)"
	cd "$(WEB_DIR)" && npm run format

# ---------------------------------------------------------
# Check the source code for lint.
# ---------------------------------------------------------

.PHONY: check
.SILENT: check
check:
	echo "[*] Checking $(DESIGN_SYSTEM_NAME)"
	cd "$(WEB_DIR)" && npm run check

# ---------------------------------------------------------
# Build.
# ---------------------------------------------------------

.PHONY: build
.SILENT: build
build:
	echo "[*] Building $(DESIGN_SYSTEM_NAME)"
	cd "$(WEB_DIR)" && npm run build

# ---------------------------------------------------------
# Test.
# ---------------------------------------------------------

.PHONY: test
.SILENT: test
test: build
	echo "[*] Testing $(DESIGN_SYSTEM_NAME)"
	cd "$(WEB_DIR)" && npm test

# ---------------------------------------------------------
# Generate an SBOM.
# ---------------------------------------------------------

.PHONY: sbom
.SILENT: sbom
sbom:
	echo "[*] Generating $(DESIGN_SYSTEM_NAME)'s SBOM"
	syft dir:./web \
		--select-catalogers +javascript-package-cataloger \
		-o cyclonedx-json="$(SBOM_PATH)"

# ---------------------------------------------------------
# Check the SBOM for third-party vulnerabilities.
# ---------------------------------------------------------

.PHONY: dependency-scan
.SILENT: dependency-scan
dependency-scan: sbom
	echo "[*] Updating the Grype vulnerability database"
	grype db update
	echo "[*] Checking $(DESIGN_SYSTEM_NAME)'s SBOM for third-party vulnerabilities"
	grype sbom:"$(SBOM_PATH)" --fail-on "$(GRYPE_FAILURE_THRESHOLD)"

# ---------------------------------------------------------
# Start a local demo.
# ---------------------------------------------------------

.PHONY: dev
.SILENT: dev
dev:
	cd "$(EXAMPLE_DIR)" && npm run dev
