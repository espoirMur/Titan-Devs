import { assert } from "chai";
import config from "../config/index";

const { equal } = assert;
const assert = require("chai").assert;
const equal = require("chai").assert.equal;
const addTwo = (a, b) => {
  return parseFloat(a) + parseFloat(b);
};
describe("/addTwo ", () => {
  it("It should return sum of two number", done => {
    const sum = addTwo(2, 4);
    equal(sum, 6);
    done();
  });
  it("It should return secret", done => {
    assert.equal(secret, "secret");
    equal(secret, "secret");
    done();
  });
});
