const passport = require("passport");
const localStrategy = require("passport-local");

// handle user registration
passport.use("signup", new localStrategy.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => {
    console.log(email, password);
    console.log(req.body);

    const { username } = req.body;
    if (username && username !== "error") {
        return done(null, { name: "jon" });
    } else {
        return done(new Error("user or password not valid"));
    }
}));


// hnadle user login
passport.use("login", new localStrategy.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => {
    if (email !== "jon@test.com") {
        return done(new Error("user or password not valid"), false);
    }

    if (password !== "test") {
        return done(new Error("user or password not valid"), false);
    }

    return done(null, { name: "jon" });
}));
