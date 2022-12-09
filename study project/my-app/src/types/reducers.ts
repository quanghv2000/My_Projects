export function actionPayload<T = any>(payload: T) {
  return { payload };
}

export type ActionType<T> = {
  type: string;
  payload: T;
};
