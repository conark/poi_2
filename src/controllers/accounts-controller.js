import bcrypt from "bcrypt";          // ADDED
import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schema.js";

const saltRounds = 10;                // ADDED

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("Main", { title: "Welcome to Playlist" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("Signup", { title: "Sign up for Playlist" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("Signup", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds);    // ADDED
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("Login", { title: "Login to Playlist" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("Login", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);    // ADDED
      if (!user || !passwordsMatch) {                                          // EDITED
      // if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/place");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
  edit: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.userid);
      const viewData = {
        title: "Edit User",
        user: user,
      };
      return h.view("user-view", viewData);
      
    },
  },
  update: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.userid);
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        admin: request.payload.admin,
      };
      // Hash and salt the password
      if (request.payload.password) {
        const hashedPassword = await bcrypt.hash(request.payload.password, saltRounds);
        newUser.password = hashedPassword;
      }
      await db.userStore.updateUser(user, newUser);
      const viewData = {
        title: "User updated",
        user,
      };
      return h.view("user-view", viewData).redirect(`/user-view/${user._id}`);
    },
  },

};
