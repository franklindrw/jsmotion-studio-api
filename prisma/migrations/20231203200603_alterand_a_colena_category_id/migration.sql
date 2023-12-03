/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Videos` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_categoryId_fkey";

-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
