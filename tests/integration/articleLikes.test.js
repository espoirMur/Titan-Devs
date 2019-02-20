import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../index";
import { article, users } from "../helpers/testData";

chai.use(chaiHttp);
const { dummyUser } = users;
describe("ArticleLike Controller", () => {
  let slug;
  let token;
  before(async () => {
    await chai
      .request(app)
      .post("/api/v1/users")
      .send({ ...dummyUser });
    const results = await chai
      .request(app)
      .post("/api/v1/users/login")
      .send({
        email: dummyUser.email,
        password: dummyUser.password
      });
    ({ token } = results.body);
    const articleResult = await chai
      .request(app)
      .post("/api/v1/articles")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...article });
    ({
      article: { slug }
    } = articleResult.body);
  });
<<<<<<< HEAD

=======
>>>>>>> [#163518692]Enable user to like or dislike an article
  describe("article fetch and like", () => {
    describe("Like", () => {
      it("should allow  user to like an article", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}/likes`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(201);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("message");
            expect(response.body.message).to.be.eql("Successfully liked");
            done();
          });
      });
<<<<<<< HEAD

      it("should remove like when user try to like article twice", done => {
=======
      it("should deslike article when user try to like article twice", done => {
>>>>>>> [#163518692]Enable user to like or dislike an article
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}/likes`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
<<<<<<< HEAD
            expect(response.status).eql(200);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("message");
            expect(response.body.message).to.be.eql("Unliked successfully");
            done();
          });
      });

=======
            expect(response.status).eql(202);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("message");
            expect(response.body.message).to.be.eql("Successfully disliked");
            done();
          });
      });
>>>>>>> [#163518692]Enable user to like or dislike an article
      it("should fail on non existing slug", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}i97/likes`)
          .set({
            Authorization: `Bearer ${token}`
          })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(404);
            expect(response.body).to.an("object");
            expect(response.body)
              .to.have.property("message")
              .eql("Article not found");
            done();
          });
      });
<<<<<<< HEAD

=======
>>>>>>> [#163518692]Enable user to like or dislike an article
      it("should if user is not authenticated", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}/likes`)
          .set({ Authorization: `Bear ${token}yi` })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(401);
            done();
          });
      });
    });

    describe("Dislike", () => {
<<<<<<< HEAD
      it("should allow  user to dislike an article", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}/dislikes`)
=======
      it("should allow  user to like an article", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}/likes`)
>>>>>>> [#163518692]Enable user to like or dislike an article
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(201);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("message");
<<<<<<< HEAD
            expect(response.body.message).to.be.eql("Successfully disliked");
            done();
          });
      });

      it("should remove dislike if user try to hit dislike twice", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}/dislikes`)
=======
            expect(response.body.message).to.be.eql("Successfully liked");
            done();
          });
      });
      it("should allow  user to deslike an article", done => {
        chai
          .request(app)
          .delete(`/api/v1/articles/${slug}/likes`)
>>>>>>> [#163518692]Enable user to like or dislike an article
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
<<<<<<< HEAD
            expect(response.status).eql(200);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("message");
            expect(response.body.message).to.be.eql("Successfully removed dislike");
            done();
          });
      });

      it("should fail on non existing slug", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}i97/dislikes`)
=======
            expect(response.status).eql(202);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("message");
            expect(response.body.message).to.be.eql("Successfully disliked");
            done();
          });
      });
      it("should fail on non existing slug", done => {
        chai
          .request(app)
          .delete(`/api/v1/articles/${slug}i97/likes`)
>>>>>>> [#163518692]Enable user to like or dislike an article
          .set({
            Authorization: `Bearer ${token}`
          })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(404);
            expect(response.body).to.an("object");
            expect(response.body)
              .to.have.property("message")
              .eql("Article not found");
            done();
          });
      });
<<<<<<< HEAD

      it("should if user is not authenticated", done => {
        chai
          .request(app)
          .post(`/api/v1/articles/${slug}/dislikes`)
=======
      it("should if user is not authenticated", done => {
        chai
          .request(app)
          .delete(`/api/v1/articles/${slug}/likes`)
>>>>>>> [#163518692]Enable user to like or dislike an article
          .set({ Authorization: `Bear ${token}yi` })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(401);
            done();
          });
      });
    });

    describe("Article likes fetch", () => {
      it("should retrieve article with likes", done => {
        chai
          .request(app)
<<<<<<< HEAD
          .get(`/api/v1/articles/${slug}/likes`)
=======
          .get(`/api/v1/articles/${slug}`)
>>>>>>> [#163518692]Enable user to like or dislike an article
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(200);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("article");
            expect(response.body.article).to.have.property("id");
            expect(response.body.article).to.have.property("title");
            expect(response.body.article).to.have.property("body");
            expect(response.body.article).to.have.property("likes");
            expect(response.body.article.likes)
              .to.be.an("array")
              .length(0);
            done();
          });
      });
<<<<<<< HEAD

      it("should return not found on non existing slug", done => {
        chai
          .request(app)
          .get(`/api/v1/articles/${slug}i97/likes`)
=======
      it("should return not found on non existing slug", done => {
        chai
          .request(app)
          .get(`/api/v1/articles/${slug}i97`)
>>>>>>> [#163518692]Enable user to like or dislike an article
          .set({
            Authorization: `Bearer ${token}`
          })
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(404);
            expect(response.body).to.an("object");
            expect(response.body).to.have.property("message");
            expect(response.body.message).eql("Article not found");
            done();
          });
      });
<<<<<<< HEAD

=======
>>>>>>> [#163518692]Enable user to like or dislike an article
      it("should if user is not authenticated", done => {
        chai
          .request(app)
          .get(`/api/v1/articles/${slug}`)
<<<<<<< HEAD
          .set({ Authorization: `Bear ${token}yi/likes` })
=======
          .set({ Authorization: `Bear ${token}yi` })
>>>>>>> [#163518692]Enable user to like or dislike an article
          .end((err, response) => {
            if (err) {
              return done(err);
            }
            expect(response.status).eql(401);
            done();
          });
      });
    });
  });
});