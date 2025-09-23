# Icons

## Adding new icons

To add new icons, add a svg file to `./svgs` and then run `clean-svgs` and `build:icons`. This will clean up the svg code and generate a js file.

### Manual checks

- Ensure that the `svg` element uses viewBox and not height/width so that it is responsive.
- Ensure that there is not a wrapper `g` element which appears like `<g fill-rule="evenodd">`. the default `fill-rule` is `default` and often the paths inside such a `g` element will override the `evenodd` with `default`. Remove all defaults and add `evenodd` where needed or entirely if it makes no rendering difference.

### Add the icons to the index.js and iconMap

- Go to file: icons/index.js and add icon as export

- Go to file: icons/iconMap.js and import icon, and add them to the iconMap.
