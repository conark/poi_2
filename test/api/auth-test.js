import { assert } from "chai";
import { placeService } from "./place-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    placeService.clearAuth();
    await placeService.createUser(maggie);
    await placeService.authenticate(maggie);
    await placeService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await placeService.createUser(maggie);
    const response = await placeService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await placeService.createUser(maggie);
    const response = await placeService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    placeService.clearAuth();
    try {
      await placeService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
