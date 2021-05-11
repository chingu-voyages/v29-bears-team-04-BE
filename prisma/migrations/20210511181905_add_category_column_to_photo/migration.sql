/*
  Warnings:

  - Added the required column `category` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "category" TEXT NOT NULL;
