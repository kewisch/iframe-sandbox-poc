# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
# Portions Copyright (C) Philipp Kewisch, 2019

HASH = $(subst /,\/,$(shell shasum -b -a 512 playground/sandbox.js | awk '{ print $$1 }' | xxd -r -p | base64))

updatehash:
	@echo Updating hash
	@sed -e 's/sha512-[^'"'"']*/sha512-$(HASH)/' manifest.json > manifest.json~ && mv manifest.json~ manifest.json
