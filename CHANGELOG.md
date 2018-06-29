# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
- _empty_

## [1.4.1] - 2018-06-29
### Fixed
- Skip svg files with missing viewBox attribute

## [1.4.0] - 2018-05-01
### Added
- Added CLI options - thx [stramel](https://github.com/stramel)
### Fixed
- Trim style attribute before parsing - thx [stramel](https://github.com/stramel)
- Allow negative values in viewBox - thx [stramel](https://github.com/stramel)

## [1.3.2] - 2017-10-18
### Added
- Coverage reports
### Changed
- Refactoring

## [1.3.1] - 2017-10-16
### Fixed
- Fix test suite dependencies

## [1.3.0] - 2017-10-16
### Fixed
- Update to React 16

## [1.2.3] - 2017-10-02
### Fixed
- Fixed viewBox parsing: allow floats, allow origins other than zero

## [1.2.2] - 2017-09-15
### Fixed
- Use file content for hash, instead of file path
- Consecutive child tags broke the output

## [1.2.0] - 2017-09-15
### Fixed
- Consecutive child tags broke the output
### Changed
- Moved from mocha to jest for testing

## [1.1.4] - 2017-08-29
### Added
- Use full path for id hashes

## [1.1.3] - 2017-08-29
### Added
- Generate unique id attributes, to avoid conflicts in DOM (fixes IE11 google analytics bug, when clicking on svg elements)

## [1.1.0] - 2017-07-28
### Added
- Snapshot testing with [enzyme](https://github.com/airbnb/enzyme)

## [1.0.8] - 2017-07-10
### Added
- Travis CI
- Documentation and credits in [README.md](./README.md)

## [1.0.4 - 1.0.7] - 2017-07-06
### Fixed
- Typos and version bumps

## [1.0.4] - 2017-07-06
### Added
- Basic unit tests
- A changelog
### Fixed
- accept empty strings in `camelCase` and `pascalCase` helper methods

## [1.0.3] - 2017-07-06
### Removed
- yarn dependency

## [1.0.2] - 2017-07-05
### Fixed
- Attributes comma separation bug

## [1.0.1] - 2017-07-05
### Fixed
- npm bump

## [1.0.0] - 2017-07-05
### Added
- Initial release
