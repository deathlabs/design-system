# ---------------------------------------------------------
# Set default values.
# ---------------------------------------------------------

.DEFAULT_GOAL := dev
EXAMPLE ?= vite-react-ts
GRYPE_FAIL_ON ?= medium
GRYPE_FILE ?= scan.json
SBOM_FILE ?= sbom.json
SEMGREP_CONFIG ?= auto
SYFT_CONFIG ?= .syft.yaml

# ---------------------------------------------------------
# Build the component library.
# ---------------------------------------------------------

.PHONY: build
.SILENT: build
build:
	npm run build

# ---------------------------------------------------------
# Lint the source code.
# ---------------------------------------------------------

.PHONY: lint
.SILENT: lint
lint:
	npm run lint

# ---------------------------------------------------------
# Format the source code.
# ---------------------------------------------------------

.PHONY: format
.SILENT: format
format:
	npm run format

# ---------------------------------------------------------
# Perform unit tests.
# ---------------------------------------------------------

.PHONY: tests
.SILENT: tests
tests:
	npm test

# ---------------------------------------------------------
# Perform a SAST scan.
# ---------------------------------------------------------

.PHONY: sast
.SILENT: sast
sast:
	semgrep scan --config "$(SEMGREP_CONFIG)" .

# ---------------------------------------------------------
# Generate an SBOM.
# ---------------------------------------------------------

.PHONY: sbom
.SILENT: sbom
sbom:
	syft scan dir:. --config "$(SYFT_CONFIG)" --output "cyclonedx-json=$(SBOM_FILE)"

# ---------------------------------------------------------
# Scan for third-party vulnerabilities.
# ---------------------------------------------------------

.PHONY: dependency-scan
.SILENT: dependency-scan
dependency-scan: sbom
	grype "sbom:$(SBOM_FILE)" --fail-on "$(GRYPE_FAIL_ON)" --output json --file "$(GRYPE_FILE)"

# ---------------------------------------------------------
# Start the example application.
# ---------------------------------------------------------

.PHONY: dev
.SILENT: dev
dev: build
	echo "[*] Starting the example application"
	cd "examples/$(EXAMPLE)" && npm run dev
