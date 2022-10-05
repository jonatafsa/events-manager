-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "details" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "productors" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
