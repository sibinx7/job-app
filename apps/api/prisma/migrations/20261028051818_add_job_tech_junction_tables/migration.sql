/*
  Warnings:

  - You are about to drop the column `programing_frameowork_id` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `programing_langugage_id` on the `Job` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Job] DROP COLUMN [programing_frameowork_id],
[programing_langugage_id];

-- CreateTable
CREATE TABLE [dbo].[JobProgrammingLanguage] (
    [jobId] INT NOT NULL,
    [programmingLanguageId] INT NOT NULL,
    CONSTRAINT [JobProgrammingLanguage_pkey] PRIMARY KEY CLUSTERED ([jobId],[programmingLanguageId])
);

-- CreateTable
CREATE TABLE [dbo].[JobProgrammingFramework] (
    [jobId] INT NOT NULL,
    [programmingFrameworkId] INT NOT NULL,
    CONSTRAINT [JobProgrammingFramework_pkey] PRIMARY KEY CLUSTERED ([jobId],[programmingFrameworkId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [JobProgrammingLanguage_programmingLanguageId_idx] ON [dbo].[JobProgrammingLanguage]([programmingLanguageId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [JobProgrammingFramework_programmingFrameworkId_idx] ON [dbo].[JobProgrammingFramework]([programmingFrameworkId]);

-- AddForeignKey
ALTER TABLE [dbo].[JobProgrammingLanguage] ADD CONSTRAINT [JobProgrammingLanguage_jobId_fkey] FOREIGN KEY ([jobId]) REFERENCES [dbo].[Job]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobProgrammingLanguage] ADD CONSTRAINT [JobProgrammingLanguage_programmingLanguageId_fkey] FOREIGN KEY ([programmingLanguageId]) REFERENCES [dbo].[ProgramingLanguage]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobProgrammingFramework] ADD CONSTRAINT [JobProgrammingFramework_jobId_fkey] FOREIGN KEY ([jobId]) REFERENCES [dbo].[Job]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobProgrammingFramework] ADD CONSTRAINT [JobProgrammingFramework_programmingFrameworkId_fkey] FOREIGN KEY ([programmingFrameworkId]) REFERENCES [dbo].[ProgramingFramework]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
