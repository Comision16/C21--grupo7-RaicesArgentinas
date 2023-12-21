const db = require("../../database/models");

const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      include: [
        {
          association: "products",
          attributes: ["id", "title", "price", "discount"],
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      data: categories,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      attributes: ["title", "id"],
    });

    return res.status(200).json({
      ok: true,
      data: categories,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

const getSections = async (req, res) => {
  try {
    const sections = await db.Section.findAll({
      attributes: ["title", "id"],
    });

    return res.status(200).json({
      ok: true,
      data: sections,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

const getRegions = async (req, res) => {
  try {
    const regions = await db.Region.findAll({
      attributes: ["title", "id"],
    });

    return res.status(200).json({
      ok: true,
      data: categories,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};



const getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: ["section", "category", "region", "images"],
    });

    return res.status(200).json({
      ok: true,
      data: products,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

const createProductDash = async (req, res) => {
  try {
    const { title, categoryId, sectionId,regionId, price, discount, amount, amountmin, description } =
      req.body;

    const newProduct = await db.Product.create({
      title: title?.trim(),
      categoryId,
      sectionId,
      regionId,
      discount: discount || 0,
      price,
      amount,
      amountmin,
      description: description?.trim(),
    });

    const product = await db.Product.findByPk(newProduct.id,{
      include: ["section", "category", "region", "images"],
    })

    return res.status(200).json({
      ok: true,
      data: product,
      msg: "Producto agregado con éxito",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
      data: null,
    });
  }
};

const updateProductDash = async (req, res) => {
  try {
    const {  title, categoryId, sectionId,regionId, price, discount, amount, amountmin, description } =
      req.body;

    await db.Product.update(
      {
        title: title?.trim(),
      categoryId,
      sectionId,
      regionId,
      discount: discount || 0,
      price,
      amount,
      amountmin,
      description: description?.trim(),
      },
      {
        where : {
          id : req.params.id
        }
      }
    );

    const product = await db.Product.findByPk(req.params.id,{
      include: ["section", "category", "region", "images"],
    })

    return res.status(200).json({
      ok: true,
      data: product,
      msg: "Producto actualizado con éxito",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
      data: null,
    });
  }
};


const deleteProductDash = async (req,res) => {
  try {
    await db.Product.destroy({
      where : {
        id : req.params.id
      }
    })
    return res.status(200).json({
      ok: true,
      data: null,
      msg: "Producto eliminado con éxito",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
      data: null,
    });
  }
}

module.exports = {
  getCategoriesWithProducts,
  getCategories,

  createProductDash,
  updateProductDash,
  deleteProductDash,
  getSections,
  getRegions
};