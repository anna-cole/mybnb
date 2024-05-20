# Mybnb

Mybnb is an American website operating an online marketplace for home stays. Users can search for properties, see and create property reviews, create and manage bookings.

We hope you enjoy and we look forward to your contributions!

## Techinical description

This app uses Flask to build an API backend, Flask-RESTful for its routes and Flask-SQLAlchemy, Flask-Migrate, and SQLAlchemy-Serializer for its models and database. It has database constraints and Formik validations to validate data and protect the database. SQLAlchemy is used as the ORM – Object Relational Mapping technology to manipulate data to and from the database. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Navigation

After sign up or log in, the user will land on the home page, where they can navigate to the following routes:

- Rent a property: here the user can see a list of the available properties. The user can search by location and other key words. A link below each photo will redirect the user to a page showing the property's details and reviews. In this page, the user can add a review for the property and also see a form to book it. 

- Manage bookings: here the user can manage their bookings, view, edit and delete a booking. 

- Logout: when the user finishes, he can click this button to log out and terminate the session.

## Installing and running the server

To install and run the server, ensure that you have Python 3 and pip installed in your system.

1. Clone this repository to your local machine and navigate to its directory.
2. Run pipenv install to install all the necessary package dependencies.
3. Run pipenv shell to enter the virtual environment.
4. Seed the database with fake data by running python server/seed.py in your terminal (at any time you can run this script again if you need to reset the database).
5. Run the server by running python server/app.py in your terminal.

## Installing and running the client side

1. Install the dependencies for the frontend client by running npm install --prefix client in your terminal, in the project's root directory.
2. Then, run the app in the development mode with the command npm start --prefix client. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## App functionalities

The classes and views in app.py allow users to perform basic CRUD operations, like: 

Signup - allows users to sign up by creating a user profile.

CheckSession - allows users to stay connected after log in. 

Login - allows users to log in using their name and password.

Logout - allows users to log out from the session.

Properties - displays a list with all available properties.

PropertyByID - displays a selected property, its details and reviews.

Bookings - displays a list with the user's bookings and also adds a booking to the database.

BookingByID - displays a selected booking and its details.

Reviews - displays a list with all reviews and also adds a review to the database.

Users - displays a list with all users.

 ## Video demo of the app

<!-- [Video showing features](https://www.youtube.com/watch?v=eIfposqKA_s) -->

## Check my latest blog post! 

<!-- [A beginner’s guide on how to implement context in a React application, for better state management.](https://medium.com/@anna-cole/a-beginners-guide-on-how-to-implement-context-in-a-react-application-for-better-state-management-06e52897715d) -->

## Contributing
We welcome any and all contributions! Here are some ways you can get started:
1. Report bugs: If you encounter any bugs, please let us know. Open up an issue and let us know the problem.
2. Contribute code: If you are a developer and want to contribute, open a pull request with your contributions and wait for pull request to be merged, if approved. 
3. Suggestions: If you don't want to code but have some awesome ideas, open up an issue explaining some updates or improvements you would like to see!
4. Documentation: If you see the need for some additional documentation, feel free to add some!

## License

At the moment, licensing is not being offered. For any questions, please contact our support team.

## Support

For any questions or support, please email acrrj123@gmail.com

## Resources

- [Create React App](https://github.com/facebook/create-react-app)



