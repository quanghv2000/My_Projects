export interface IUserInfoResponse {
  id?: number;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  activated?: boolean;
  langKey?: string;
  imageUrl?: string;
  activationKey?: any;
  resetKey?: string | null;
  resetDate?: Date | null;
  authorities?: string[];
}

export interface IUserLoggedInfo {
  id?: number;
  username?: string;
  fullName?: string;
  imageUrl?: string;
}
