# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.15.0]
### Changed
- Build execution environments with Browserify and LavaMoat ([#159](https://github.com/MetaMask/iframe-execution-environment/pull/159))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.32.0`
- Harden events ([#159](https://github.com/MetaMask/iframe-execution-environment/pull/159))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.32.0`

### Fixed
- Fix unbound endowments ([#159](https://github.com/MetaMask/iframe-execution-environment/pull/159))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.32.0`

## [0.14.0]
### Changed
- Disallow requesting `eth_requestAccounts` and `wallet_requestSnaps` RPC methods ([#147](https://github.com/MetaMask/iframe-execution-environment/pull/147))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.31.0`

## [0.13.0]
### Changed
- Harden and constrain all endowments ([#134](https://github.com/MetaMask/iframe-execution-environment/pull/134), [#137](https://github.com/MetaMask/iframe-execution-environment/pull/137))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.30.0`

### Removed
- Removed `WebAssembly` by default ([#137](https://github.com/MetaMask/iframe-execution-environment/pull/137))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.30.0`
  - Snaps must now request `endowment:webassembly` to get access to `WebAssembly`

## [0.12.0]
### Removed
- Removed `WebSocket` endowment ([#129](https://github.com/MetaMask/iframe-execution-environment/pull/129))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.28.0`

## [0.11.1]
### Fixed
- Fix usage of wrong `ethereum` global for `ethereum` endowment ([#118](https://github.com/MetaMask/iframe-execution-environment/pull/118))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.26.2`

## [0.11.0]
### Added
- Add transaction insight caveat for accessing transaction origin ([#103](https://github.com/MetaMask/iframe-execution-environment/pull/103))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.24.0`
- Add `Math` endowment factory ([#103](https://github.com/MetaMask/iframe-execution-environment/pull/103))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.24.0`

### Changed
- **BREAKING:** Remove `wallet` global in favor of `snap` and `ethereum` ([#103](https://github.com/MetaMask/iframe-execution-environment/pull/103))
  - Accomplished by bumping `@metamask/snaps-execution-environments` to `0.24.0`

## [0.10.0]
### Added
- Add snap cronjobs ([#101](https://github.com/MetaMask/iframe-execution-environment/pull/101))
  - Accomplished by bumping `@metamask/execution-environments` to `0.23.0`

### Changed
- **BREAKING:** Replace Buffer with Typed Arrays ([#101](https://github.com/MetaMask/iframe-execution-environment/pull/101))
  - Accomplished by bumping `@metamask/execution-environments` to `0.23.0`
- Improve execution environment type validation ([#101](https://github.com/MetaMask/iframe-execution-environment/pull/101))
  - Accomplished by bumping `@metamask/execution-environments` to `0.23.0`

## [0.9.1]
### Fixed
- Throw an error when response is unserializable ([#98](https://github.com/MetaMask/iframe-execution-environment/pull/98))
  - Accomplished by bumping `@metamask/execution-environments` to `0.22.2`

## [0.9.0]
### Added
- Add Snap Keyring support ([#95](https://github.com/MetaMask/iframe-execution-environment/pull/95))
  - Accomplished by bumping `@metamask/execution-environments` to `0.22.0`

## [0.8.0]
### Removed
- **BREAKING:** Remove origin parameter from transaction insight payload ([#92](https://github.com/MetaMask/iframe-execution-environment/pull/92))
  - Accomplished by bumping `@metamask/execution-environments` to `0.21.0`

## [0.7.0]
### Added
- **BREAKING:** Add Transaction Insight API ([#90](https://github.com/MetaMask/iframe-execution-environment/pull/90))
  - Accomplished by updating `@metamask/execution-environments` to `0.20.0`.
  - Part of this change made changes to the execution environments to support multiple request handlers, hence the breaking change.

## [0.6.0]
### Fixed
- Send valid JSON-RPC notifications from executors ([#87](https://github.com/MetaMask/iframe-execution-environment/pull/87))
  - Accomplished by updating `@metamask/execution-environments` to `0.19.0`.

## [0.5.2]
### Fixed
- Fix error serialization issues ([#84](https://github.com/MetaMask/iframe-execution-environment/pull/84))
  - Accomplished by updating `@metamask/execution-environments` to `0.18.1`.

## [0.5.1]
### Added
- Added network endowment teardown ([#81](https://github.com/MetaMask/iframe-execution-environment/pull/81))
  - Accomplished by updating `@metamask/execution-environments` to `0.18.0`.

### Changed
- Monitor outbound snap requests to pause request timeout ([#81](https://github.com/MetaMask/iframe-execution-environment/pull/81))
  - Accomplished by updating `@metamask/execution-environments` to `0.18.0`.

## [0.5.0]
### Changed
- **BREAKING:** Snaps are now required to export `onRpcRequest` to receive RPC requests  ([#78](https://github.com/MetaMask/iframe-execution-environment/pull/78))
  - Accomplished by updating `@metamask/execution-environments` to `0.16.0`.
- Snaps can no longer run timers outside of pending RPC requests  ([#78](https://github.com/MetaMask/iframe-execution-environment/pull/78))
  - Accomplished by updating `@metamask/execution-environments` to `0.16.0`.

### Removed
- **BREAKING:** Remove `wallet.registerRpcMessageHandler support` ([#78](https://github.com/MetaMask/iframe-execution-environment/pull/78))
  - Accomplished by updating `@metamask/execution-environments` to `0.16.0`.

### Fixed
- Fix issue with iframe error reporting ([#78](https://github.com/MetaMask/iframe-execution-environment/pull/78))
  - Accomplished by updating `@metamask/execution-environments` to `0.16.0`.

## [0.4.6]
### Fixed
- Added missing properties to WebAssembly global ([#75](https://github.com/MetaMask/iframe-execution-environment/pull/75))
  - Accomplished by updating `@metamask/execution-environments` to `0.15.0`.
- Fix interval handle leak ([#75](https://github.com/MetaMask/iframe-execution-environment/pull/75))
  - Accomplished by updating `@metamask/execution-environments` to `0.15.0`.
- Fix timer handle leak ([#75](https://github.com/MetaMask/iframe-execution-environment/pull/75))
  - Accomplished by updating `@metamask/execution-environments` to `0.15.0`.

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

[Unreleased]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.15.0...HEAD
[0.15.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.9.1...v0.10.0
[0.9.1]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.5.2...v0.6.0
[0.5.2]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.6...v0.5.0
[0.4.6]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.4.5...v0.4.6
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
