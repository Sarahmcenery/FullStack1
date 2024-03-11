import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testBridgelists, dublin } from "../fixtures.js";

suite("Bridgelist Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.bridgelistStore.deleteAllBridgelists();
    for (let i = 0; i < testBridgelists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testBridgelists[i] = await db.bridgelistStore.addBridgelist(testBridgelists[i]);
    }
  });

  test("create a bridgelist", async () => {
    const bridgelist = await db.bridgelistStore.addBridgelist(dublin);
    assert.equal(dublin, bridgelist);
    assert.isDefined(bridgelist._id);
  });

  test("delete all bridgelists", async () => {
    let returnedBridgelists = await db.bridgelistStore.getAllBridgelists();
    assert.equal(returnedBridgelists.length, 3);
    await db.bridgelistStore.deleteAllBridgelists();
    returnedBridgelists = await db.bridgelistStore.getAllBridgelists();
    assert.equal(returnedBridgelists.length, 0);
  });

  test("get a bridgelist - success", async () => {
    const bridgelist = await db.bridgelistStore.addBridgelist(dublin);
    const returnedBridgelist = await db.bridgelistStore.getBridgelistById(bridgelist._id);
    // assert.equal(dublin, bridgelist);
    assert.Subset(dublin, bridgelist);
  });

  test("delete One Bridgelist - success", async () => {
    const id = testBridgelists[0]._id;
    await db.bridgelistStore.deletBridgelistById(id);
    const returnedBridgelists = await db.bridgelistStore.getAllBridgelists();
    assert.equal(returnedBridgelists.length, testBridgelists.length - 1);
    const deletedBridgelist = await db.bridgelistStore.getBridgelistById(id);
    assert.isNull(deletedBridgelist);
  });

  test("get a bridgelist - bad params", async () => {
    assert.isNull(await db.bridgelistStore.getBridgeistById(""));
    assert.isNull(await db.bridgelistStore.getBridgelistById());
  });

  test("delete One Bridgelist - fail", async () => {
    await db.bridgelistStore.deleteBridgelistById("bad-id");
    const allBridgelists = await db.bridgelistStore.getAllBridgelists();
    assert.equal(testBridgelists.length, allBridgelists.length);
  });
});