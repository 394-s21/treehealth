# Treesearcher

## Description
Treesearcher is a mobile app that allows you to observe collected data from
your registered trees. The app provides:
- Visualizations of data
  - Sap Flow
  - Weather (Vapor Pressure Deficit, Temperature, Precipitation)
- Zoom and pan functionality to look at data over multiple time ranges
- Data comparison across the same periods of time
- Mark missing data points as red points
- Checkboxes to show/hide certain types of data

## Installation
```
git clone https://github.com/394-s21/treehealth
cd treehealth
npm install --global expo-cli
npm install
```

## Running
```
expo start
```

## Testing
```
npm test
```

## Deployment

### Set Up Firebase
- Go to [the Firebase console](https://console.firebase.google.com/)
- Create or sign into an account
- Create a new project
- Click on **Hosting**
- Click **Get started**

Run the following commands in your local project directory
```
npm install -g firebase-tools
firebase init
```

- Select "Use existing project" and then select the project you just created from the list Firebase shows
- Select only **Database** and **Hosting**
- When it asks where the web code is, enter **web-build**
- When it asks if this is a single-page app, say **Yes**
- When it asks if you want Github integration, say **No**
- Hit return to give the default answer for any other questions asked

#### Manually Deploy
```
expo build:web
firebase deploy
```

#### Automate Deployments
- Generate a Firebase token by following
  [these instructions](https://firebase.google.com/docs/cli#cli-ci-systems)
- Create a repository secret called **FIREBASE_TOKEN** for your repository by
  following [these instructions](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
- Now on push to the master branch,
  [this GitHub Actions workflow](https://github.com/394-s21/treehealth/blob/master/.github/workflows/main.yml)
  will run and deploy your updated code to Firebase


## Platform Constraints
- Web
  - Runs well on Google Chrome
  - Other browsers either have some unexpected behaviors or are untested
- Mobile
  - iOS version has several issues
  - Android version works but is a bit slow

## Known Bugs and Limitations
- Uses local test data instead of live data from a database
- Loading of local test data causes the app to be slow
- Tree registration and user authentication is not yet implemented
