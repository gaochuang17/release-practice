import assert from "node:assert/strict";
import test from "node:test";

import {
  getReleasePracticeMessage,
  releasePracticeMessage,
} from "./index.js";

test("returns the practice message", () => {
  assert.equal(getReleasePracticeMessage(), releasePracticeMessage);
});
