# ---------------------------------------------------------
# Development settings.
# ---------------------------------------------------------

SHELL := /bin/bash
.DEFAULT_GOAL := dev

EXAMPLE_PATH ?= examples/vite-react-ts

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
	set -m; \
		npm run build -- --watch & \
		watcher_pid=$$!; \
		cleanup() { \
			status=$$?; \
			trap - EXIT INT TERM; \
			echo "[*] Stopping the component library watcher"; \
			kill -- -$$watcher_pid 2>/dev/null || true; \
			wait $$watcher_pid 2>/dev/null || true; \
			exit $$status; \
		}; \
		trap cleanup EXIT INT TERM; \
		echo "[*] Starting the example application"; \
		cd "$(EXAMPLE_PATH)" && npm run dev
