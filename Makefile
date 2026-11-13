# ---------------------------------------------------------
# Set default values.
# ---------------------------------------------------------

.DEFAULT_GOAL := dev
EXAMPLE ?= vite-react-ts

# ---------------------------------------------------------
# Build the component library.
# ---------------------------------------------------------

.PHONY: build
.SILENT: build
build:
	npm run build

# ---------------------------------------------------------
# Start the component library watcher and example app.
# ---------------------------------------------------------

.PHONY: dev
.SILENT: dev
dev: build
	./scripts/dev.sh "examples/$(EXAMPLE)"
