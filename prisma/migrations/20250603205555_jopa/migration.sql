/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_name_key" ON "Teacher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
