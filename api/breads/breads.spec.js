const request = require("supertest");

const server = require("../server.js");
const db = require("../../data/dbConfig.js");
const Breads = require("../breads/breadsModel.js");

describe("breads.js", () => {
  beforeEach(async () => {
    await db("breads").truncate();
  });

  describe("GET /breads", () => {
    it("returns status 200", () => {
      return request(server)
        .get("/breads")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return a list of breads", async () => {
      await Breads.add([
        { name: "Naan" },
        { name: "Dinner Roll" },
        { name: "Flatbread" }
      ]);
      const res = await request(server).get("/breads");

      expect(res.body.length).toBeGreaterThan(2);
    });
  });

  describe("POST /breads", () => {
    it("should add a new bread, 'Pizza Crust'", async () => {
      const id = await Breads.add({ name: "Pizza Crust" });
      let bread = await db("breads")
        .where(id)
        .first();

      expect(bread.name).toBe("Pizza Crust");
    });

    it("should be length of 3", async () => {
      await Breads.add([
        { name: "Naan" },
        { name: "Dinner Roll" },
        { name: "Flatbread" }
      ]);
      const res = await request(server).get("/breads");

      expect(res.body.length).toEqual(3);
    });

    it("returns status 200", () => {
      const pizza = { name: "Pizza Crust" };
      console.log("pizza", pizza);
      return request(server)
        .post("/breads")
        .send(pizza)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("DELETE /breads", () => {
    it("should respond with 200 OK", async () => {
      const id = await Breads.add({ name: "Pizza Crust" });

      let breads = await request(server).get("/breads");

      expect(breads.body.length).toEqual(1);

      return request(server)
        .delete(`/breads/${id}`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should remove bread with id 1 from db", async () => {
      const id = await Breads.add({ name: "Pizza Crust" });
      let bread = await db("breads")
        .where(id)
        .first();
      let breads = await request(server).get("/breads");

      expect(breads.body.length).toEqual(1);

      await Breads.removeById(bread.id);

      breads = await request(server).get("/breads");

      expect(breads.body.length).toEqual(0);
    });
  });
});
