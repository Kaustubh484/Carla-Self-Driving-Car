//Primary Page of the User after Login

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TagPicker } from "rsuite";
import Select from "react-select";
import {  useNavigate } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams(); //hook to use parameter(Using id to get info of user using axios)
  const navigate = useNavigate();
  // All states
  const [User, setUser] = useState(null);
  const [NotUser, SetNotUser] = useState(null);
  const [Loading, SetLoading] = useState(true);
  const [pic, setPic] = useState("");
  const [image, setImage] = useState(false);

  const options = [
    { value: "NodeJs", label: "NodeJs" },
    { value: "ReactJs", label: "ReactJs" },
    { value: "Kotlin", label: "Kotlin" },
  ];

  //Grab info of user on start
  useEffect(() => {
    axios({
      method: `GET`,
      withCredentials: true,
      url: `http://localhost:5000/users/${id}`,
    }).then((res) => {
      if (res.data.user) {
        setUser(res.data.user);
        SetLoading(false);
      } else {
        SetNotUser(true);
        SetLoading(false);
      }
    });

    fetchImage();
  }, []);
  // handle submit of entire form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:5000/user/update`, {
          User: User,
        })
        .then((res) => {
          if (res.data.User) {
            console.log(res.data.User); //Remove
            setUser(res.data.User);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  // handle uploading of pic to backend
  const picUpdate = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("pic", pic);
    try {
      const res = await axios.post(
        `http://localhost:5000/upload/image/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.image) {
        setImage(res.data.image);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Function to fetchimage from backend
  const fetchImage = () => {
    axios
      .get(`http://localhost:5000/upload/image/${id}`)
      .then((res) => {
        if (res.status == 200 && res.data.image) {
          setImage(res.data.image);
        }
      })
      .catch((err) => {
        console.log(err);
        setImage(false);
      });
  };
  // Function called on pressing delete button
  const deleteimage = () => {
    axios
      .delete(`http://localhost:5000/upload/image/${id}/delete`)
      .then((res) => {
        console.log(res);
        fetchImage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="UserPage">
      {NotUser && (
        <div>
          Please login to continue
          <br></br>
          <Link to="/login">
            <button>Go To login</button>
          </Link>
        </div>
      )}

      {Loading && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}

      {User && (
        <div>
          Welcome {User.username ? User.username : <p>Wtf</p>}
          {/* Profile Pic */}
          {image ? (
            <img
              src={`http://localhost:5000/upload/${image.filename}`}
              alt="no pic found"
            />
          ) : (
            <div>
              <h4>No Image Found</h4>
            </div>
          )}
          <button
            onClick={() => {
              deleteimage();
            }}
          >
            Delete current profile pic
          </button>
          {/* Form for image uploading only */}
          <form onSubmit={picUpdate}>
            <label>Profile Picture</label>
            <input
              type="file"
              name="profilepic"
              id="pic"
              onChange={(e) => {
                setPic(e.target.files[0]);
                console.log(e.target.files[0].name);
              }}
            />
            <input type="submit" value="Upload" />
          </form>
          {/* Form to update user details */}
          <form onSubmit={handleSubmit} id="details">
            {/* We are handling all properties of user in a single object State 'User'
            and updating it */}
            <label> Full Name</label>
            <input
              type="text"
              value={User.Name}
              onChange={(e) => {
                setUser((prevState) => {
                  // Fetch previous state and update its property
                  let user = { ...prevState };
                  user.Name = e.target.value;
                  return user;
                });
              }}
            />
            <label>email </label>
            <input
              type="text"
              value={User.email}
              onChange={(e) => {
                setUser((prevState) => {
                  let user = { ...prevState };
                  user.email = e.target.value;
                  return user;
                });
              }}
            />
            <label>Github Link </label>
            <input
              type="url"
              name="githubLink"
              id=""
              value={User.GitHubLink}
              onChange={(e) => {
                setUser((prevState) => {
                  let user = { ...prevState };
                  user.GitHubLink = e.target.value;
                  return user;
                });
              }}
            />
            <label>Linkedin Link </label>
            <input
              type="url"
              name="linkedinLink"
              id=""
              value={User.LinkedinLink}
              onChange={(e) => {
                setUser((prevState) => {
                  let user = { ...prevState };
                  user.LinkedinLink = e.target.value;
                  return user;
                });
              }}
            />
            <label>Write a description about yourself</label>
            <textarea
              name="Description"
              id="des"
              cols="30"
              rows="5"
              value={User.Description}
              onChange={(e) => {
                setUser((prevState) => {
                  let user = { ...prevState };
                  user.Description = e.target.value;
                  return user;
                });
              }}
            ></textarea>
            <button type="submit">Update Details</button>
            <Select isMulti options={options} className="multi-select" />
          </form>
          <button
            class="btn btn-primary"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};
export default UserPage;
