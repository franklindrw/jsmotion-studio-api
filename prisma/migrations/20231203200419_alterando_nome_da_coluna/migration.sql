/*
  Warnings:

  - You are about to drop the column `cor` on the `Categories` table. All the data in the column will be lost.
  - Added the required column `color` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "cor",
ADD COLUMN     "color" TEXT NOT NULL;
