import test from "node:test";
import assert from "node:assert/strict";
import { generateTicketNumber } from "../src/controllers/booking.controller.js";

test("generateTicketNumber returns WV-YYYY-###### format", () => {
  const value = generateTicketNumber();

  assert.match(value, /^WV-\d{4}-\d{6}$/);
});
