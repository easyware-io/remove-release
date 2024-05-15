# easyware-io/remove-release@v1

![CI](https://github.com/easyware-io/remove-release/actions/workflows/build.yml/badge.svg)

Removes a release from a repo.

## Usage

### Basic usage

```yaml
- name: Get release
  uses: easyware-io/remove-release@v1
  with:
    tag_name: v1.0.0
    token: ${{ secrets.GITHUB_TOKEN }}
    owner: <optional>
    repo: <optional>
```
