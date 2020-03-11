import { parseConfig, intoParams } from "../src/util";
import * as assert from "assert";

describe("util", () => {
  describe("infoParams", () => {
    it("transforms a config into diff params for heads", () => {
      assert.deepStrictEqual(
        intoParams({
          githubToken: "aeiou",
          githubRef: "refs/heads/branch",
          githubRepository: "owner/repo",
          fileFilters: {}
        }),
        {
          base: "master",
          head: "branch",
          owner: "owner",
          repo: "repo"
        }
      );
    });
    it("preserves git flow style refs", () => {
      assert.deepStrictEqual(
        intoParams({
          githubToken: "aeiou",
          githubRef: "refs/heads/feature/branch",
          githubRepository: "owner/repo",
          fileFilters: {}
        }),
        {
          base: "master",
          head: "feature%2Fbranch",
          owner: "owner",
          repo: "repo"
        }
      );
    });
  });
  describe("parseConfig", () => {
    it("parses configuration from env", () => {
      assert.deepStrictEqual(
        parseConfig({
          GITHUB_REF: "head/refs/test",
          GITHUB_REPOSITORY: "softprops/diffset",
          GITHUB_TOKEN: "aeiou",
          INPUT_FOO_FILES: "*.foo",
          INPUT_BAR: "ignored"
        }),
        {
          githubRef: "head/refs/test",
          githubRepository: "softprops/diffset",
          githubToken: "aeiou",
          base: undefined,
          fileFilters: {
            foo_files: "*.foo"
          }
        }
      );
    });
    it("parses configuration from env including custom base", () => {
      assert.deepStrictEqual(
        parseConfig({
          GITHUB_REF: "head/refs/test",
          GITHUB_REPOSITORY: "softprops/diffset",
          GITHUB_TOKEN: "aeiou",
          INPUT_FOO_FILES: "*.foo",
          INPUT_BASE: "develop",
          INPUT_BAR: "ignored"
        }),
        {
          githubRef: "head/refs/test",
          githubRepository: "softprops/diffset",
          githubToken: "aeiou",
          base: "develop",
          fileFilters: {
            foo_files: "*.foo"
          }
        }
      );
    });
  });
});
