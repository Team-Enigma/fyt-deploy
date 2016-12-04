const user = {
    messages: {
        uniqueUsername: "A user with this username already exists",
        uniqueEmail: "A user with this email already exists",
        requiredUsername: "Username is required",
        requiredFirstName: "First name is required",
        requiredLastName: "Last name is required",
        requiredEmail: "Email is required",
        requiredPassword: "Password is required",
        requiredConfirmPassword: "Confirm password is required",
        personFirstName: "First name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. John)",
        personLastName: "Last name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Doe)",
        username: "Username should contain latin letters both capital and small as well as digits and -._ symbols and be between 3 and 20 characters (e.g. john.42)",
        email: "Email should contain latin letters both capital and small as well as digits and -._ symbols (e.g. john.42@mail.com)",
        city: "City name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Sofia)",
        contact: "Contact information should not have any  (e.g. Sofia)",
        password: "Password should contain latin letters both capital and small as well as digits and special symbols and be between 3 and 20 characters (e.g. Pasword#!42)",
        confirmPassword: "Passwords does not match"
    },
    matchers: {
        personName: /^([A-Z]{1}[a-z]{1,30})$/,
        city: /^([A-Z]{1}[a-z\s]{1,30})$/,
        username: /^([A-Za-z0-9\-\._]{3,20})$/,
        email: /^([\w\d\-\._]+@[\w\d]+\.[\w]{2,3})$/,
        contact: /^([A-Za-z0-9\+\s.\-_]{3,20})$/,
        password: /^([A-Za-z0-9!@#%&\$\^\*\.\-_]{3,40})$/
    },
    enums: { roleTypes: ["User", "Admin"] }
};

const ride = {
    messages: {
        requiredStartCity: "Start city is required",
        requiredEndCity: "End city is required",
        requiredDate: "Date is required",
        requiredPrice: "Price is required",
        requiredContact: "Contact information is required",
        city: "City name should contain only latin letters and be between 2 and 30 characters (e.g. Sofia)",
        date: "Date cannot be set before current date and time",
        price: "Price should be between 0 and 1000",
        priceNumber: "Price should be a valid number"
    },
    matchers: {
        city: /^([\w+\s*]{2,30})$/,
        price: /^([0-9]+)$/
    }
};

const car = {
    messages: {
        requiredManufacturer: "Manufacturer is required",
        requiredModel: "Model is required",
        requiredRegistrationNumber: "Registration number is required",
        manufacturer: "Manufacturer should contain only latin letters and be between 2 and 25 symbols long",
        model: "Model should contain only latin letters and be between 2 and 15 symbols long",
        registrationNumber: "Registration number should contain a latin letter, followed by 4 digits and two more latin letters (e.g. C2332KK)"
    },
    matchers: {
        manufacturer: /^([\w+\s*]{2,25})$/,
        model: /^([\w+\s*]{2,15})$/,
        registrationNumber: /^[A-Z]{1,2}[0-9]{4}[A-Z]{2}$/
    },
    enums: {
        fuelTypes: ["ULP", "PULP", "CNG", "LPG", "Diesel", "Hybrid", "Electric"],
        transmissionTypes: ["Automatic", "Manual"]
    }
};

const contact = { enums: { statusTypes: ["Not Processed", "In Process", "Processed"] } };

const errorMessages = {
    default: "Problem occured.",
    user: "Invalid username or password.",
    userEmail: "A user with this email already exists."
};

const successfulMessages = {
    admin: {
        changeRole: "Successful change of role. The user is now admin.",
        changeMessageStatus: "Successfully updated the status of this message."
    },
    contact: { sendMessage: "Successful message sent. We will respond to your request as soon as possible." },
    ride: {
        createRide: "Successful ride creation.",
        removeRide: "Successful removal of ride.",
        signRide: "Successful sign for ride. Enjoy your trip.",
        unsignRide: "Successful unsign from ride.",
        comment: "Successful addition of comment."
    },
    user: {
        registration: "Successful registration. Please login.",
        login: "Successful login.",
        uploadPicture: "Successfully uploaded new profile picture.",
        updateProfile: "Successfully changed your profile information.",
        updatePassword: "Successfully changed your password.",
        updateCar: "Successfully changed your car information."
    }
};

module.exports = {
    user,
    ride,
    car,
    contact,
    errorMessages,
    successfulMessages
};