-- CreateTable
CREATE TABLE "Images" (
    "id_image" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_id_image_key" ON "Images"("id_image");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_id_image_fkey" FOREIGN KEY ("id_image") REFERENCES "Producer"("id_producer") ON DELETE RESTRICT ON UPDATE CASCADE;
