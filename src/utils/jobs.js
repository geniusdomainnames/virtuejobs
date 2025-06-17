export class Job {
  constructor({
    job_id,
    job_source,
    job_source_link,
    job_source_add_date,
    job_field,
    job_topic,
    job_company_name,
    job_company_description,
    job_title,
    job_location=[], // array of strings
    job_type = [], // array of integers
    job_industry,
    job_description = [], // array of strings
    job_short_description,
    job_salary,
    eligibility = [], // array of strings
    responsibilities = [], // array of strings
    how_to_apply = [], // array of strings
    application_deadline,
    apply_link,
    job_post_date,
    job_slog,
    job_country = [], // array of strings
  }) {
    this.job_id = job_id; // SERIAL PRIMARY KEY
    this.job_source = job_source; // TEXT
    this.job_source_link = job_source_link; // TEXT UNIQUE
    this.job_source_add_date = job_source_add_date; // TEXT
    this.job_field = job_field; // INTEGER
    this.job_topic = job_topic; // TEXT
    this.job_company_name = job_company_name; // TEXT
    this.job_company_description = job_company_description; // TEXT
    this.job_title = job_title; // TEXT
    this.job_location = job_location; // TEXT
    this.job_type = job_type; // INTEGER[]
    this.job_industry = job_industry; // TEXT
    this.job_description = job_description; // TEXT[]
    this.job_short_description = job_short_description; // TEXT
    this.job_salary = job_salary; // TEXT
    this.eligibility = eligibility; // TEXT[]
    this.responsibilities = responsibilities; // TEXT[]
    this.how_to_apply = how_to_apply; // TEXT[]
    this.application_deadline = application_deadline; // TEXT
    this.apply_link = apply_link; // TEXT
    this.job_post_date = job_post_date; // TEXT
    this.job_slog = job_slog; // TEXT
    this.job_country = job_country; // TEXT[]
  }



  toInsertArray() {
    return [
      this.job_source,
      this.job_source_link,
      this.job_source_add_date,
      this.job_field,
      this.job_topic,
      this.job_company_name,
      this.job_company_description,
      this.job_title,
      this.job_location,
      this.job_type,
      this.job_industry,
      this.job_description,
      this.job_short_description,
      this.job_salary,
      this.eligibility,
      this.responsibilities,
      this.how_to_apply,
      this.application_deadline,
      this.apply_link,
      this.job_post_date,
      this.job_slog,
      this.job_country
    ];
  }









}
