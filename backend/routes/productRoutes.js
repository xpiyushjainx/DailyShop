import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

// 👉 Seed products (run once or whenever you want to reset)
router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});

    const sampleProducts = [
      // 🔹 Stationery
      {
        name: "Classic A5 Notebook",
        description: "A5 ruled notebook with 160 pages. Perfect for daily notes and journaling.",
        price: 99,
        image: "https://via.placeholder.com/300x200?text=Notebook+A5",
        inStock: true
      },
      {
        name: "Gel Pen Pack (Blue, 10 pcs)",
        description: "Smooth-writing blue gel pens. Pack of 10 for school and office use.",
        price: 149,
        image: "https://via.placeholder.com/300x200?text=Gel+Pens",
        inStock: true
      },
      {
        name: "Highlighter Set (5 colors)",
        description: "Bright and long-lasting highlighters in 5 essential colors.",
        price: 129,
        image: "https://via.placeholder.com/300x200?text=Highlighters",
        inStock: true
      },
      {
        name: "Sticky Notes 3-Pack",
        description: "Three pads of sticky notes in assorted colors. Great for reminders.",
        price: 79,
        image: "https://via.placeholder.com/300x200?text=Sticky+Notes",
        inStock: true
      },
      {
        name: "Desk Organizer Tray",
        description: "Multi-compartment tray to keep pens, clips and notes tidy.",
        price: 249,
        image: "https://via.placeholder.com/300x200?text=Desk+Organizer",
        inStock: true
      },

      // 🔹 Bottles & Mugs
      {
        name: "Stainless Steel Water Bottle 1L",
        description: "Insulated water bottle that keeps drinks cold for up to 12 hours.",
        price: 349,
        image: "https://via.placeholder.com/300x200?text=Steel+Bottle+1L",
        inStock: true
      },
      {
        name: "Classic Coffee Mug",
        description: "Ceramic mug with a comfortable handle. Microwave safe.",
        price: 199,
        image: "https://via.placeholder.com/300x200?text=Coffee+Mug",
        inStock: true
      },
      {
        name: "Travel Tumbler 500ml",
        description: "Leak-proof travel tumbler for coffee or tea on the go.",
        price: 399,
        image: "https://via.placeholder.com/300x200?text=Travel+Tumbler",
        inStock: true
      },
      {
        name: "Motivational Quote Bottle",
        description: "BPA-free plastic bottle with water level markers and quotes.",
        price: 259,
        image: "https://via.placeholder.com/300x200?text=Quote+Bottle",
        inStock: true
      },
      {
        name: "Infuser Water Bottle",
        description: "Add fruits inside the infuser core for naturally flavored water.",
        price: 429,
        image: "https://via.placeholder.com/300x200?text=Infuser+Bottle",
        inStock: true
      },

      // 🔹 Home & Kitchen
      {
        name: "Microfiber Cleaning Cloth (4 pcs)",
        description: "Reusable microfiber cloths for dusting and cleaning surfaces.",
        price: 189,
        image: "https://via.placeholder.com/300x200?text=Cleaning+Cloth",
        inStock: true
      },
      {
        name: "Multipurpose Storage Box",
        description: "Stackable plastic storage box with lid for home organization.",
        price: 299,
        image: "https://via.placeholder.com/300x200?text=Storage+Box",
        inStock: true
      },
      {
        name: "Spice Jar Set (6 pcs)",
        description: "Transparent spice jars with shaker lids for your daily spices.",
        price: 349,
        image: "https://via.placeholder.com/300x200?text=Spice+Jars",
        inStock: true
      },
      {
        name: "Stainless Steel Lunch Box",
        description: "Single-compartment lunch box with leak-proof lid.",
        price: 399,
        image: "https://via.placeholder.com/300x200?text=Lunch+Box",
        inStock: true
      },
      {
        name: "Non-stick Frying Pan 24cm",
        description: "Everyday frying pan for omelettes, cutlets and more.",
        price: 599,
        image: "https://via.placeholder.com/300x200?text=Frying+Pan",
        inStock: true
      },

      // 🔹 Personal Care
      {
        name: "Compact Hair Brush",
        description: "Pocket-size hair brush with soft bristles, easy to carry.",
        price: 129,
        image: "https://via.placeholder.com/300x200?text=Hair+Brush",
        inStock: true
      },
      {
        name: "Cotton Face Towels (Pack of 3)",
        description: "Soft cotton towels suitable for face and hand use.",
        price: 249,
        image: "https://via.placeholder.com/300x200?text=Face+Towels",
        inStock: true
      },
      {
        name: "Reusable Face Razor (Women)",
        description: "Gentle face razor for quick grooming and touch-ups.",
        price: 199,
        image: "https://via.placeholder.com/300x200?text=Face+Razor",
        inStock: true
      },
      {
        name: "Nail Clipper Set",
        description: "Set of 2 clippers for fingers and toes in stainless steel.",
        price: 149,
        image: "https://via.placeholder.com/300x200?text=Nail+Clippers",
        inStock: true
      },
      {
        name: "Travel Toiletry Pouch",
        description: "Water-resistant pouch to store toiletries and cosmetics.",
        price: 299,
        image: "https://via.placeholder.com/300x200?text=Toiletry+Pouch",
        inStock: true
      },

      // 🔹 Tech Accessories
      {
        name: "3-in-1 Charging Cable",
        description: "USB cable with Type-C, Micro USB and Lightning connectors.",
        price: 249,
        image: "https://via.placeholder.com/300x200?text=3-in-1+Cable",
        inStock: true
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic 2.4G wireless mouse with silent clicks.",
        price: 499,
        image: "https://via.placeholder.com/300x200?text=Wireless+Mouse",
        inStock: true
      },
      {
        name: "Phone Stand for Desk",
        description: "Adjustable stand for holding your phone while working.",
        price: 199,
        image: "https://via.placeholder.com/300x200?text=Phone+Stand",
        inStock: true
      },
      {
        name: "Laptop Sleeve 15.6 inch",
        description: "Padded laptop sleeve with zip closure and side pocket.",
        price: 599,
        image: "https://via.placeholder.com/300x200?text=Laptop+Sleeve",
        inStock: true
      },
      {
        name: "Cable Organizer Clips (6 pcs)",
        description: "Self-adhesive clips to keep your cables organized.",
        price: 129,
        image: "https://via.placeholder.com/300x200?text=Cable+Clips",
        inStock: true
      },

      // 🔹 Kitchen Daily Use
      {
        name: "Kitchen Scissors",
        description: "Multi-purpose scissors for cutting veggies and packets.",
        price: 179,
        image: "https://via.placeholder.com/300x200?text=Kitchen+Scissors",
        inStock: true
      },
      {
        name: "Silicone Spatula Set (2 pcs)",
        description: "Heat-resistant spatulas for cooking and baking.",
        price: 229,
        image: "https://via.placeholder.com/300x200?text=Silicone+Spatula",
        inStock: true
      },
      {
        name: "Measuring Spoons Set",
        description: "Set of 5 spoons for accurate measurements in cooking.",
        price: 149,
        image: "https://via.placeholder.com/300x200?text=Measuring+Spoons",
        inStock: true
      },
      {
        name: "Cutting Board Small",
        description: "Compact cutting board for fruits and vegetables.",
        price: 199,
        image: "https://via.placeholder.com/300x200?text=Cutting+Board",
        inStock: true
      },
      {
        name: "Oil Dispenser Bottle",
        description: "Glass bottle with pourer for cooking oil or vinegar.",
        price: 259,
        image: "https://via.placeholder.com/300x200?text=Oil+Dispenser",
        inStock: true
      },

      // 🔹 Household Utility
      {
        name: "Foldable Laundry Basket",
        description: "Lightweight fabric laundry basket, easy to store.",
        price: 399,
        image: "https://via.placeholder.com/300x200?text=Laundry+Basket",
        inStock: true
      },
      {
        name: "Door Hooks (Over-the-door, 5 Hooks)",
        description: "Metal door hanger for bags, towels and clothes.",
        price: 279,
        image: "https://via.placeholder.com/300x200?text=Door+Hooks",
        inStock: true
      },
      {
        name: "LED Night Lamp",
        description: "Plug-in night lamp with soft warm light for bedrooms.",
        price: 199,
        image: "https://via.placeholder.com/300x200?text=Night+Lamp",
        inStock: true
      },
      {
        name: "Non-slip Door Mat",
        description: "Everyday floor mat for entryways and bathrooms.",
        price: 349,
        image: "https://via.placeholder.com/300x200?text=Door+Mat",
        inStock: true
      },
      {
        name: "Multi-purpose Clips (12 pcs)",
        description: "Clips for snacks, documents or clothes.",
        price: 159,
        image: "https://via.placeholder.com/300x200?text=Multipurpose+Clips",
        inStock: true
      },

      // 🔹 Travel Essentials
      {
        name: "Neck Travel Pillow",
        description: "Soft U-shaped pillow for comfortable journeys.",
        price: 599,
        image: "https://via.placeholder.com/300x200?text=Travel+Pillow",
        inStock: true
      },
      {
        name: "Luggage Tag Set (2 pcs)",
        description: "Durable tags to identify your luggage easily.",
        price: 199,
        image: "https://via.placeholder.com/300x200?text=Luggage+Tags",
        inStock: true
      },
      {
        name: "Travel Bottle Set",
        description: "Small refillable bottles for shampoo, lotion and more.",
        price: 279,
        image: "https://via.placeholder.com/300x200?text=Travel+Bottles",
        inStock: true
      },
      {
        name: "Eye Mask with Ear Plugs",
        description: "Comfortable eye mask and ear plugs combo for sleeping.",
        price: 229,
        image: "https://via.placeholder.com/300x200?text=Eye+Mask",
        inStock: true
      },
      {
        name: "Mini Umbrella (Foldable)",
        description: "Compact umbrella that fits in bags and backpacks.",
        price: 499,
        image: "https://via.placeholder.com/300x200?text=Mini+Umbrella",
        inStock: true
      },

      // 🔹 Misc Daily Use
      {
        name: "Keychain with LED Light",
        description: "Metal keychain with a small built-in LED torch.",
        price: 149,
        image: "https://via.placeholder.com/300x200?text=LED+Keychain",
        inStock: true
      },
      {
        name: "Reusable Shopping Bag",
        description: "Foldable shopping bag that fits in your pocket.",
        price: 129,
        image: "https://via.placeholder.com/300x200?text=Shopping+Bag",
        inStock: true
      },
      {
        name: "Scented Candles (Set of 2)",
        description: "Mildly scented candles for a pleasant room atmosphere.",
        price: 299,
        image: "https://via.placeholder.com/300x200?text=Scented+Candles",
        inStock: true
      },
      {
        name: "Magnetic Whiteboard Small",
        description: "Small magnetic whiteboard for notes and reminders.",
        price: 399,
        image: "https://via.placeholder.com/300x200?text=Whiteboard",
        inStock: true
      },
      {
        name: "Portable Hand Mirror",
        description: "Compact mirror with protective cover for daily use.",
        price: 99,
        image: "https://via.placeholder.com/300x200?text=Hand+Mirror",
        inStock: true
      }
    ];

    const created = await Product.insertMany(sampleProducts);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 👉 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 👉 Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
