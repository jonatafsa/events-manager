import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import uploadConfig from "./config/upload";
import { join } from "path";

const app = express();
const upload = multer(uploadConfig);

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(join(__dirname, "uploads")));

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/events", async (request, response) => {
  const events = await prisma.event.findMany({});

  return response.json(events);
});

app.post(
  "/event-create",
  upload.array("image"),
  async (request, response, cb) => {
    const body: any = request.body;
    const price = String(body.price)
      .replace(".", "")
      .replace(",", "")
      .replace(/\D/g, "");

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const event = await prisma.event.create({
      data: {
        image: "http://localhost:3333/uploads/" + images[0].path,
        title: body.title,
        status: body.status,
        date: new Date(Number(body.date)),
        details: body.details,
        location: body.location,
        productors: body.productors,
        price: Number(price),
      },
    });

    return response.status(201).json(event);
  }
);

app.delete("/event/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const event = await prisma.event.delete({
    where: {
      id,
    },
  });

  return res.json("evento deletado");
});

app.patch("/event/:id", async (req, res) => {
  const { id } = req.params;
  const status = req.body.status;
  console.log(status);

  const event = await prisma.event.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return res.json(event);
});

app.listen(3333);
