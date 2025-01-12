/*
  Warnings:

  - You are about to drop the column `code` on the `password_reset_session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "password_reset_session" DROP COLUMN "code";
