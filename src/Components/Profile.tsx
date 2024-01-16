import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Acontext } from "../App";

import {
 
  FaUserCircle,
} from "react-icons/fa";
import axios from "axios";
import Config from "../Config";
import { BsPencilSquare, BsSave } from "react-icons/bs";
import validator from "validator";
import { useContext } from "react";

import { toast } from 'react-toastify';

const Profile: React.FC = () => {
  const { user, setuser } = useContext(Acontext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (JSON.stringify(user) === JSON.stringify(editedUser)) {
        setIsEditing(false);
        return;
      }
  
      axios
        .patch(`${Config.apikeyuserdata}/${user.id}`, editedUser)
        .then((response) => {
          toast.success("User updated successfully:");
          setIsEditing(false);
          fetchData();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      setErrors(formErrors);
    }
  };
  

  const fetchData = () => {
    axios
      .get(`${Config.apikeyuserdata}/${user.id}`)
      .then((res) => {
        setuser(res.data);
        localStorage.setItem("userid", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleProfilePictureUpload = () => {
    if (profilePicture) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setEditedUser({
          ...editedUser,
          image: base64String,
        });

        axios
          .patch(`${Config.apikeyuserdata}/${user.id}`, { image: base64String })
          .then((response) => {
            console.log("Profile picture uploaded successfully");
          })
          .catch((error) => {
            console.error("Error uploading profile picture:", error);
          });
      };

      reader.readAsDataURL(profilePicture);
    }
  };

  const validateForm = (): Record<string, string> => {
    const formErrors: Record<string, string> = {};
  
    if (!editedUser.email || validator.isEmpty(editedUser.email)) {
      formErrors.email = "Email is required";
    } else if (!validator.isEmail(editedUser.email)) {
      formErrors.email = "Invalid email format";
    }
  
    if (!editedUser.name || validator.isEmpty(editedUser.name)) {
      formErrors.name = "Name is required";
    } else if (validator.isNumeric(editedUser.name)) {
      formErrors.name = "Name must not contain numbers";
    }
  
    if (!editedUser.address || validator.isEmpty(editedUser.address)) {
      formErrors.address = "Address is required";
    } else if (validator.isNumeric(editedUser.address)) {
      formErrors.address = "Address must not contain numbers";
    }
  
    if (!editedUser.zipCode || validator.isEmpty(editedUser.zipCode)) {
      formErrors.zipCode = "Zip code is required";
    } else if (!validator.isNumeric(editedUser.zipCode)) {
      formErrors.zipCode = "Zip code must only contain numbers";
    }
  
    if (!editedUser.phone || validator.isEmpty(editedUser.phone)) {
      formErrors.phone = "Phone number is required";
    } else if (!validator.isNumeric(editedUser.phone)) {
      formErrors.phone = "Phone number must only contain numbers";
    } else if (!validator.isLength(editedUser.phone, { min: 10, max: 10 })) {
      formErrors.phone = "Phone number must be 10 digits";
    }
  
    if (!editedUser.gender || validator.isEmpty(editedUser.gender)) {
      formErrors.gender = "Gender is required";
    }
  
    return formErrors;
  };

  const updated=(!user.address || !user.phone || !user.zipCode)

  return (
    <>
    {updated && (
      <div className="update-re">
        <Typography variant="body1" color="error">
          Update your profile
        </Typography>
      </div>
    )}
      <div className="container-p">
        {isEditing ? (
          <Button onClick={handleSaveClick} className="edit-btn">
            <BsSave />
          </Button>
        ) : (
          <Button onClick={handleEditClick} className="edit-btn">
            <BsPencilSquare />
          </Button>
        )}
        <Typography variant="h5" className="Profile-heading">
          Profile Section
        </Typography>
        <div className="main-container">
          <div>
            <div className="profile-photo">
              {editedUser.image ? (
                <img
                  src={editedUser.image}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                <FaUserCircle size={80} className="uname" />
              )}
            </div>
            <div className="profile-uplod">
              {isEditing && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />

                  <Button onClick={handleProfilePictureUpload}>
                    Upload Profile Picture
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="p-text">
            {isEditing ? (
              <>
                <div className="column">
                  <TextField
                    name="name"
                    label="Name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="text-field"
                    disabled={!isEditing}
                    error={!!errors.name}
                    helperText={errors.name}
                  />

                  <TextField
                    name="id"
                    label="User ID"
                    value={editedUser.id}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    className="text-field"
                  />

                  <TextField
                    name="address"
                    label="Address"
                    value={editedUser.address}
                    onChange={handleChange}
                    className="text-field"
                    disabled={!isEditing}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                  <Typography variant="body1" component="div">
                    Gender:
                    <RadioGroup
                      name="gender"
                      value={editedUser.gender}
                      onChange={handleChange}
                      row
                      // disabled={!isEditing}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                    {!!errors.gender && (
                      <Typography variant="body2" color="error">
                        {errors.gender}
                      </Typography>
                    )}
                  </Typography>
                </div>
                <div>
                  <TextField
                    name="zipCode"
                    label="Zip Code"
                    value={editedUser.zipCode}
                    onChange={handleChange}
                    className="text-field"
                    disabled={!isEditing}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode}
                  />

                  <TextField
                    name="email"
                    label="Email"
                    value={editedUser.email}
                    onChange={handleChange}
                    className="text-field"
                    disabled={!isEditing}
                    error={!!errors.email}
                    helperText={errors.email}
                  />

                  <TextField
                    name="phone"
                    label="Phone"
                    value={editedUser.phone}
                    onChange={handleChange}
                    className="text-field"
                    disabled={!isEditing}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Typography variant="h6">Name: {user.name}</Typography>
                  <Typography variant="body1">ID: {user.id}</Typography>
                  <Typography variant="body1">
                    Address: {user.address}
                  </Typography>
                  <Typography variant="body1">
                    Zip Code: {user.zipCode}
                  </Typography>
                  <Typography variant="body1">Email: {user.email}</Typography>
                  <Typography variant="body1">Phone: {user.phone}</Typography>
                  <Typography variant="body1">Gender: {user.gender}</Typography>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="social-media">
          <Typography variant="h6" className="s-heading">
            Social Media
          </Typography>
          </div>
          </div>
    </>
  );
};

export default Profile;
