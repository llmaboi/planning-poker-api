interface ResponseData<T> {
  data: T;
}

export type PromiseData<T> = Promise<ResponseData<T>>;
