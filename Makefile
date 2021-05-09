DIST_DIR = dist
APP_VERSION = 1.0.0
APP_NAME = electron-win-app
DOCKER_BUILDER_IMAGE = electronuserland/builder:wine

.PHONY: help

help:
	@echo "\
--- docker ---\n\
docker-build:               build exe in docker\n\
docker-pull-image:          pull docker builder image\n\
docker-run-image:           run builder image\n\
--- common ---\n\
clean:                      clean /dist folder\n\
pack:                       create destribution package\n\
version:                    get app version\n\
set-version:                set app version\n\
"

# docker commands

docker-build: clean set-version docker-pull-image docker-run-image

docker-pull-image:
	docker pull $(DOCKER_BUILDER_IMAGE)

docker-run-image:
	docker run --rm -ti \
	--env ELECTRON_CACHE="/root/.cache/electron" \
	--env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
	-v ${PWD}/$(DIST_DIR):/project \
	electronuserland/builder:wine \
	/bin/bash -c "yarn && yarn electron-build"


# common

install-dev:
	yarn

clean:
	if [ -d "$(DIST_DIR)" ]; then rm -Rf $(DIST_DIR); fi
	mkdir -p "$(DIST_DIR)"

	if [ -d ".webpack" ]; then rm -Rf .webpack; fi
	mkdir -p ".webpack"

pack:
	yarn webpack-prod
	cp -rf .webpack/* $(DIST_DIR)/
	cp -rf build $(DIST_DIR)/
	cp yarn.lock $(DIST_DIR)/
	cp package.json $(DIST_DIR)/

version:
	@echo $(APP_VERSION)

set-version:
	sed -i 's/"version": ".*"/"version": "$(APP_VERSION)"/g' package.json
