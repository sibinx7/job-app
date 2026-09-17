/*
  Warnings:

  - You are about to drop the column `technology` on the `CompanyTechnology` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CompanyTechnology] DROP COLUMN [technology];

-- CreateTable
CREATE TABLE [dbo].[CompanyTechnologyProgramingLanguage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_technology_id] INT NOT NULL,
    [programming_language_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CompanyTechnologyProgramingLanguage_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [CompanyTechnologyProgramingLanguage_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CompanyTechnologyProgramingLanguage_company_technology_id_programming_language_id_key] UNIQUE NONCLUSTERED ([company_technology_id],[programming_language_id])
);

-- CreateTable
CREATE TABLE [dbo].[CompanyTechnologyFramework] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_technology_id] INT NOT NULL,
    [programming_framework_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CompanyTechnologyFramework_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [CompanyTechnologyFramework_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CompanyTechnologyFramework_company_technology_id_programming_framework_id_key] UNIQUE NONCLUSTERED ([company_technology_id],[programming_framework_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyTechnologyProgramingLanguage_company_technology_id_idx] ON [dbo].[CompanyTechnologyProgramingLanguage]([company_technology_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyTechnologyProgramingLanguage_programming_language_id_idx] ON [dbo].[CompanyTechnologyProgramingLanguage]([programming_language_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyTechnologyFramework_company_technology_id_idx] ON [dbo].[CompanyTechnologyFramework]([company_technology_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyTechnologyFramework_programming_framework_id_idx] ON [dbo].[CompanyTechnologyFramework]([programming_framework_id]);

-- AddForeignKey
ALTER TABLE [dbo].[CompanyTechnologyProgramingLanguage] ADD CONSTRAINT [CompanyTechnologyProgramingLanguage_company_technology_id_fkey] FOREIGN KEY ([company_technology_id]) REFERENCES [dbo].[CompanyTechnology]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyTechnologyProgramingLanguage] ADD CONSTRAINT [CompanyTechnologyProgramingLanguage_programming_language_id_fkey] FOREIGN KEY ([programming_language_id]) REFERENCES [dbo].[ProgramingLanguage]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyTechnologyFramework] ADD CONSTRAINT [CompanyTechnologyFramework_company_technology_id_fkey] FOREIGN KEY ([company_technology_id]) REFERENCES [dbo].[CompanyTechnology]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyTechnologyFramework] ADD CONSTRAINT [CompanyTechnologyFramework_programming_framework_id_fkey] FOREIGN KEY ([programming_framework_id]) REFERENCES [dbo].[ProgramingFramework]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
