import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "rc-tree/assets/index.css";
import "@pathofdev/react-tag-input/build/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Windmill } from "@windmill/react-ui";
import "./assets/css/custom.css";
import "./assets/css/tailwind.css";
import "./assets/css/tailwind.output.css";
import App from "./App";
import myTheme from "./assets/theme/myTheme";
import { AdminProvider } from "./context/AdminContext";
import { SidebarProvider } from "./context/SidebarContext";
import ThemeSuspense from "./components/theme/ThemeSuspense";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { ListContextProvider } from "context/ListContext";
import "./i18n";
import { CreateStrategyProvider } from "context/CreateStrategyContext";
import { StepperProvider } from "context/StepperContext";
import { BrokerProvider } from "context/BrokerContext";

// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://7def673c8f71523cc845addcaebfefa5@o4506703647342592.ingest.sentry.io/4506703650553856",
//   integrations: [
//     new Sentry.BrowserTracing({
//       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//       tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//     }),
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });
// ------------------------------------------------------------------------------
// import * as serviceWorker from './serviceWorker';

// if (process.env.NODE_ENV !== "production") {
//   const axe = require("react-axe");
//   axe(React, ReactDOM, 1000);
// }

ReactDOM.render(
  <AdminProvider>
    <SidebarProvider>
    <StepperProvider>
    <ListContextProvider>
  <CreateStrategyProvider>
  <BrokerProvider>
  {/* <StepperProvider> */}
      <Provider store={store}>
        <Suspense fallback={<ThemeSuspense />}>
          <Windmill usePreferences theme={myTheme}>
            <App />
          </Windmill>
        </Suspense>
      </Provider>
      </BrokerProvider>
      {/* </StepperProvider> */}
</CreateStrategyProvider>
      </ListContextProvider>
      </StepperProvider>
    </SidebarProvider>
  </AdminProvider>,

  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
