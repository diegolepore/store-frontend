# Infrastructure description

The full-stack application consists of three main parts, namely: 
1. 🎨 **The Frontend**
    - Which is built with **Angular** & **TypeScript** (more info here [ README.md](https://github.com/diegolepore/store-frontend#readme)).
    - The application has been set up with [Circle CI](https://circleci.com/), and it triggers a pipeline (wich lint, test, build for production and deploy the frontend app to an **AWS S3 bucket**) each time a new push is made to the `main` branch.
    - For now, the app is setup only for **local development** and **production**.
2.  🏢 **The Backend**
    - Which is built with **Node** and **Express** (more info here [README.md](https://github.com/diegolepore/storefront-backend#readme))
    - The application has been deployed to **AWS Elastic Beanstalk** and set up environment variables for **production**, using **AWS CodePipeline**, so each time a new push is made to the `main` branch, a new version of the backend is deployed to **AWS EB**.
    - For now, the app is setup only for **local development** and **production**.
3. 📦 **The Database**
    - The relational database has been setup with the **AWS Relational Database Service**, more specifically, with the **Amazon Aurora PostgreSQL** engine.
    - For now there is only a database for the **production** environment.
    - On the other hand, for the local development environment, I use a database that I have (as you might have guessed) setup locally.