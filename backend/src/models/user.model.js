import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    methods: {
      isPasswordMatching(password) {
        return bcrypt.compare(password, this.password);
      },
      generateToken() {
        return jwt.sign(
          {
            id: this._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1m",
          },
        );
      },
    },
  },
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  this.password = bcrypt.hashSync(this.password, 10);
});

export const User = mongoose.model("User", userSchema);
