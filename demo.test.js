const { joinParty, sum, checkUser } = require("./demo");

describe("demo.js", () => {
  describe("sum", () => {
    it.each`
      a     | b    | result
      ${1}  | ${2} | ${3}
      ${3}  | ${5} | ${8}
      ${12} | ${5} | ${17}
    `("when a is $a and b is $b", ({ a, b, result }) => {
      expect(sum(a, b)).toBe(result);
    });
  });

  describe("Player management", () => {
    describe("checkUser", () => {
      beforeAll(() => {
        // Arrange
        global.alert = jest.fn();
      });

      test("when user is less than 18 age not alerts", () => {
        //    Act
        checkUser({
          age: 25,
        });

        //    Assert
        expect(global.alert).not.toHaveBeenCalled();
      });
      test("when user is bigger than 18 age alerts", () => {
        //    Act
        checkUser({
          age: 2,
        });

        //    Assert
        expect(global.alert).toHaveBeenCalled();
      });
    });

    describe("joinParty", () => {
      it("Should move player to leaders shard", () => {
        expect.hasAssertions();

        //    Arrange
        const LEADER_SHARD_ID = 2;
        const leader = { id: 1, shardId: LEADER_SHARD_ID };
        const player = { id: 2, shardId: 5 };

        //    Act
        joinParty({ leader, player });

        //    Assert
        expect(player.shardId).toBe(LEADER_SHARD_ID);
      });
    });
  });
});
