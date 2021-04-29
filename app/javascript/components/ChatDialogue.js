import React, { useContext } from "react";
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MessageIcon from "@material-ui/icons/Message";
import Slide from "@material-ui/core/Slide";
import RoomList from "./RoomList";
import RepublishRoom from "./RepublishRoom";
import { AllRoomContext } from "../components/contexts/ContextFile";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

//TODO fix forward ref error
export default function ChatDialogue() {
  let { allRooms } = useContext(AllRoomContext);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p
        // variant="contained"
        // color="primary"
        // className="text-bold"
        // color={"text-blue-500"}
        className="pr-5 block md:inline uppercase my-3 md:my-0 cursor-pointer"
        onClick={handleClickOpen}
      >
        Messages
        <MessageIcon className="ml-2" />
      </p>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"ChatRooms"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <RoomList allRooms={allRooms} />
          <RepublishRoom />
          {/* </DialogContentText> */}
        </DialogContent>
        {/* <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary">
              Agree
            </Button>
          </DialogActions> */}
      </Dialog>
    </>
  );
}
