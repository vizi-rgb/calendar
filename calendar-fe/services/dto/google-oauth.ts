export default interface GoogleIdTokenRequest {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
}

export interface GoogleIdTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  token_type: string;
  scope: string;
}
