/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Producer_email_key" ON "Producer"("email");
