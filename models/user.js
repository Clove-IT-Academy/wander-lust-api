import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // trims whitespace from the beginning and end of the string
      // "    Jhon Doe    " => "Jhon Doe"
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // a@b.c
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

// Ensure password is hashed on update operations as well
UserSchema.pre("findOneAndUpdate", async function () {
  const updatedData = this.getUpdate();
  if (updatedData.password) {
    updatedData.password = await hash(updatedData.password, 10);
  }
});

const User = model("User", UserSchema);

export default User;
