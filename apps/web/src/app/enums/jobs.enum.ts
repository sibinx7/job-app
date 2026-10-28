interface JobProgramingLanguage {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

interface JobProgramingFramework {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  programing_language?: JobProgramingLanguage;
}



interface Job {
  id: number;
  title: string;
  description: string;
  locations: Array<string>;
  salary_min: number;
  salary_max: number;
  jobType: string;
  experience_min: number;
  experience_max: number;
  notice_period_min: number;
  notice_period_max: number;
  programing_languages: JobProgramingLanguage[];
  programing_frameworks: JobProgramingFramework[];
  is_hybrid?: boolean;
  is_remote?: boolean;
  is_onsite?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  company_id?: number;
  posted_by_id?: number;
}