export interface IEducationUI {
  title: string;
  fromDate: Date;
  toDate: Date;
  descriptions: string[];
}

export interface IExperienceUI {
  title: string;
  fromDate: Date;
  toDate: Date;
  descriptions: string[];
}

export interface IResumeInfoUI {
  name?: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  cvLink?: string;
  gender?: string;
  dob?: Date;
  school?: string;
  job?: string;
  signature?: string;
  address?: string;
  experiences?: IExperienceUI[];
  educations?: IEducationUI[];
}
