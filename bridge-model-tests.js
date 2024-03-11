import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testBridgelists, testBridges, dublin, cork, suspension, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Bridge Model tests", () => {

  let dublinList = null;

  setup(async () => {
    db.init("mongo");
    await db.bridgelistStore.deleteAllBridgelists();
    await db.bridgeStore.deleteAllBridges();
    dublinList = await db.bridgelistStore.addBridgelist(dublin);
    for (let i = 0; i < testBridges.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testBridges[i] = await db.bridgeStore.addBridge(dublinList._id, testBridges[i]);
    }
  });

  test("get multiple bridges", async () => {
    const bridges = await db.bridgeStore.getBridgesByBridgelistId(dublinList._id);
    assert.equal(bridges.length, testBridges.length)
  });

  test("delete all bridges", async () => {
    const bridges = await db.bridgeStore.getAllBridges();
    assert.equal(testBridges.length, bridges.length);
    await db.bridgeStore.deleteAllBridges();
    const newBridges = await db.bridgeStore.getAllBridges();
    assert.equal(0, newBridges.length);
  });

  test("get a bridge - success", async () => {
    const corkList = await db.bridgelistStore.addBridgelist(cork);
    const bridge = await db.bridgeStore.addBridge(corkList._id, suspension)
    const newBridge = await db.bridgeStore.getBridgeById(bridge._id);
    assertSubset (suspension, newBridge);
  });

  test("delete One Bridge - success", async () => {
    await db.bridgeStore.deleteBridge(testBridges[0]._id);
    const bridges = await db.bridgeStore.getAllBridges();
    assert.equal(bridges.length, testBridgelists.length - 1);
    const deletedBridge = await db.bridgeStore.getBridgeById(testBridges[0]._id);
    assert.isNull(deletedBridge);
  });
  test("get a bridge - bad params", async () => {
    assert.isNull(await db.bridgeStore.getBridgeById(""));
    assert.isNull(await db.bridgeStore.getBridgeById());
  });

  test("delete one bridge - fail", async () => {
    await db.bridgeStore.deleteBridge("bad-id");
    const bridges = await db.bridgeStore.getAllBridges();
    assert.equal(bridges.length, testBridgelists.length);
  });
});