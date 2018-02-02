import { test } from "ava";
import * as fse from "fs-extra-promise";
import * as path from "path";
import { track as trackTempFiles } from "temp";
import testedModule from "../src";

trackTempFiles();

test("no tests exist", async (t) => {
  t.truthy(testedModule(), "No tests, but otherwise fine");
});