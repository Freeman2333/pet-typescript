export interface StrapiErrorResponse {
  statusCode: number;
  error: string;
  message: StapiErrorMessage[];
}

interface StapiErrorMessage {
  messages: StrapiErrorMessages[];
}

interface StrapiErrorMessages {
  id: string;
  message: string;
}
