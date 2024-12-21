import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'survey-realm',
  clientId: 'survey-client',
};

class KeycloakService {
  private static instance: KeycloakService;
  private keycloak: Keycloak;
  private initialized = false;

  private constructor() {
    this.keycloak = new Keycloak(keycloakConfig);
  }

  public static getInstance(): KeycloakService {
    if (!KeycloakService.instance) {
      KeycloakService.instance = new KeycloakService();
    }
    return KeycloakService.instance;
  }

  public async init() {
    if (this.initialized) {
      return this.keycloak.authenticated;
    }

    try {
      const authenticated = await this.keycloak.init({
        checkLoginIframe: false,
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        enableLogging: true,
      });

      this.keycloak.onTokenExpired = () => {
        this.keycloak.updateToken(70);
      };

      this.initialized = true;
      return authenticated;
    } catch (error) {
      console.error('Failed to initialize Keycloak', error);
      throw error;
    }
  }

  public getKeycloakInstance() {
    return this.keycloak;
  }

  public getToken(): string | undefined {
    // console.log('getting the token ,', this.keycloak.token);

    return this.keycloak.token;
  }

  isTokenExpired() {
    return this.keycloak.isTokenExpired();
  }

  public async updateToken(
    minValidity: number = 70
  ): Promise<boolean> {
    try {
      return await this.keycloak.updateToken(minValidity);
    } catch (error) {
      console.error('Failed to refresh token', error);
      return false;
    }
  }

  public login() {
    return this.keycloak.login();
  }

  public logout() {
    return this.keycloak.logout();
  }
}

export default KeycloakService.getInstance();
