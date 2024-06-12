# Mybnb

Mybnb is a web application operating an online marketplace for home stays, where users can search for properties, create reviews and manage bookings. It also features an integrated Google Maps API.

We hope you enjoy and we look forward to your contributions!

## Techinical description

This app uses Flask to build an API backend, Flask-RESTful for its routes and Flask-SQLAlchemy, Flask-Migrate, and SQLAlchemy-Serializer for its models and database. It has database constraints and Formik validations to validate data and protect the database. SQLAlchemy is used as the ORM – Object Relational Mapping technology to manipulate data to and from the database. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Navigation

From the home page, the user can sign up, if they don't have an account or log in, if they have one. The sign up and log in features have error validations and password authentication. After a valid authentication, the user can navigate to the following routes:

- Properties: here the user can see a list of the available properties. They can search by location or title, with lower or upper case. Each property shows its location, average rating, price and a link that redirects the user to a page showing more details about the property. 

- After clicking in this link, the user can see more details about the property, like an interactive Google Map showing where the property is located. The user can see a list of reviews, add a review and also book the property. 

- Your trips: here the user can view and manage their bookings, like editing or deleting a booking. 

- Home: the user can click Home and be redirected to the home page.

- Logout: the user can click this button to log out and terminate the session.

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

## App classes and main views.

The classes and views in app.py allow users to perform basic CRUD operations, like: 

Signup - allows users to sign up by creating a user profile.

CheckSession - allows users to stay connected after log in. 

Login - allows users to log in using their name and password.

Logout - allows users to log out from the session.

Properties - displays a list with all properties and also adds a property to the database.

PropertyByID - displays a selected property, its details and reviews. Also edits and deletes a property.

Bookings - displays a list with all bookings and also adds a booking to the database.

BookingByID - displays a selected booking and its details. Also has methods to edit and delete a booking.

Reviews - displays a list with all reviews and also adds a review to the database.

Users - displays a list with all users.

 ## Video demo of the app

[Video showing features of the app](https://www.loom.com/share/dee7d60a507445f9b7c94ae0e2ca706d?sid=0080d0f6-abc5-40b0-86ce-47fd7a5dc512)

## Check my blog post about a technique used in this app 

[A beginner’s guide on how to implement context in a React application, for better state management.](https://medium.com/@anna-cole/a-beginners-guide-on-how-to-implement-context-in-a-react-application-for-better-state-management-06e52897715d)

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

- [How to create an App with a React frontend and Python backend](https://medium.com/@anna-cole/an-outline-for-planning-the-creation-of-a-full-stack-application-with-a-react-frontend-and-a-python-57b47d46165a)

- [Create React App](https://github.com/facebook/create-react-app)



