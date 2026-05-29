export type Paper = {
  id: string;

  filename: string;

  std?: string;

  paper_type?: string;

  total_marks?: number;

  duration_mins?: number;

  uploaded_at?: string;

  question_count?: number;

  subjects_count?: number;

  processing_status?: string;
};