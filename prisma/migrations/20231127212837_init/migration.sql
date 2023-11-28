-- CreateTable
CREATE TABLE "Product" (
    "id_product" TEXT NOT NULL,
    "producer_creator" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "Producer" (
    "id_producer" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_product_key" ON "Product"("id_product");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_id_producer_key" ON "Producer"("id_producer");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_producer_creator_fkey" FOREIGN KEY ("producer_creator") REFERENCES "Producer"("id_producer") ON DELETE RESTRICT ON UPDATE CASCADE;
