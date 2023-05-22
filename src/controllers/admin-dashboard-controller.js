import bcrypt from "bcrypt";          // ADDED
import { db } from "../models/db.js";


const saltRounds = 10;                // ADDED


export const admindashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin Dashboard",
        user: loggedInUser,
        users: users,
      };
      return h.view("admin-dashboard-view", viewData);
    },
  },

  addUser: {
    handler: async function (request, h) {
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        admin: request.payload.admin
      };
      newUser.password = await bcrypt.hash(newUser.password, saltRounds);   // ADDED
      await db.userStore.addUser(newUser);
      return h.redirect("/admindashboard");
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.userid);
      await db.userStore.deleteUserById(request.params.userid);
      return h.redirect("/admindashboard");
    },

  },  
  
  admineditUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.userid);
      const viewData = {
        title: "Edit User",
        user: user,
      };
      return h.view("admin-user-view", viewData);
      
    },
},


adminupdateUser: {
  handler: async function (request, h) {
    const user = await db.userStore.getUserById(request.params.userid);
    const adminupdateUser = {
      firstName: request.payload.firstName,
      lastName: request.payload.lastName,
      email: request.payload.email,
      password: request.payload.password,
      admin: Boolean(request.payload.admin),
    };
     // Hash and salt the password
    if (request.payload.password) {
    const hashedPassword = await bcrypt.hash(request.payload.password, saltRounds);
    adminupdateUser.password = hashedPassword;
    }
    await db.userStore.adminupdateUser(user, adminupdateUser);
    const viewData = {
      title: "User updated",
      user: user,
    };
    return h.view("admin-user-view", viewData);
  },
},

};

