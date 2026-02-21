export interface EnvironmentInterface {
  production: boolean;
  apiUrl: string;
  version: string;

  // AWS Cognito configuration
  authorityAWS: string;
  redirectUrlAWS: string;
  clientIdAWS: string;
  scopeAWS: string;
  responseTypeAWS: string;
}