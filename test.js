const app = require("./simpleApp");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Test customer endpoint", () => {
    it("Should get an Alice", done => {
      chai
        .request(app)
        .get("/customers/alice")
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.name).to.equals("Alice");
            expect(res.body.surname).to.equals("Cooper");
            done();
        });
    });
  
    it("Should not get anything", done => {
      chai
        .request(app)
        .get("/customers/anyIdThatNotExist")
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });
});

describe("Test product endpoint", () => {
    it("Should get a Mustard", done => {
      chai
        .request(app)
        .get("/products/mustard")
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.name).to.equals("Mustard");
            expect(res.body.price).to.equals("10.0");
            done();
        });
    });
  
    it("Should not get anything", done => {
      chai
        .request(app)
        .get("/product/anyIdThatNotExist")
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });
});


describe("Test multiple endpoint", () => {
    it("Should be 200", done => {
      chai
        .request(app)
        .get("/multiple/?alice=/customers/alice")
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
  
});