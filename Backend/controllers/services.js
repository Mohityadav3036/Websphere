import { Service } from "../models/Service.js";

 const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("reviews")
      .populate("ServiceProvider", "name email"); // Only populate required fields
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch services." });
  }
};
export {getAllServices}