# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.5]
### Added
- Add support for endowment teardown ([#69](https://github.com/MetaMask/iframe-execution-environment/pull/69))
  - Accomplished by updating `@metamask/execution-environments` to `0.12.0`.
### Changed
- Bump cross-fetch from 2.2.5 to 2.2.6 ([#70](https://github.com/MetaMask/iframe-execution-environment/pull/70))

## [0.4.4]
### Changed
- Bump `@metamask/execution-environments` to `0.11.0` and `ses` to `0.15.15` ([#65](https://github.com/MetaMask/iframe-execution-environment/pull/65))
- Bump minimist from 1.2.5 to 1.2.6 ([#62](https://github.com/MetaMask/iframe-execution-environment/pull/62))

## [0.4.3]
### Added
- Add setInterval and clearInterval as default endowments ([#61](https://github.com/MetaMask/iframe-execution-environment/pull/61))
  - Accomplished by updating `@metamask/execution-environments` to `0.10.7`.

### Changed
- **BREAKING:** Bump minimum Node version from 12 to 14 ([#61](https://github.com/MetaMask/iframe-execution-environment/pull/61))
  - Accomplished by updating `@metamask/execution-environments` to `0.10.7`.

### Fixed
- Fix missing properties on WebAssembly endowment ([#61](https://github.com/MetaMask/iframe-execution-environment/pull/61))
  - Accomplished by updating `@metamask/execution-environments` to `0.10.7`.

## [0.4.2]
### Fixed
- Fix function endowments ([#58](https://github.com/MetaMask/iframe-execution-environment/pull/58))
  - Accomplished by updating `@metamask/execution-environments` to `0.10.6`.
  - [#56](https://github.com/MetaMask/iframe-execution-environment/pull/56) fixed class endowments but broke function endowments. Both should now work as expected.

## [0.4.1]
### Fixed
- Fix function and class endowments ([#56](https://github.com/MetaMask/iframe-execution-environment/pull/56))
  - Accomplished by updating `@metamask/execution-environments` to `0.10.4`.

## [0.4.0]
### Changed
- **BREAKING:** Use [@metamask/execution-environments](https://npmjs.com/package/@metamask/execution-environments) ([#52](https://github.com/MetaMask/iframe-execution-environment/pull/52))
  - The implementation of the execution environment has moved from this package to `@metamask/execution-environments`, and several breaking changes were introduced. See the [changelog of the new package](https://github.com/MetaMask/snaps-skunkworks/blob/main/packages/execution-environments/CHANGELOG.md#0100) for details.

## [0.3.1]
### Added
- Optional `endowments` param to `executeSnap` RPC method ([#39](https://github.com/MetaMask/iframe-execution-environment/pull/39))

### Changed
- **BREAKING:** Update ses to `^0.15.3` and harden all named intrinsics ([#42](https://github.com/MetaMask/iframe-execution-environment/pull/42))
  - This is unlikely to be breaking for consumers, but it _could_ cause behavioral changes.

### Fixed
- **BREAKING:** SES `Compartment` endowment safety issues ([#40](https://github.com/MetaMask/iframe-execution-environment/pull/40))
  - This required removing some endowments that were previously available by default.

## [0.3.0]
### Added
- Versioned deployment ([#36](https://github.com/MetaMask/iframe-execution-environment/pull/36), [#37](https://github.com/MetaMask/iframe-execution-environment/pull/37))
  - Future versions of this project will be published to GitHub pages at `https://metamask.github.io/iframe-execution-environment/<version>`, where `<version>` is a version of this project. Previous versions will be retained on GitHub pages so that breaking changes to the execution environment API does not break existing uses of this project.
  - We will temporarily retain the current version, [0.2.0], of this project at `https://metamask.github.io/iframe-execution-environment` to avoid breaking existing uses of this project. The [0.2.0] distribution of this project will be removed in the near future.

## [0.2.0]
### Changed
- **BREAKING:** Enforce consistent naming for Snaps-related functionality ([#31](https://github.com/MetaMask/iframe-execution-environment/pull/31))

## [0.1.0]
### Changed
- Restore name of `handshake` method to `ping` ([#29](https://github.com/MetaMask/iframe-execution-environment/pull/29))

## [0.0.7]
### Added
- Uncaught promise rejection error handling ([#24](https://github.com/MetaMask/iframe-execution-environment/pull/24))

## [0.0.6]
### Fixed
- Stop responding twice in case of RPC method errors ([#21](https://github.com/MetaMask/iframe-execution-environment/pull/21))
  - We were sending a second, faulty response from the execution environment whenever an RPC method errored. This is now fixed.

## [0.0.5]
### Added
- JSON-RPC Error support for `executePlugin` ([#19](https://github.com/MetaMask/iframe-execution-environment/pull/19))

## [0.0.4]
### Added
- Link to instructions to try it out ([#14](https://github.com/MetaMask/iframe-execution-environment/pull/14))

### Removed
- Stream name override for the MetaMask provider ([#17](https://github.com/MetaMask/iframe-execution-environment/pull/17))
  - This fixes compatibility with the MetaMask extension.

## [0.0.3]
### Changed
- Bump @metamask/auto-changelog from 2.4.0 to 2.5.0 ([#10](https://github.com/MetaMask/iframe-execution-environment/pull/10))

### Removed
- Removed ajv based json validator ([#12](https://github.com/MetaMask/iframe-execution-environment/pull/12))

## [0.0.2]
### Added
- Install step in publish-release.yml ([#8](https://github.com/MetaMask/iframe-execution-environment/pull/8))

## [0.0.1]
### Added
- Initial implementation of an iframe execution environment for MetaMask Snaps, using `WindowPostMessageStream` for transport.

[Unreleased]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.5...HEAD
[0.4.5]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.4...v0.4.5
[0.4.4]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.3...v0.4.4
[0.4.3]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.7...v0.1.0
[0.0.7]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/MetaMask/iframe-execution-environment/releases/tag/v0.0.1
