import joi from "joi";
import models from "../models";
import { ratingOne, ratingAll } from "../helpers/ratingValidation";
import constants from "../helpers/constants";

const { Rating, sequelize } = models;
const { NOT_FOUND, OK, INTERNAL_SERVER_ERROR, CONFLICT } = constants.statusCode;
class RatingController {
  /**
   * @description Create a rating for a blog post
   * @param  {Object} req - The request object.
   * @param  {Object} res - The response object.
   * @param  {Object} res - The next middleware.
   * @return {Object} - It returns the response object.
   */

  static create(req, res, next) {
    console.log("error", " == ", req.article, "====");
    const { slug } = req.params;
    const userId = req.user.id;
    const { rating } = req.body;
    const { article } = req;
    joi.validate({ slug, userId, rating }, ratingOne, (err, _value) => {
      if (err) {
        next(err);
      } else {
        Rating.create({ slug, userId, rating, articleId: article.id })
          .then(result => {
            /* eslint-disable no-underscore-dangle */
            if (result._options.isNewRecord) {
              res.status(201).json({
                message: "Article rated successfully",
                rating: result.dataValues
              });
            }
          })
          .catch(error => {
            if (
              error.name === "SequelizeForeignKeyConstraintError" &&
              error.index === "ratings_articleId_fkey"
            ) {
              res
                .status(NOT_FOUND)
                .json({ message: "Post you are looking for cannot be found" });
            } else if (
              error.parent.code === "23505" &&
              error.name === "SequelizeUniqueConstraintError"
            ) {
              res.status(CONFLICT).json({ message: "Cannot rate an article twice" });
            } else {
              res
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: "Please Try again later" });
            }
          });
      }
    });
  }
  /**
   * @description Get all rating for a post
   * @param  {Object} req - The request object.
   * @param  {Object} res - The response object.
   * @param  {Object} res - The next middleware.
   * @return {Object} - It returns the response object.
   */

  static async getAll(req, res, next) {
    const { slug } = req.params;
    const userId = req.user.id;
    const { article } = req;

    joi.validate({ userId, slug }, ratingAll, async (err, _value) => {
      if (err) {
        next(err);
      } else {
        try {
          const results = await Rating.findAll({
            raw: true,
            where: { articleId: article.id }
          });
          const averageRating = await Rating.findAll({
            attributes: [
              [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"]
            ],
            raw: true,
            where: { articleId: article.id }
          });
          res.status(OK).json({ ratings: results, averageRating: averageRating[0] });
        } catch (error) {
          res
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: "Please Try again later" });
        }
      }
    });
  }

  /**
   * @description Update a rating for a given post
   * @param  {Object} req - The request object.
   * @param  {Object} res - The response object.
   * @param  {Object} res - The next middleware.
   * @return {Object} - It returns the response object.
   */

  static update(req, res, next) {
    const { slug } = req.params;
    const userId = req.user.id;
    const { rating } = req.body;
    const { id: articleId } = req.article;
    joi.validate({ slug, userId, rating }, ratingOne, (err, _value) => {
      if (err) {
        next(err);
      } else {
        Rating.update({ rating }, { where: { articleId, userId } })
          .then(result => {
            if (result[0]) {
              res.status(OK).json({ message: "Article rating edited successfully" });
            } else {
              res
                .status(NOT_FOUND)
                .json({ message: "Rating  you are looking for cannot be found" });
            }
          })
          .catch(_error => {
            res
              .status(INTERNAL_SERVER_ERROR)
              .json({ message: "Please Try again later" });
          });
      }
    });
  }
}

export default RatingController;
