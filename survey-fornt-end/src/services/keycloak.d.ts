import Keycloak from 'keycloak-js';
declare class KeycloakService {
  private static instance: KeycloakService;
  private keycloak: Keycloak;
  private initialized: boolean;

  private constructor();

  static getInstance(): KeycloakService;

  init(): Promise<boolean>;

  getKeycloakInstance(): Keycloak;

  getToken(): string | undefined;

  isTokenExpired(): boolean;

  updateToken(minValidity?: number): Promise<boolean>;

  logout(): Promise<void>;
}

declare const keycloakService: KeycloakService;
export default keycloakService;
