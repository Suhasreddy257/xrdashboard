import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';

async function loadConfig(): Promise<void> {
  try {
    // Fetch your config.json (public/config/config.json)
    const response = await fetch('config/config.json');
    if (!response.ok) {
      throw new Error(`Failed to load config.json: ${response.status}`);
    }

    const config = await response.json();
    console.log(' Runtime config loaded:', config);

    // Make it globally available for ConfigService and any other service
    (window as any)['appConfig'] = config;

    // Bootstrap Angular app only after config is loaded
    await bootstrapApplication(AppComponent, appConfig);
    console.log(' Angular app bootstrapped successfully');
  } catch (err) {
    console.error('❌ Failed to load configuration file:', err);
    document.body.innerHTML = `
      <h3 style="color:red;text-align:center;margin-top:20px;">
        Failed to load configuration file.
      </h3>`;
  }
}

loadConfig();
