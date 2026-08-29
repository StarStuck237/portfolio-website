# BencokWebsite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.20.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Dance videos

The video band in the dance section is generated from the YouTube playlist by
`scripts/sync-dance-videos.mjs`, which runs automatically before every
`npm run build`. It takes the four most recently uploaded videos, so **the
playlist is the editorial gate** — whatever you add to it can become the
featured video.

Video titles must follow `<round> - <event> <year>`, optionally with a partner
in front:

```
Novice Jack and Jill - Chicagoland 2026
Ben and Sara O’Toole - Novice Strictly - Michigan Classic 2026
```

A title that doesn't match is skipped with a warning rather than rendered with
a made-up event name.

### The API key

The script needs a YouTube Data API v3 key. Create one in the
[Google Cloud console](https://console.cloud.google.com/apis/credentials): new
project, enable **YouTube Data API v3**, then Credentials → Create credentials →
API key. Restrict it to that one API. No OAuth or billing is needed — a run
costs 3 units against a daily allowance of 10,000.

Locally, put it in a `.env` file at the repo root (git-ignored):

```
YOUTUBE_API_KEY=your-key-here
```

For deploys, add the same value as a repository secret named `YOUTUBE_API_KEY`
(Settings → Secrets and variables → Actions); `deploy.yml` already passes it
through.

**Without a key the build still works** — the script warns and leaves
`src/app/data/dance-videos.ts` as committed, which is why that file is checked
in. Same for a failed API call or no network. Pass `--strict` to fail the build
instead:

```bash
npm run sync:videos              # refresh on demand
node scripts/sync-dance-videos.mjs --strict
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
