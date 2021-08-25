# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.6...HEAD
[0.0.6]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/MetaMask/iframe-execution-environment/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/MetaMask/iframe-execution-environment/releases/tag/v0.0.1
