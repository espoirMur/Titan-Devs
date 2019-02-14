import chai from "chai";
import chaiHttp from "chai-http";
import {
  mockSocialAuth,
  mockSocialAuthNonUser,
  dummyUser
} from "../../helpers/socialAuthHelpers";

import app from "../../../index";

const { expect } = chai;

chai.use(chaiHttp);

describe("mocking social authentication with facebook", () => {
  it("should redirect a user to profile page with data", done => {
    mockSocialAuth("https://www.facebook.com/");
    chai
      .request(app)
      .get("/api/v1/auth/facebook")
      .end((err, res) => {
        expect(res.redirect).to.be.equals(true);
        expect(res.status).to.be.equal(302);
        expect(res.header.location).to.be.equals(
          `/api/v1/profile/${dummyUser.username}`
        );
        done();
      });
  });
  it("should redirect when the callback is called", done => {
    mockSocialAuth("https://www.facebook.com/");
    chai
      .request(app)
      .get("/api/v1/auth/facebook/callback")
      .end((err, res) => {
        expect(res.redirect).to.be.equals(true);
        expect(res.status).to.be.equal(302);
        expect(res.header.location).to.be.equals(
          `/api/v1/profile/${dummyUser.username}`
        );
        done();
      });
  });
  it("should return error if user object is not available", done => {
    mockSocialAuthNonUser("https://www.facebook.com/");
    chai
      .request(app)
      .get("/api/v1/auth/facebook")
      .end((err, res) => {
        expect(res.body.status).to.be.eql("failed");
        expect(res.body.msg).to.be.eql("Bad Request");
        expect(res.body.user).to.be.an("undefined");
        done();
      });
  });
});
