const userroute = require("../userRoute");
const express = require("express");
const supertest = require("supertest"); //
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(userroute);
const request = supertest(app);

var email = "harshini" + Date.now() + "@gmail.com";
var password = "TestPassword";
var displayName = "Test" + Date.now();
var id;
var token;
var userObject;

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://articlesHB:articlesHB123@cluster0.na6kn.mongodb.net/articlesDB",
    { useNewUrlParser: true }
  );
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

//test suit
describe("Test cases related to user routes", () => {
  console.log("Mail address : " + email);
  console.log("Password : " + password);
  console.log("Display name : " + displayName);

  it("Creating user", async (done) => {
    const res = await request.post("/register").send({
      email: email,
      password: password,
      passwordCheck: password,
      displayName: displayName,
    });
    expect(res.body._id).toBeTruthy();
    id = res.body._id;
    expect(res.body.email).toBeTruthy();
    expect(res.body.displayName).toBeTruthy();
    expect(res.body.email).toBe(email);
    expect(res.body.displayName).toBe(displayName);
    done();
  });

  it("Logging in user", async (done) => {
    const res = await request.post("/login").send({
      email: email,
      password: password,
    });
    expect(res.body.token).toBeTruthy();
    token = res.body.token;
    userObject = res.body.user;
    expect(res.body.user.displayName).toBeTruthy(); //exist
    expect(res.body.user.id).toBeTruthy();
    expect(res.body.user.id).toBe(id); //matching
    expect(res.body.user.displayName).toBe(displayName);
    done();
  });

  it("Verify authentication token", async (done) => {
    const res = await request
      .post("/tokenIsValid")
      .set("x-auth-token", token)
      .send({});
    expect(res.body).toBeTruthy();
    expect(res.body).toBe(true);
    done();
  });

  it("Deleting user", async (done) => {
    const res = await request
      .delete("/delete")
      .set("x-auth-token", token)
      .send({
        user: userObject,
      });
    expect(res.body._id).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.displayName).toBeTruthy();
    expect(res.body._id).toBe(id);
    expect(res.body.email).toBe(email);
    expect(res.body.displayName).toBe(displayName);
    done();
  });
});
