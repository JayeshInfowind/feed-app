const contentSchema = require("../models/content");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { MESSAGES } = require("../constant");

const uploadContent = async (req, res) => {
  try {
    const isUpload = new contentSchema(req.body);
    if (!isUpload) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.SOMETHING_WENT_WRONG,
        result: {},
      });
    }
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: MESSAGES.UPLOAD_IMAGE,
      });
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${isUpload._id}_${Date.now()}_content`,
      });

      isUpload.image = result.secure_url;
      await isUpload.save();

      // Remove temporary file from uploads directory
      fs.unlinkSync(req.file.path);

      res.status(201).json({
        success: true,
        message: MESSAGES.CONTENT_UPLOADED,
        result: isUpload,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const getContent = async (req, res) => {
  const perPage = 10;
  let page = parseInt(req.query.page, 10) || 1;
  if (page < 1) page = 1;
  try {
    const contents = await contentSchema
      .find()
      .limit(perPage)
      .skip(perPage * (page - 1))
      .sort({createdAt : -1})
    if (!contents) {
      return res.status(200).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_AVAILABLE,
        result: [],
      });
    }
    res.status(200).json({
      success: true,
      message: MESSAGES.CONTENT_FETCHED,
      result: contents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occurred: ${error.message}`,
    });
  }
};

module.exports = { uploadContent, getContent };
