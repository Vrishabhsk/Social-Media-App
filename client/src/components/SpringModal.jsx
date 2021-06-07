import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PhotoIcon from "@material-ui/icons/Photo";
import VideocamIcon from "@material-ui/icons/Videocam";
import StyledButton from "./StyledButton";
import axios from "axios";
import { toast } from "react-toastify";

function getModalStyle() {
  const top = 45;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [filename, setFilename] = useState("");

  const formData = new FormData();
  formData.append("photoPost", filename);

  var cont = "";
  props.post
    ? (cont = "Submit Post")
    : props.photo
    ? (cont = "Submit Photo")
    : (cont = "Submit Video");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event) {
    setCaption(event.target.value);
  }

  function handleFile(event) {
    setFilename(event.target.files[0]);
  }

  function handlePhoto(event) {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("photoPost", filename);
    axios({
      method: "POST",
      withCredentials: true,
      data: formData,
      url: "http://localhost:5000/upload/photo",
    }).then((res) => {
      toast.success(res.data);
      handleClose();
    });
  }

  function handlePost(event) {
    axios({
      method: "POST",
      withCredentials: true,
      data: {
        caption: caption,
      },
      url: "http://localhost:5000/upload/post",
    }).then((res) => {
      toast.success(res.data);
      handleClose();
    });
  }

  function handleVideo(event) {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("videoPost", filename);

    axios({
      method: "POST",
      withCredentials: true,
      data: formData,
      url: "http://localhost:5000/upload/video",
    }).then((res) => {
      toast.success(res.data);
      handleClose();
    });
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.title}</h2>
      <p id="simple-modal-description">
        <form encType="multipart/form-data">
          <textarea
            name="caption"
            className="postText"
            rows="5"
            value={caption}
            onChange={handleChange}
            required
            placeholder={props.des}
          />
          {props.photo ? (
            <div>
              <label htmlFor="file">Choose Photo: </label>
              <input
                type="file"
                filename="photoPost"
                onChange={handleFile}
              ></input>
              <StyledButton onClick={handlePhoto} content={cont} />
            </div>
          ) : props.video ? (
            <div>
              <label htmlFor="file">Choose Video: </label>
              <input
                type="file"
                filename="videoPost"
                onChange={handleFile}
              ></input>
              <StyledButton onClick={handleVideo} content={cont} />
            </div>
          ) : (
            <div>
              <StyledButton onClick={handlePost} content={cont} />
            </div>
          )}
        </form>
      </p>
    </div>
  );

  return (
    <div>
      {props.post ? (
        <div className="modelBtn" onClick={handleOpen}>
          Start a Post
        </div>
      ) : props.photo ? (
        <div className="icons" onClick={handleOpen}>
          <PhotoIcon /> <span>Photo</span>
        </div>
      ) : (
        <div className="icons" onClick={handleOpen}>
          <VideocamIcon /> <span>Video</span>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
