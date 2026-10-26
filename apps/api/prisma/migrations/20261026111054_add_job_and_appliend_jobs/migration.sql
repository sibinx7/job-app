BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProgramingFramework] ADD [job_id] INT;

-- AlterTable
ALTER TABLE [dbo].[ProgramingLanguage] ADD [jobId] INT;

-- CreateTable
CREATE TABLE [dbo].[Job] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Job_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    [company_id] INT NOT NULL,
    [posted_by_id] INT NOT NULL,
    [programing_langugage_id] INT NOT NULL,
    [programing_frameowork_id] INT NOT NULL,
    CONSTRAINT [Job_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserAppliedJob] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [job_id] INT NOT NULL,
    [cover_letter] NVARCHAR(1000) NOT NULL,
    [resume_url] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [UserAppliedJob_status_df] DEFAULT 'APPLIED',
    [applied_at] DATETIME2 NOT NULL CONSTRAINT [UserAppliedJob_applied_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [company_status] NVARCHAR(1000) NOT NULL CONSTRAINT [UserAppliedJob_company_status_df] DEFAULT 'PENDING',
    [company_status_updated_at] DATETIME2,
    [deleted] BIT NOT NULL CONSTRAINT [UserAppliedJob_deleted_df] DEFAULT 0,
    [deleted_at] DATETIME2,
    CONSTRAINT [UserAppliedJob_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserAppliedJob_user_id_job_id_key] UNIQUE NONCLUSTERED ([user_id],[job_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Job_company_id_idx] ON [dbo].[Job]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Job_posted_by_id_idx] ON [dbo].[Job]([posted_by_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [UserAppliedJob_user_id_idx] ON [dbo].[UserAppliedJob]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [UserAppliedJob_job_id_idx] ON [dbo].[UserAppliedJob]([job_id]);

-- AddForeignKey
ALTER TABLE [dbo].[ProgramingLanguage] ADD CONSTRAINT [ProgramingLanguage_jobId_fkey] FOREIGN KEY ([jobId]) REFERENCES [dbo].[Job]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProgramingFramework] ADD CONSTRAINT [ProgramingFramework_job_id_fkey] FOREIGN KEY ([job_id]) REFERENCES [dbo].[Job]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Job] ADD CONSTRAINT [Job_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[Company]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Job] ADD CONSTRAINT [Job_posted_by_id_fkey] FOREIGN KEY ([posted_by_id]) REFERENCES [dbo].[CompanyStaff]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserAppliedJob] ADD CONSTRAINT [UserAppliedJob_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserAppliedJob] ADD CONSTRAINT [UserAppliedJob_job_id_fkey] FOREIGN KEY ([job_id]) REFERENCES [dbo].[Job]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
