<div align="center">
  <a href="https://wristband.dev">
    <picture>
      <img src="https://assets.wristband.dev/images/email_branding_logo_v1.png" alt="Github" width="297" height="64">
    </picture>
  </a>
  <p align="center">
    Enterprise-ready auth that is secure by default, truly multi-tenant, and ungated for small businesses.
  </p>
  <p align="center">
    <b>
      <a href="https://wristband.dev">Website</a> •
      <a href="https://docs.wristband.dev">Documentation</a>
    </b>
  </p>
</div>

<br/>

---

<br/>

# Wristband Multi-Tenant Demo App for Next.js (Pages Router)

This is a multi-tenant demo app that serves other companies as its customers. This repo utilizes the Backend Server integration pattern. It demonstrates the following:

- How to set up Auth Endpoints to perform login and logout flows
- How to create application sessions
- How to protect API routes and server-side rendered (SSR) pages by utilizing the Next.js proxy (middleware) and Wristband's session helper functions.

<br>
<hr />
<br>

## Getting Started

You can start up the demo application in a few simple steps.

### 1) Sign up for an Wristband account.

First thing is first: make sure you sign up for an Wristband account at [https://wristband.dev](https://wristband.dev).

### 2) Provision the Next.js Pages Router demo application in the Wristband Dashboard.

After your Wristband account is set up, log in to the Wristband dashboard.  Once you land on the home page of the dashboard, click the "Add Application" button.  Make sure you choose the following options:

- Step 1: Try a Demo
- Step 2: Subject to Authenticate - Humans
- Step 3: Application Framework - Next.js (Pages Router)

You can also follow the [Demo App Guide](https://docs.wristband.dev/docs/setting-up-a-demo-app) for more information.

### 3) Apply your Wristband configuration values to the Next.js server configuration

Upon completing the demo application setup, you will be prompted with values that you should copy into the environment variable configuration for this demo repository, which is located in `.env`.  Replace the following values:

- `APPLICATION_VANITY_DOMAIN`
- `CLIENT_ID`
- `CLIENT_SECRET`

Copy those values, then create an environment variable file in the root directory of this project: `.env`. Once created, paste the copied values into this file.

### 4) Install dependencies

> [!WARNING]
> Make sure you are in the root directory of this repository.

Before attempting to run the application, run the following to install project dependencies:

```bash
npm install
```

### 5) Run the application

You can start the Next.js dev server on `localhost` with port `6001` by running the following:

```bash
npm run dev
```

You can also build the app and launch it in production mode:

```bash
npm run build
npm start
```

<br>
<hr />
<br>

## How to Interact with the Demo App

The Next.js server holds the client credentials, runs the full OAuth2 login flow with Wristband, issues the session cookie, refreshes expired access tokens, proxies frontend API calls, and clears everything on logout. Wristband hosts all onboarding pages, so Next.js simply redirects users there for signup and login.

### Signup Users

Now that the app is up and running, you can sign up your first customer on the Signup Page at the following location:

- `https://{application_vanity_domain}/signup`, where `{application_vanity_domain}` should be replaced with the value of the "Application Vanity Domain" value of the application (can be found in the Wristband Dashboard by clicking the Application Settings side menu of this app).

This signup page is hosted by Wristband.  Completing the signup form will provision both a new tenant with the specified tenant name and a new user that is assigned to that tenant.

### Home Page

For reference, the home page of this app can be accessed at [http://localhost:6001/](http://localhost:6001/).

### Application-level Login (Tenant Discovery)

Users of the app can access the Application-level Login Page (Tenant Discovery Page) at the following location:

- `https://{application_vanity_domain}/login`, where `{application_vanity_domain}` should be replaced with the value of the "Application Vanity Domain" value of the demo application (can be found in the Wristband Dashboard by clicking the Application Settings side menu of this app).

This login page is hosted by Wristband.  Here, the user will be prompted to enter their tenant's name for which they want to log in to.  Successfully entering the tenant name will redirect the user to the tenant-level login page for their specific tenant.

Users also have the option here to execute the Forgot Tenant workflow and entering their email address in order to receive a list of all tenants that they belong to.

### Tenant-level Login

If users wish to directly access their Tenant-level Login Page without having to go through Tenant Discovery, they can do so at [http://localhost:6001/api/auth/login?tenant_name={tenant_name}](http://localhost:6001/home), where `{tenant_name}` should be replaced with the value of the desired tenant's name.

This login page is hosted by Wristband.  Here, the user will be prompted to enter their credentials in order to login to the application.

<br>

## Wristband Code Touchpoints

Within the demo app code base, you can search in your IDE of choice for the text `WRISTBAND_TOUCHPOINT`.  This will show the various places in both the React frontend code and Next.js server code where Wristband is involved.

<br>

## Wristband Next.js SDK

This demo app is leveraging the [Wristband nextjs-auth SDK](https://github.com/wristband-dev/nextjs-auth) for all authentication interaction in the Next.js server. Refer to that GitHub repository for more information.

<br>

## Wristband React Client Auth SDK

This demo app is leveraging the [Wristband react-client-auth SDK](https://github.com/wristband-dev/react-client-auth) for any authenticated session interaction in the React frontend. Refer to that GitHub repository for more information.

<br/>

## Questions

Reach out to the Wristband team at <support@wristband.dev> for any questions regarding this demo app.

<br/>
