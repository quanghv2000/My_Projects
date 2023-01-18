import { ISignUpFormData, ISignUpResponse } from 'models';

export type SignUpReducerType = {
  formDataSavedStatus: string;
  formDataSaved: ISignUpFormData;
  signUpResponse?: ISignUpResponse | null;
};

export type SaveDraftFromPayloadType = ISignUpFormData;
export type SignUpSuccessPayloadType = ISignUpResponse;
export type SignUpFailurePayloadType = ISignUpResponse;

export type PayloadType = SaveDraftFromPayloadType | SignUpSuccessPayloadType | SignUpFailurePayloadType;
