## Documentation and screenshots

> The app is available in the following **AWS S3** bucket domain: http://store-frontend-app.s3-website.eu-west-3.amazonaws.com/

The documentation folder containg the separate pages on different topics can be found here: https://github.com/diegolepore/store-frontend/tree/main/documentation 

Inside the documentation folder you will find the following files:

- [Infrastructure description](https://github.com/diegolepore/store-frontend/blob/main/documentation/INFRASTRUCTURE.md)
- [App dependencies](https://github.com/diegolepore/store-frontend/blob/main/documentation/APP_DEPENDENCIES.md)
- [Pipeline process](https://github.com/diegolepore/store-frontend/blob/main/documentation/PIPELINE_PROCESS.md)


The screenshots showing the state of the different Amazon Web Services can be found in this link: https://github.com/diegolepore/store-frontend/tree/main/screenshots

---

# 🛍 MyStore app

![gif: Lets do this!](https://media.giphy.com/media/11p1o3yoAQ7Sne/giphy.gif?cid=ecf05e473ltttnrh3jn1oacj2fwi6msnam44a41h9w3hxrr6&rid=giphy.gif&ct=g)
### ℹ️ Project description

This is a simple e-commerce application built with **Angular** as the frontend framework which consumes an API that I built for another Udacity project, which is the [**storefront-backend**](https://github.com/diegolepore/storefront-backend) built with **Node.js** and **PostgreSQL**.

### 🔐 Register & Sign up
The application has a simple authentication implemented, so in order to add products to the shopping cart and complete the order the user has to be authenticated. So you might have to create an account and then log in.

You could use these testing credentials if you prefer:
```sh
john@test.com
Pass1234
```

### 📦 Dependencies used 
Along with the corresponding type definitions, even though these are not included in the list below.

| Name | Link |
| ------ | ------ |
| Angular | https://angular.io/ |
| @ngrx/store | https://ngrx.io/guide/store |
| Bootstrap | https://getbootstrap.com/ |
| TypeScript | https://www.typescriptlang.org/ |
| ngx-cookie-service | https://github.com/stevermeister/ngx-cookie-service#readme |
| jwt-decode | https://github.com/auth0/jwt-decode#readme |
| ESLint | https://eslint.org/ |
| Husky | https://typicode.github.io/husky/#/ |


### 📝 Instructions for installation and launch

1. **Install npm dependencies**
    ```sh
    npm install
    ```
2. **Start dev server on http://localhost:4200/**
    ```sh
    npm start
    ```
3. **Lint & Lint and Fix scripts**
    ```sh
    npm run lint
    npm run lint-and-fix
    ```

### 🪝 Other
In order to have automatically git hooks enabled after installation, run the following command. You can read more about it in the [Husky documentation](https://typicode.github.io/husky/#/?id=install).
```sh
npm run prepare
```


