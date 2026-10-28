/*
  Warnings:

  - You are about to drop the column `job_id` on the `ProgramingFramework` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `ProgramingLanguage` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ProgramingFramework] DROP CONSTRAINT [ProgramingFramework_job_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProgramingLanguage] DROP CONSTRAINT [ProgramingLanguage_jobId_fkey];

-- AlterTable
ALTER TABLE [dbo].[ProgramingFramework] DROP COLUMN [job_id];

-- AlterTable
ALTER TABLE [dbo].[ProgramingLanguage] DROP COLUMN [jobId];

-- CreateTable
CREATE TABLE [dbo].[userFavoriteCompany] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [userFavoriteCompany_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [userFavoriteCompany_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userFavoriteCompany_company_id_idx] ON [dbo].[userFavoriteCompany]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userFavoriteCompany_user_id_idx] ON [dbo].[userFavoriteCompany]([user_id]);

-- AddForeignKey
ALTER TABLE [dbo].[userFavoriteCompany] ADD CONSTRAINT [userFavoriteCompany_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[Company]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[userFavoriteCompany] ADD CONSTRAINT [userFavoriteCompany_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
