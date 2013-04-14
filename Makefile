
build: components
	@component build --dev --out _attachments/build

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
